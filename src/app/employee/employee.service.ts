import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import e from 'express';
import { Project_Role, Project_status } from 'src/helpers/constants';
import { messages } from 'src/helpers/message';
import {
  Accounts,
  Employee,
  Project,
  ProjectAssignee,
  Remarks,
  Reporting,
} from 'src/typeOrm';
import { In, Repository } from 'typeorm';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
    @InjectRepository(Accounts)
    private readonly accountRepository: Repository<Accounts>,
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    @InjectRepository(Reporting)
    private readonly reportingRepository: Repository<Reporting>,
    @InjectRepository(Remarks)
    private readonly remarksRepository: Repository<Remarks>,
    private readonly jwtService: JwtService,
  ) { }

  async getAllProjects(req, id) {
    try {
      const status = req.status;
      const column_name = req.column_name || 'project.created_at';
      const column_order = req.column_order || 'DESC';
      const search = req.search;
      const platform = req.platform;
      const sort = req.sort;
      // const limit = req.limit || 0;
      // const page = (req.page - 1) * limit || 1;

      const query = await this.projectRepository.createQueryBuilder('project')
        .leftJoinAndMapMany(
          'project.project_assignee',
          ProjectAssignee,
          'project_assignee',
          'project_assignee.project_id = project.id'
        )
        .leftJoinAndMapMany(
          'project.employee',
          Employee,
          'employee',
          'employee.id = project.employee'
        )
        .where("project_assignee.emp_id = :id", { id: id.id })
        .andWhere("project.status != :status", {status : Project_status.DELETED})
      if (search) {
        query.where(`project.name ILIKE '%${search}%'`);
      }
      if (status) {
        query.where('project.status = :status', { status: status });
      }
      if (platform) {
        query.andWhere('project.platform = :platform', { platform: platform });
      }
      if (sort == '1') {
        const data = await query
          .select(['project', 'project_assignee.role', 'employee.first_name', 'employee.last_name'])
          .orderBy('project.name','ASC')
          .getMany();

        return {
          status: 200,
          message: messages.PROJECT_FETCHED,
          data: data,
        };
      }

      if (sort == '2') {
        const data = await query
          .select(['project', 'project_assignee.role', 'employee.first_name', 'employee.last_name'])
          .orderBy('project.name', 'DESC')
          .getMany();

        return {
          status: 200,
          message: messages.PROJECT_FETCHED,
          data: data,
        };
      }
      if (sort == '3') {
        const data = await query
          .select(['project', 'project_assignee.role', 'employee.first_name', 'employee.last_name'])
          .orderBy('project.created_at', 'ASC')
          .getMany();

        return {
          status: 200,
          message: messages.PROJECT_FETCHED,
          data: data,
        };
      }
      const data = await query
        .select(['project','project_assignee.role','project_assignee.employee' ,'employee.first_name', 'employee.last_name'])
        .orderBy(column_name, column_order)
        .getMany();
      return {
        status: 200,
        message: messages.PROJECT_FETCHED,
        data: data,
      };
    } catch (error) {
      throw error;
    }
  }

  async getProjectDetails(id) {
    try {
      const projectDetails = await this.projectRepository.findOne({
        where: { id: id.id },
      });
      return {
        status: 200,
        message: messages.PROJECT_FETCHED,
        data: projectDetails,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async createReporting(body, req) {
    try {
      const adminId = await this.employeeRepository.findOne({
        where: {
          email: req.user.email
        }
      });
      const reportings = new Reporting();
      reportings.project_name = body.project_name;
      reportings.billable = body.billable;
      reportings.billable_hours = body.billable_hours;
      reportings.description = body.Description;
      reportings.emp_reporting_id = adminId.id;
      const saveLog = await this.reportingRepository.save(reportings);
      return {
        status: 200,
        message: messages.REPORTING_CREATE
      }
    } catch (error) {
      throw error;
    }
  }

  async getReportListing(req, request) {
    try {
      const userEmail = request.user.email;
      const emp_id = await this.employeeRepository.createQueryBuilder()
        .where("email = :email", { email: userEmail })
        .getOne();
      const search = req.search;
      const page = req.page || 0;
      const limit = req.limit || 10;
      const column_name = req.column_name || 'reporting.created_at';
      const sort = req.sort || 'DESC';
      const start_date = req.start_date;
      const end_date = req.end_date;
      const project = req.project;
      const name = req.employee;
      const query = await this.reportingRepository.createQueryBuilder('reporting')
        .leftJoinAndSelect(Employee, 'employee', 'employee.id = reporting.emp_id')
        .where("reporting.emp_id = :id", { id: emp_id.id })
      if (search) {
        query.where(`description ILIKE '%${search}%'`)
      }
      if (project) {
        query.where('project_name = :project', { project: project });
      }
      if (name) {
        const datas = name.split(' ');
        const first_name = Object.values(datas)[0];
        const last_name = Object.values(datas)[1];
        query.where('employee.first_name = :first_name', { first_name: first_name })
          .andWhere('employee.last_name = :last_name', { last_name: last_name })
      }
      const data = await query
        .orderBy(column_name, sort)
        .limit(limit)
        .offset(page)
        .getRawMany();
      if (data.length > 0) {
        return {
          status: 200,
          message: messages.REPORTS_FETCHED,
          data: data
        };
      }
      else {
        return {
          status: 200,
          message: messages.NOT_FOUND,

        };
      }
    } catch (error) {
      throw error;
    }
  }


  async getProjectStatusCount(req) {
    try {
      const userEmail = req.user.email;
      const emp_id = await this.employeeRepository.createQueryBuilder()
        .where("email = :email", { email: userEmail })
        .getOne();
      const active = await this.projectRepository.createQueryBuilder('project')
        .leftJoin(ProjectAssignee, 'project_assignee', 'project_assignee.project_id = project.id')
        .where("project.status = :status", { status: Project_status.ACTIVE })
        .andWhere("project_assignee.emp_id = :id", { id: emp_id.id })
        .getCount();
      const hired = await this.projectRepository.createQueryBuilder('project')
        .leftJoin(ProjectAssignee, 'project_assignee', 'project_assignee.project_id = project.id')
        .where("project.status = :status", { status: Project_status.HIRED })
        .andWhere("project_assignee.emp_id = :id", { id: emp_id.id })
        .getCount();
      const disputed = await this.projectRepository.createQueryBuilder('project')
        .leftJoin(ProjectAssignee, 'project_assignee', 'project_assignee.project_id = project.id')
        .where("project.status = :status", { status: Project_status.DISPUTED })
        .andWhere("project_assignee.emp_id = :id", { id: emp_id.id })
        .getCount();
      const canceled = await this.projectRepository.createQueryBuilder('project')
        .leftJoin(ProjectAssignee, 'project_assignee', 'project_assignee.project_id = project.id')
        .where("project.status = :status", { status: Project_status.CANCELED })
        .andWhere("project_assignee.emp_id = :id", { id: emp_id.id })
        .getCount();
      const delivered = await this.projectRepository.createQueryBuilder('project')
        .leftJoin(ProjectAssignee, 'project_assignee', 'project_assignee.project_id = project.id')
        .where("project.status = :status", { status: Project_status.DELIVERED })
        .andWhere("project_assignee.emp_id = :id", { id: emp_id.id })
        .getCount();
      const suspended = await this.projectRepository.createQueryBuilder('project')
        .leftJoin(ProjectAssignee, 'project_assignee', 'project_assignee.project_id = project.id')
        .where("project.status = :status", { status: Project_status.SUSPENDED })
        .andWhere("project_assignee.emp_id = :id", { id: emp_id.id })
        .getCount();
      const all = await this.projectRepository.createQueryBuilder('project')
        .leftJoin(ProjectAssignee, 'project_assignee', 'project_assignee.project_id = project.id')
        .where("project.status != :status", { status: Project_status.DELETED })
        .andWhere("project_assignee.emp_id = :id", { id: emp_id.id })
        .getCount();
      const data = { all, suspended, delivered, canceled, disputed, hired, active }
      return {
        status: 200,
        message: messages.PROJECT_STATUS_COUNT_FETCHED,
        data: data

      }
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  } catch(error) {
    throw new BadRequestException(error.message)
  }
}

