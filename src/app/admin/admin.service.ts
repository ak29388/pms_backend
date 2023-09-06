import {
  BadRequestException,
  Injectable,
  Options,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Accounts,
  Address,
  AdminTable,
  Credentials,
  Designation_table,
  Education,
  Employee,
  JobDetails,
  LeaveManagement,
  Link_title,
  LogActivity,
  MilestonesLinks,
  Milestone_Assignee,
  Milestone_Priority,
  Project,
  ProjectAssignee,
  ProjectDocument,
  ProjectMilestone,
  Project_Condition,
  Project_Phase,
  Project_roles,
  Project_Type,
  Remarks,
  Reporting,
  RequestModuleLinks,
  Request_Module,
  Roles_And_Permission,
  Salary,
  ServiceType,
  Sourced_From,
  Task,
  WorkExperience,
  Clients,
} from 'src/typeOrm';
import { getRepository, In, Repository } from 'typeorm';
import { AdminDto } from './dto/admin.dto';
import * as bcrypt from 'bcrypt';
import { messages } from 'src/helpers/message';
import { paginate } from 'typeorm-pagination/dist/helpers/pagination';
import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
import console from 'console';
import { JwtService } from '@nestjs/jwt';
import { Department_Table } from 'src/typeOrm/deparments.entity';
import { Roles } from 'src/typeOrm/roles.entity';
import { Platform } from 'src/typeOrm/platform.entity';
import { Technology } from 'src/typeOrm/technology.entity';
import { Project_Status } from 'src/typeOrm/project_status.entity';
import { Milestone_Status } from 'src/typeOrm/milestone_status.entity';
import { AccountRole, Account_Status, AddressType, Api_Log_Type, Module_Type, Project_Role, Project_status, Roles_Check } from 'src/helpers/constants';
import { EMP_Status, Role } from 'src/typeOrm/employee.entity';
import { find } from 'rxjs';
import { BaseExceptionFilter } from '@nestjs/core';
import { check } from 'prettier';
import { lstat } from 'fs';
import { privateEncrypt } from 'crypto';
// import { MailerService } from '@nestjs-modules/mailer';
@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(AdminTable)
    private readonly adminRepository: Repository<AdminTable>,
    @InjectRepository(Project)
    public projectRepository: Repository<Project>,
    @InjectRepository(Employee)
    public readonly employeeRepository: Repository<Employee>,
    @InjectRepository(Clients)
    public readonly clientsRepository: Repository<Clients>,
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
    @InjectRepository(JobDetails)
    private readonly jobDetailsRepository: Repository<JobDetails>,
    @InjectRepository(Credentials)
    private readonly credentialsRepository: Repository<Credentials>,
    @InjectRepository(WorkExperience)
    private readonly workExperienceRepository: Repository<WorkExperience>,
    @InjectRepository(Education)
    private readonly educationRepository: Repository<Education>,
    @InjectRepository(ProjectMilestone)
    private readonly projectMilestonesRepository: Repository<ProjectMilestone>,
    @InjectRepository(MilestonesLinks)
    private readonly milestoneLinksRespository: Repository<MilestonesLinks>,
    @InjectRepository(ProjectDocument)
    private readonly projectDocumentReporsitory: Repository<ProjectDocument>,
    @InjectRepository(ProjectAssignee)
    private readonly projectTeamRepository: Repository<ProjectAssignee>,
    @InjectRepository(Salary)
    private readonly salaryRepository: Repository<Salary>,
    @InjectRepository(Task)
    private readonly taskRespository: Repository<Task>,
    @InjectRepository(Accounts)
    private readonly accountRepository: Repository<Accounts>,
    @InjectRepository(Department_Table)
    private readonly departmentRepository: Repository<Department_Table>,
    @InjectRepository(Roles)
    private readonly rolesRepository: Repository<Roles>,
    @InjectRepository(Platform)
    private readonly platformRepository: Repository<Platform>,
    @InjectRepository(Technology)
    private readonly technologyRepository: Repository<Technology>,
    @InjectRepository(Project_Type)
    private readonly projectTypeRepository: Repository<Project_Type>,
    @InjectRepository(Project_Condition)
    private readonly projectConditionRepository: Repository<Project_Condition>,
    @InjectRepository(Project_Phase)
    private readonly projectPhaseRepository: Repository<Project_Phase>,
    @InjectRepository(Project_Status)
    private readonly projectStatusRepository: Repository<Project_Status>,
    @InjectRepository(Milestone_Status)
    private readonly milestoneStatusRepository: Repository<Milestone_Status>,
    @InjectRepository(Milestone_Priority)
    private readonly milestonePriorityRepository: Repository<Milestone_Priority>,
    @InjectRepository(Link_title)
    private readonly linkTitleRepository: Repository<Link_title>,
    @InjectRepository(Designation_table)
    private readonly designationRepository: Repository<Designation_table>,
    @InjectRepository(Project_roles)
    private readonly projectRolesRepository: Repository<Project_roles>,
    @InjectRepository(Request_Module)
    private readonly requestModuleRepository: Repository<Request_Module>,
    @InjectRepository(LeaveManagement)
    private readonly leaveManageRepository: Repository<LeaveManagement>,
    @InjectRepository(Roles_And_Permission)
    private readonly rolesPermissionRepository: Repository<Roles_And_Permission>,
    @InjectRepository(Remarks)
    private readonly remarksRepository: Repository<Remarks>,
    @InjectRepository(Sourced_From)
    private readonly sourceFromRepository: Repository<Sourced_From>,
    @InjectRepository(LogActivity)
    private readonly logActivityRepository: Repository<LogActivity>,
    @InjectRepository(Milestone_Assignee)
    private readonly milestoneAssigneeRepository: Repository<Milestone_Assignee>,
    @InjectRepository(ServiceType)
    private readonly serviceTypeRepository: Repository<ServiceType>,
    @InjectRepository(RequestModuleLinks)
    private readonly requestModuleLinksRepository: Repository<RequestModuleLinks>,
    @InjectRepository(Reporting)
    private readonly reportingRepository: Repository<Reporting>,
    private jwtService: JwtService,
    // private readonly mailerService: MailerService,
  ) { }

  async getMasterData() {
    try {
      const department = await this.departmentRepository.createQueryBuilder()
        .select("id AS key , departments AS value")
        .orderBy('id', 'ASC')
        .getRawMany();
      const roles = await this.rolesRepository.createQueryBuilder()
        .select("id AS key , role AS value")
        .orderBy('id', 'ASC')
        .getRawMany();
      const platform = await this.platformRepository.createQueryBuilder()
        .select("id AS key , platform AS value")
        .orderBy('id', 'ASC')
        .getRawMany();
      const technology = await this.technologyRepository.createQueryBuilder()
        .select("id AS key , technology AS value")
        .orderBy('id', 'ASC')
        .getRawMany();
      const project_type = await this.projectTypeRepository.createQueryBuilder()
        .select("id AS key , project_type AS value")
        .orderBy('id', 'ASC')
        .getRawMany();
      const project_condition = await this.projectConditionRepository.createQueryBuilder()
        .select("id AS key , project_condition AS value")
        .orderBy('id', 'ASC')
        .getRawMany();
      const project_phase = await this.projectPhaseRepository.createQueryBuilder()
        .select("id AS key , phase AS value")
        .orderBy('id', 'ASC')
        .getRawMany();
      const project_status = await this.projectStatusRepository.createQueryBuilder()
        .select("id AS key , project_status AS value")
        .orderBy('id', 'ASC')
        .getRawMany();
      const milestone_status = await this.milestoneStatusRepository.createQueryBuilder()
        .select("id AS key , milestone_status AS value")
        .orderBy('id', 'ASC')
        .getRawMany();
      const milestone_priority = await this.milestonePriorityRepository.createQueryBuilder()
        .select("id AS key , priority AS value")
        .orderBy('id', 'ASC')
        .getRawMany();
      const link_title = await this.linkTitleRepository.createQueryBuilder()
        .select("id AS key , link_title AS value")
        .orderBy('id', 'ASC')
        .getRawMany();
      const designation = await this.designationRepository.createQueryBuilder()
        .select("id AS key , designation AS value")
        .orderBy('id', 'ASC')
        .getRawMany();
      const project_roles = await this.projectRolesRepository.createQueryBuilder()
        .select("id AS key , roles AS value")
        .orderBy('id', 'ASC')
        .getRawMany();

      const sourced_from = await this.sourceFromRepository.createQueryBuilder()
        .select("id AS key , sourced_from AS value")
        .orderBy('id', 'ASC')
        .getRawMany();

      const serviceType = await this.serviceTypeRepository.createQueryBuilder()
        .select("id AS key , service_type AS value")
        .orderBy('id', 'ASC')
        .getRawMany();

      return {
        status: 200,
        message: messages.GET_ALL_DROPDOWN_FETCHED,
        department: department,
        roles: roles,
        platform: platform,
        technology: technology,
        project_type: project_type,
        project_condition: project_condition,
        project_phase: project_phase,
        project_status: project_status,
        milestone_status: milestone_status,
        milestone_priority: milestone_priority,
        link_title: link_title,
        project_roles: project_roles,
        designation: designation,
        sourced_from: sourced_from,
        serviceType: serviceType,
      };
    } catch (error) {
      throw error;
    }
  }

  async createAdmin(data: AdminDto): Promise<AdminTable> {
    try {
      return await this.adminRepository.save(data);
    } catch (error) {
      throw error;
    }
  }

  async updateAdminById(id: string, body: AdminDto) {
    try {
      return await this.adminRepository.update(id, body);
    } catch (error) {
      throw error;
    }
  }

  async findProject(data) {
    try {
      const checkName = await this.projectRepository.findBy({
        name: data.name
      });
      return checkName;
    } catch (error) {
      throw error;
    }
  }


  async createProject(data, req) {
    try {
      const project_name = data.name;
      if (project_name.length < 2) {
        return {
          status: 500,
          message: messages.NAME_ERROR
        }
      }
      const checkName = await this.projectRepository.createQueryBuilder()
        .where('name = :name', { name: data.name })
        .andWhere('status != :status', { status: Project_status.DELETED })
        .getOne();
      if (checkName) {
        return {
          status: 409,
          message: messages.PROJECT_EXISTS
        }
      }
      else {
        const platform = await this.platformRepository.findOne({
          where: {
            id: data.platform
          }
        });
        const project_condition = await this.projectConditionRepository.findOne({
          where: {
            id: data.project_condition
          }
        });

        const project_type = await this.projectTypeRepository.findOne({
          where: {
            id: data.project_type
          }
        });
        if (data.sourced_from) {
          const sourced_from = await this.sourceFromRepository.findOne({
            where: {
              id: data.sourced_from
            }
          });
          const saveProject = new Project();
          saveProject.sourced_from = sourced_from.sourced_from;
          saveProject.app_name = data.app_name;
          saveProject.budget = data.budget;
          saveProject.client_name = data.client_name;
          saveProject.end_date = data.end_date;
          saveProject.hired_id = data.hired_id;
          saveProject.name = data.name;
          saveProject.no_of_hours = data.no_of_hours;
          saveProject.notes = data.notes;
          saveProject.platform = platform.platform;
          saveProject.project_condition = project_condition.project_condition;
          saveProject.project_phase = data.project_phase;
          saveProject.project_type = project_type.project_type;
          saveProject.start_date = data.start_date;
          saveProject.url = data.url;
          const saved = await this.projectRepository.save(saveProject);
          if (saved) {
            const adminId = await this.adminRepository.findOne({
              where: {
                email: req.user.email
              }
            });
            let data = JSON.stringify(saved)
            const dataLog = new LogActivity();
            dataLog.id_admin = adminId.id;
            dataLog.admin_name = adminId.name
            dataLog.type = Api_Log_Type.CREATE;
            dataLog.sub_module_type = Module_Type.PROJECT;
            dataLog.module_type = Module_Type.PROJECT;
            dataLog.project_id = saved.id;
            dataLog.value = data
            const saveLog = await this.logActivityRepository.save(dataLog);
            return {
              status: 200,
              message: messages.PROJECT_CREATED,
            };
          }
        }
        else {
          const saveProject = new Project();
          saveProject.app_name = data.app_name;
          saveProject.budget = data.budget;
          saveProject.client_name = data.client_name;
          saveProject.end_date = data.end_date;
          saveProject.hired_id = data.hired_id;
          saveProject.name = data.name;
          saveProject.no_of_hours = data.no_of_hours;
          saveProject.notes = data.notes;
          saveProject.platform = platform.platform;
          saveProject.project_condition = project_condition.project_condition;
          saveProject.project_phase = data.project_phase;
          saveProject.project_type = project_type.project_type;
          saveProject.start_date = data.start_date;
          saveProject.url = data.url;
          const saved = await this.projectRepository.save(saveProject);
          if (saved) {
            const adminId = await this.adminRepository.findOne({
              where: {
                email: req.user.email
              }
            });
            let data = JSON.stringify(saved)
            const dataLog = new LogActivity();
            dataLog.id_admin = adminId.id;
            dataLog.admin_name = adminId.name
            dataLog.type = Api_Log_Type.CREATE;
            dataLog.sub_module_type = Module_Type.PROJECT;
            dataLog.module_type = Module_Type.PROJECT;
            dataLog.project_id = saved.id;
            dataLog.value = data
            const saveLog = await this.logActivityRepository.save(dataLog);
            return {
              status: 200,
              message: messages.PROJECT_CREATED
            };
          }
        }
      }
    } catch (error) {
      throw error;
    }
  }

  async getAllProjects(req) {
    try {
      const status = req.status;
      const column_name = req.column_name || 'project.created_at';
      const column_order = req.column_order || 'DESC';
      const search = req.search;
      const platform = req.platform;
      const sort = req.sort;
      // const limit = req.limit || 0;
      // const page = (req.page - 1) * limit || 1;
      const query = await this.projectRepository
        .createQueryBuilder('project')
        .leftJoinAndMapMany(
          'project.project_assignee',
          ProjectAssignee,
          'project_assignee',
          'project_assignee.project_id  =  project.id  and project_assignee.role = :role',
          { role: Project_Role.PROJECT_INCHARGED }
        )
        .leftJoinAndMapMany(
          'project.employee',
          Employee,
          'employee',
          'employee.id = project_assignee.emp_id'
        )
        .andWhere('project.status != :status', { status: Project_status.DELETED })
      if (search) {
        query.where(`project.name ILIKE '%${search}%'`);
      }
      if (status) {
        query.where('project.status = :status', { status: status });
      }
      if (platform) {
        query.where('project.platform = :platform', { platform: platform });
      }
      if (sort == '1') {
        const data = await query
          .select(['project', 'project_assignee.role', 'employee.first_name', 'employee.last_name'])
          .orderBy('project.name', 'ASC')
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
        .select(['project', 'project_assignee.role', 'employee.first_name', 'employee.last_name'])
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
      return await this.projectRepository.findOneBy(id);
    } catch (error) {
      throw error;
    }
  }

  async updateProject(id, data, req) {
    try {
      const adminId = await this.adminRepository.findOne({
        where: {
          email: req.user.email
        }
      });
      const platform = await this.platformRepository.findOne({
        where: {
          id: data.platform
        }
      });
      const project_condition = await this.projectConditionRepository.findOne({
        where: {
          id: data.project_condition
        }
      });

      const project_type = await this.projectTypeRepository.findOne({
        where: {
          id: data.project_type
        }
      });
      if (data.sourced_from) {
        const sourced_from = await this.sourceFromRepository.findOne({
          where: {
            id: data.sourced_from
          }
        });
        const saveProject = new Project();
        saveProject.sourced_from = sourced_from.sourced_from;
        saveProject.app_name = data.app_name;
        saveProject.budget = data.budget;
        saveProject.client_name = data.client_name;
        saveProject.end_date = data.end_date;
        saveProject.hired_id = data.hired_id;
        saveProject.name = data.name;
        saveProject.no_of_hours = data.no_of_hours;
        saveProject.notes = data.notes;
        saveProject.platform = platform.platform;
        saveProject.project_condition = project_condition.project_condition;
        saveProject.project_phase = data.project_phase;
        saveProject.project_type = project_type.project_type;
        saveProject.start_date = data.start_date;
        saveProject.url = data.url;
        const saved = await this.projectRepository.update(id, saveProject);
        if (saved) {
          let updateProject = await this.projectRepository.findOne({
            where: {
              id: id.id
            }
          });

          let data = JSON.stringify(updateProject)
          const dataLog = new LogActivity();
          dataLog.id_admin = adminId.id;
          dataLog.admin_name = adminId.name;
          dataLog.type = Api_Log_Type.UPDATE;
          dataLog.module_type = Module_Type.PROJECT;
          dataLog.sub_module_type = Module_Type.PROJECT;
          dataLog.project_id = id.id;
          dataLog.value = data
          const saveLog = await this.logActivityRepository.save(dataLog);
          return {
            status: 200,
            message: messages.PROJECT_UPDATED,
          };
        }
      }
      else {
        const saveProject = new Project();
        saveProject.app_name = data.app_name;
        saveProject.budget = data.budget;
        saveProject.client_name = data.client_name;
        saveProject.end_date = data.end_date;
        saveProject.hired_id = data.hired_id;
        saveProject.name = data.name;
        saveProject.no_of_hours = data.no_of_hours;
        saveProject.notes = data.notes;
        saveProject.platform = platform.platform;
        saveProject.project_condition = project_condition.project_condition;
        saveProject.project_phase = data.project_phase;
        saveProject.project_type = project_type.project_type;
        saveProject.start_date = data.start_date;
        saveProject.url = data.url;
        const saved = await this.projectRepository.update(id, saveProject);
        if (saved) {
          let updateProject = await this.projectRepository.findOne({
            where: {
              id: id.id
            }
          });
          let data = JSON.stringify(updateProject)
          const dataLog = new LogActivity();
          dataLog.id_admin = adminId.id;
          dataLog.admin_name = adminId.name;
          dataLog.type = Api_Log_Type.UPDATE;
          dataLog.module_type = Module_Type.PROJECT;
          dataLog.sub_module_type = Module_Type.PROJECT;
          dataLog.project_id = id.id;
          dataLog.value = data
          const saveLog = await this.logActivityRepository.save(dataLog);
          return {
            status: 200,
            message: messages.PROJECT_UPDATED,
          };
        }
      }
    } catch (error) {
      throw error;
    }
  }

  async findEmployeebyPhone(body) {
    const phoneNumber = body.email;

    return await this.employeeRepository.findOne({
      where: { email: phoneNumber },
    });
  }

  async createEmployee(data, req) {
    try {
      const adminId = await this.adminRepository.findOne({
        where: {
          email: req.user.email
        }
      });
      const checkId = await this.employeeRepository.findOne({
        where: {
          id: data.emp_id
        }
      });
      if (checkId) {
        return {
          status: 409,
          message: messages.USER_ALREADY_EXISTS
        }
      }
      const role = await this.rolesRepository.findOne({
        where: {
          id: data.role
        }
      });
      const designation = await this.designationRepository.findOne({
        where: {
          id: data.designation
        }
      });
      const deparment = await this.departmentRepository.findOne({
        where: {
          id: data.deparment
        }
      });
      const saveEmployee = new Employee();
      saveEmployee.id = data.emp_id;
      saveEmployee.old_id = data.old_id;
      saveEmployee.first_name = data.first_name;
      saveEmployee.last_name = data.last_name;
      saveEmployee.profile_image = data.profile_image;
      saveEmployee.role = role.role;
      saveEmployee.gender = data.gender;
      saveEmployee.martial_status = data.martial_status;
      saveEmployee.date_of_birth = data.date_of_birth;
      saveEmployee.blood_group = data.blood_group;
      saveEmployee.contact_number = data.contact_number;
      saveEmployee.emergency_contact_number = data.emergency_contact_number;
      saveEmployee.whatsapp_number = data.whatsapp_number;
      saveEmployee.email = data.email;
      saveEmployee.udid = data.udid;
      saveEmployee.pan_no = data.pan_no;
      const saved = await this.employeeRepository.save(saveEmployee);

      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash("Employee02", saltRounds);
      const accountCreate = new Accounts();
      accountCreate.email = data.email;
      accountCreate.password = hashedPassword;
      accountCreate.roles = AccountRole.EMPLOYEE;
      accountCreate.status = EMP_Status.ACTIVE;
      const saveAccount = await this.accountRepository.save(accountCreate);

      if (saved) {
        let datas = JSON.stringify(saved)
        const dataLog = new LogActivity();
        dataLog.id_admin = adminId.id;
        dataLog.admin_name = adminId.name;
        dataLog.type = Api_Log_Type.CREATE;
        dataLog.module_type = Module_Type.EMPLOYEE;
        dataLog.sub_module_type = Module_Type.EMPLOYEE;
        dataLog.value = datas
        const saveLogEmployee = await this.logActivityRepository.save(dataLog);



        const emp_id = saved.id;
        const saveAddress = new Address();
        saveAddress.emp_id = emp_id;
        saveAddress.address_type = AddressType.LOCAL;
        saveAddress.address_line_one = data.cu_address_line_one;
        saveAddress.address_line_two = data.cu_address_line_two;
        saveAddress.city = data.cu_city;
        saveAddress.country = data.cu_country;
        saveAddress.state = data.cu_state;
        saveAddress.isSameAddress = data.isSameAddress;
        saveAddress.postalcode = data.cu_postalcode;
        saveAddress.status = EMP_Status.ACTIVE;
        const addressCurrent = await this.addressRepository.save(saveAddress);

        let logAddress = JSON.stringify(addressCurrent)
        const dataLogAddress = new LogActivity();
        dataLogAddress.id_admin = adminId.id;
        dataLog.admin_name = adminId.name;
        dataLogAddress.type = Api_Log_Type.CREATE;
        dataLogAddress.sub_module_type = Module_Type.ADDRESS;
        dataLogAddress.module_type = Module_Type.EMPLOYEE
        dataLogAddress.is_employee = false;
        dataLogAddress.value = logAddress
        const saveLog = await this.logActivityRepository.save(dataLogAddress);

        const savePermanentAddress = new Address();
        savePermanentAddress.emp_id = emp_id;
        savePermanentAddress.address_type = AddressType.PERMANENT;
        savePermanentAddress.address_line_one = data.P_address_line_one;
        savePermanentAddress.address_line_two = data.P_address_line_two;
        savePermanentAddress.city = data.P_city;
        savePermanentAddress.country = data.P_country;
        savePermanentAddress.isSameAddress = data.isSameAddress;
        savePermanentAddress.state = data.P_state;
        savePermanentAddress.postalcode = data.P_postalcode;
        savePermanentAddress.status = EMP_Status.ACTIVE;
        const permanentAddress = await this.addressRepository.save(savePermanentAddress);

        let logAddress2 = JSON.stringify(addressCurrent)
        const dataLogAddress2 = new LogActivity();
        dataLogAddress2.id_admin = adminId.id;
        dataLog.admin_name = adminId.name;
        dataLogAddress2.type = Api_Log_Type.CREATE;
        dataLogAddress2.sub_module_type = Module_Type.ADDRESS;
        dataLogAddress2.module_type = Module_Type.EMPLOYEE;
        dataLogAddress2.is_employee = false;
        dataLogAddress2.value = logAddress2
        const saveAddress2 = await this.logActivityRepository.save(dataLogAddress2);


        return {
          status: 200,
          message: messages.EMPLOYEE_CREATED
        }
      }
      else {
        return {
          status: 500,
          message: messages.SOMETHING_WENT_WRONG
        }
      }
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }

  async updateEmployee(id, data, req) {
    try {
      const checkEmail = await this.employeeRepository.createQueryBuilder("employee")
        .where("employee.email = :email", { email: data.email })
        .andWhere("employee.id != :id", { id: id.id })
        .getOne();

      const adminId = await this.adminRepository.findOne({
        where: {
          email: req.user.email
        }
      });

      if (checkEmail) {
        return {
          status: 409,
          message: messages.EMAIL_ALREADY_EXISTS
        }
      }
      const role = await this.rolesRepository.findOne({
        where: {
          id: data.role
        }
      });
      const saveEmployee = new Employee();
      saveEmployee.id = data.emp_id;
      saveEmployee.old_id = data.old_id;
      saveEmployee.first_name = data.first_name;
      saveEmployee.last_name = data.last_name;
      saveEmployee.profile_image = data.profile_image;
      saveEmployee.role = role.role;
      saveEmployee.gender = data.gender;
      saveEmployee.martial_status = data.martial_status;
      saveEmployee.date_of_birth = data.date_of_birth;
      saveEmployee.blood_group = data.blood_group;
      saveEmployee.contact_number = data.contact_number;
      saveEmployee.emergency_contact_number = data.emergency_contact_number;
      saveEmployee.whatsapp_number = data.whatsapp_number;
      saveEmployee.email = data.email;
      saveEmployee.udid = data.udid;
      saveEmployee.pan_no = data.pan_no;
      const saved = await this.employeeRepository.update(id, saveEmployee);
      if (saved) {
        let datas = JSON.stringify(saveEmployee)
        const dataLog = new LogActivity();
        dataLog.id_admin = adminId.id;
        dataLog.admin_name = adminId.name;
        dataLog.type = Api_Log_Type.UPDATE;
        dataLog.module_type = Module_Type.EMPLOYEE;
        dataLog.sub_module_type = Module_Type.EMPLOYEE
        dataLog.value = datas
        const saveLogEmployee = await this.logActivityRepository.save(dataLog);

        const currentAddressId = data.currentAddressId;
        const saveAddress = new Address();
        saveAddress.address_type = AddressType.LOCAL;
        saveAddress.address_line_one = data.cu_address_line_one;
        saveAddress.address_line_two = data.cu_address_line_two;
        saveAddress.city = data.cu_city;
        saveAddress.isSameAddress = data.isSameAddress
        saveAddress.country = data.cu_country;
        saveAddress.state = data.cu_state;
        saveAddress.postalcode = data.cu_postalcode;
        saveAddress.state = data.cu_state;
        const addressCurrent = await this.addressRepository.update(currentAddressId, saveAddress);

        let logAddress = JSON.stringify(saveAddress)
        const dataLogAddress = new LogActivity();
        dataLogAddress.id_admin = adminId.id;
        dataLog.admin_name = adminId.name;
        dataLogAddress.type = Api_Log_Type.UPDATE;
        dataLogAddress.sub_module_type = Module_Type.ADDRESS;
        dataLogAddress.module_type = Module_Type.EMPLOYEE;
        dataLogAddress.is_employee = false;
        dataLogAddress.value = logAddress
        const saveLog = await this.logActivityRepository.save(dataLogAddress);

        const savePermanentAddress = new Address();
        const permanentAddressId = data.permanentAddressId;
        savePermanentAddress.address_type = AddressType.PERMANENT;
        savePermanentAddress.address_line_one = data.P_address_line_one;
        savePermanentAddress.address_line_two = data.P_address_line_two;
        savePermanentAddress.city = data.P_city;
        savePermanentAddress.country = data.P_country;
        savePermanentAddress.state = data.P_state;
        savePermanentAddress.postalcode = data.P_postalcode;
        savePermanentAddress.isSameAddress = data.isSameAddress
        savePermanentAddress.state = data.P_state;
        const permanentAddress = await this.addressRepository.update(permanentAddressId, savePermanentAddress);

        let logAddress2 = JSON.stringify(savePermanentAddress)
        const dataLogAddress2 = new LogActivity();
        dataLogAddress2.id_admin = adminId.id;
        dataLogAddress.admin_name = adminId.name;
        dataLogAddress2.type = Api_Log_Type.UPDATE;
        dataLogAddress2.module_type = Module_Type.EMPLOYEE;
        dataLogAddress2.sub_module_type = Module_Type.ADDRESS;
        dataLogAddress2.is_employee = false;
        dataLogAddress2.value = logAddress2
        const saveAddress2 = await this.logActivityRepository.save(dataLogAddress2);
        if (saveAddress2)
          return {
            status: 200,
            message: messages.EMPLOYEE_UPDATED
          }
      }
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }

  async getAllEmployees(req) {
    try {
      const status = req.status;
      const search = req.search;
      const department = req.department;
      const sort = req.sort;
      const designation = req.designation;
      const column_name = req.column_name || 'employee.created_at';
      const column_order = req.column_order || 'DESC';
      const query = await this.employeeRepository
        .createQueryBuilder('employee')
        .leftJoinAndSelect('employee.employeeAssignee', 'project_assignee')
        .leftJoinAndSelect('employee.employee_job', 'job_details')
        .leftJoinAndMapMany(
          'employee.departments',
          Department_Table,
          'departments',
          'departments.id = job_details.department'
        )
        .leftJoinAndMapMany(
          'employee.designation',
          Designation_table,
          'designation',
          'designation.id = job_details.designation'
        )
        .addSelect('(SELECT COUNT(*) FROM project_assignee)')
        .loadRelationCountAndMap('employee.projectcount', 'employee.employeeAssignee', 'employee.designation',)
        .andWhere("employee.status != :status", { status: EMP_Status.DELETED })
      if (search) {
        query
          .where(`employee.first_name ILIKE '%${search}%'`)
          .orWhere(`employee.last_name  ILIKE '%${search}%'`)
        // .orWhere(`departments.departments  ILIKE '%${search}%'`)
        // .orWhere(`designation.designation  ILIKE '%${search}%'`)
      }
      if(department) {    
        query
          .where('job_details.department = :department', { department: department})
      }
      if (designation) {
        query
          .where('job_details.designation = :designation', { designation: designation })
      }
      if (status) {
        query.where('employee.status = :status', { status: status });
      }
      if (sort == '1') {
        const data = await query
          .orderBy('employee.first_name', 'ASC')
          .getMany();

        return data;
      }
      if (sort == '2') {
        const data = await query
          .orderBy('employee.first_name', 'DESC')
          .getMany();

        return data;
      }
      const data = query
        .orderBy(column_name, column_order)
        .getMany();
      return data;
    } catch (error) {
      throw error;
    }
  }

  async updateAddress(id, body) {
    try {
      const where = { emp_id: id.id };
      return await this.addressRepository.update(where, body);
    } catch (error) {
      throw error;
    }
  }

  async findAddress(id) {
    try {
      const emp_id = { emp_id: id.id };
      return await this.addressRepository.findOneBy(emp_id);
    } catch (error) {
      throw error;
    }
  }

  async saveAddress(id, body) {
    try {
      const addressSave = new Address();
      addressSave.address_line_one = body.address_line_one;
      addressSave.address_type = body.address_type;
      addressSave.address_line_two = body.address_line_two;
      addressSave.city = body.city;
      addressSave.country = body.country;
      addressSave.emp_id = id.id;
      addressSave.postalcode = body.postalcode;
      addressSave.state = body.state;
      return await this.addressRepository.save(addressSave);
    } catch (error) {
      throw error;
    }
  }

  async getJobDetails(id) {
    try {
      const data = await this.jobDetailsRepository.createQueryBuilder()
        .where("emp_id  = :id", { id: id.id })
        .getOne();
      return data;
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }

  async findJobDetails(id) {
    try {
      const data = await this.jobDetailsRepository.createQueryBuilder()
        .where("emp_id  = :id", { id: id.id })
        .getCount();
      return data;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async updateJobDetails(id, body) {
    try {
      const where = { emp_id: id.id };
      const designation = await this.designationRepository.findOne({
        where: {
          id: body.designation
        }
      });
      const deparment = await this.departmentRepository.findOne({
        where: {
          id: body.department
        }
      });
      const saveJobDetails = new JobDetails();
      saveJobDetails.date_of_joinig = body.date_of_joinig;
      saveJobDetails.emp_id = id.id;
      saveJobDetails.date_of_leaving = body.date_of_leaving;
      saveJobDetails.Reporting_manager = body.Reporting_manager;
      saveJobDetails.designation = body.designation;
      saveJobDetails.department = body.department;
      saveJobDetails.job_status = body.job_status;
      return await this.jobDetailsRepository.update(where, saveJobDetails);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async saveJobDetails(id, body) {
    try {
      const designation = await this.designationRepository.findOne({
        where: {
          id: body.designation
        }
      });
      const deparment = await this.departmentRepository.findOne({
        where: {
          id: body.deparment
        }
      });
      const saveJobDetails = new JobDetails();
      saveJobDetails.date_of_joinig = body.date_of_joinig;
      saveJobDetails.emp_id = id.id;
      saveJobDetails.date_of_leaving = body.date_of_leaving;
      saveJobDetails.Reporting_manager = body.Reporting_manager;
      saveJobDetails.designation = body.designation;
      saveJobDetails.department = body.department;
      saveJobDetails.job_status = body.job_status;
      return await this.jobDetailsRepository.save(saveJobDetails);
    } catch (error) {
      throw error;
    }
  }

  async findCredentials(id): Promise<Credentials> {
    try {
      const emp_id = { emp_id: id.id };
      return await this.credentialsRepository.findOneBy(emp_id);
    } catch (error) {
      throw error;
    }
  }

  async checkEmailForCredentials(email): Promise<Credentials> {
    try {
      return await this.credentialsRepository.findOneBy(email);
    } catch (error) {
      throw error;
    }
  }

  async UpdateCredentials(id, body) {
    try {
      const checkEmail = await this.credentialsRepository.findOne({
        where: {
          id: id.id
        }
      });
      if (checkEmail) {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(body.password, saltRounds);
        const credentialssave = new Credentials();
        credentialssave.service_type = body.service_type;
        credentialssave.service_url = body.service_url;
        credentialssave.email_user_name = body.email_user_name;
        credentialssave.password = body.password;
        credentialssave.contact_number = body.contact_number;
        credentialssave.code = body.code;
        credentialssave.remarks = body.remarks;
        credentialssave.status = body.status;
        const save = await this.credentialsRepository.update(id, credentialssave);
        if (save) {
          return {
            status: 200,
            message: messages.EMPLOYEE_UPDATED
          }
        }
      }
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }


  async saveOrUpdateCredentials(id, body) {
    try {

      // const saltRounds = 10;
      // const hashedPassword = await bcrypt.hash(body.password, saltRounds);
      const credentialssave = new Credentials();
      credentialssave.emp_id = id.id;
      credentialssave.service_type = body.service_type;
      credentialssave.service_url = body.service_url;
      credentialssave.email_user_name = body.email_user_name;
      credentialssave.password = body.password;
      credentialssave.contact_number = body.contact_number;
      credentialssave.code = body.code;
      credentialssave.remarks = body.remarks;
      credentialssave.status = body.status;
      const save = await this.credentialsRepository.save(credentialssave);
      if (save) {
        return {
          status: 200,
          message: messages.EMPLOYEE_UPDATED
        }
      }
      else {
        return {
          status: 500,
          message: messages.SOMETHING_WENT_WRONG
        }
      }

    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }

  async updateWorkExperience(id, body) {
    try {

      const checkemp_id = await this.workExperienceRepository.findOneBy(id);

      if (checkemp_id) {
        return await this.workExperienceRepository.update(id, body);
      }
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }


  async saveworkExperience(id, body) {
    try {
      const saveData = new WorkExperience();
      saveData.company_name = body.company_name;
      saveData.emp_id = id.id;
      saveData.job_title = body.job_title;
      saveData.start_date = body.start_date;
      saveData.end_date = body.end_date;
      saveData.total_work_experience = body.total_work_experience;
      return await this.workExperienceRepository.save(saveData);
    } catch (error) {
      throw error;
    }
  }

  async saveOrUpdateEducation(id, body) {
    try {
      const checkemp_id = await this.educationRepository.findOneBy(id);
      if (checkemp_id) {
        const data = await this.educationRepository.update(id, body);
      }
      return {
        status: 200,
        messages: messages.DATA_CRETAED
      }
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async saveEducation(id, body) {
    try {
      const saveEducation = new Education();
      saveEducation.completion_year = body.completion_year;
      saveEducation.education_type = body.education_type;
      saveEducation.emp_id = id.id;
      saveEducation.field_of_education = body.field_of_education;
      saveEducation.qualification = body.qualification;
      saveEducation.result = body.result;
      const savedEducation = await this.educationRepository.save(saveEducation);
      if (savedEducation) {
        return {
          status: 200,
          messages: messages.DATA_CRETAED
        }
      }
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }



  async createProjectMilestone(id, body, req) {
    try {
      const adminId = await this.adminRepository.findOne({
        where: {
          email: req.user.email
        }
      });
      const project_id = id.project_id;
      const getPriority = await this.milestonePriorityRepository.findOne({
        where: {
          id: body.priority
        }
      });
      const projectMilestoneSave = new ProjectMilestone();
      projectMilestoneSave.project = project_id;
      projectMilestoneSave.name = body.name;
      projectMilestoneSave.milestone_detail = body.milestone_detail;
      projectMilestoneSave.priority = getPriority.priority;
      projectMilestoneSave.start_date = body.start_date;
      projectMilestoneSave.due_date = body.due_date;
      const recentMilestone = await this.projectMilestonesRepository.save(
        projectMilestoneSave,
      );
      let data = JSON.stringify(recentMilestone)
      const dataLog = new LogActivity();
      dataLog.id_admin = adminId.id;
      dataLog.admin_name = adminId.name;
      dataLog.type = Api_Log_Type.CREATE;
      dataLog.module_type = Module_Type.PROJECT;
      dataLog.sub_module_type = Module_Type.MILESTONE;
      dataLog.project_id = project_id;
      dataLog.value = data
      const saveLog = await this.logActivityRepository.save(dataLog);

      for (let item of body.assignee) {

        const saveMilestoneAssignee = new Milestone_Assignee();
        saveMilestoneAssignee.milestone_id = recentMilestone.id;
        saveMilestoneAssignee.assignee_id = item['assignee_id'];
        saveMilestoneAssignee.project_id = project_id;
        saveMilestoneAssignee.team_id = item['team_id'];
        const saveData = await this.milestoneAssigneeRepository.save(saveMilestoneAssignee);
        let data = JSON.stringify(saveData)
        const dataLog = new LogActivity();
        dataLog.id_admin = adminId.id;
        dataLog.admin_name = adminId.name;
        dataLog.type = Api_Log_Type.CREATE;
        dataLog.sub_module_type = Module_Type.MILESTONE_ASSIGNEE;
        dataLog.module_type = Module_Type.PROJECT;
        dataLog.project_id = project_id;
        dataLog.value = data
        const saveLog = await this.logActivityRepository.save(dataLog);
      }
      for (const item of body.links) {

        const milestone_links_data = new MilestonesLinks();
        milestone_links_data.link_title = item['link_title'];
        milestone_links_data.link_url = item['link_url'];
        milestone_links_data.milestone_id = recentMilestone.id;
        const linkSave = await this.milestoneLinksRespository.save(
          milestone_links_data,
        );
        let data = JSON.stringify(linkSave)
        const dataLog = new LogActivity();
        dataLog.id_admin = adminId.id;
        dataLog.admin_name = adminId.name;
        dataLog.type = Api_Log_Type.CREATE;
        dataLog.sub_module_type = Module_Type.MILESTONE_LINKS;
        dataLog.module_type = Module_Type.PROJECT;
        dataLog.project_id = project_id;
        dataLog.value = data
        const saveLog = await this.logActivityRepository.save(dataLog);
      }
      // const recipient = 'sfs.aditya23@gmail.com';
      // const subject = 'Assigned Milestone';
      // const content = 'This is the content of the email.';
      // await this.mailerService.sendMail({
      //   to: recipient,
      //   subject: subject,
      //   text: content,
      // });
      return;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async milestonesLinks(id, body) {
    try {
      const milestoneId = id.id;
      const checkmilestone_id = await this.milestoneLinksRespository
        .createQueryBuilder()
        .where('milestone_id = :milestone_id ', { milestone_id: milestoneId })
        .getCount();
      const updateMilestone_link = { milestone_id: milestoneId };
      if (checkmilestone_id != 0) {
        await this.milestoneLinksRespository.update(updateMilestone_link, body);
        return { message: messages.MILESTONE_LINK_UPDATE };
      } else {
        const milestones_links_data = new MilestonesLinks();
        milestones_links_data.link_title = body.link_type;
        milestones_links_data.link_url = body.link_url;
        milestones_links_data.milestone_id = milestoneId;
        return await this.milestoneLinksRespository.save(milestones_links_data);
      }
    } catch (error) {
      throw error;
    }
  }

  async getMilestones(req, id) {
    try {
      const search = req.search;
      const page = req.page;
      const limit = req.limit;
      const queryBuilder =
        this.projectMilestonesRepository.createQueryBuilder('project_milestone')
          .where("project_milestone.project_id = :id", { id: id.id })
      if (search) {
        queryBuilder.where(`project_milestone.name ILIKE '%${search}%'`);
      }
      const milestone_data = await queryBuilder
        .orderBy('project_milestone.created_at', 'DESC')
        .limit(limit || 10)
        .getMany();
      return milestone_data;
    } catch (error) {
      throw error;
    }
  }

  async getMilestonesDetails(id) {
    try {
      const Id = id.id;
      const queryBuilder = this.projectMilestonesRepository
        .createQueryBuilder('project_milestone')
        .where('project_milestone.id = :milestoneId', {
          milestoneId: Id,
        })
        .leftJoinAndMapMany(
          'project_milestone.milestone_assignee',
          Milestone_Assignee,
          'milestone_assignee',
          'milestone_assignee.milestone_id = project_milestone.id')
        .leftJoinAndMapMany(
          'project_milestone.project_assignee',
          ProjectAssignee,
          'project_assignee',
          'project_assignee.id = milestone_assignee.team_id'
        )
        .leftJoinAndMapMany(
          'project_milestone.milestone_links',
          MilestonesLinks,
          'milestone_links',
          'milestone_links.milestone_id = project_milestone.id',
        )
        .leftJoinAndMapMany(
          'project_milestone.employee',
          Employee,
          'employee',
          'milestone_assignee.assignee_id = employee.id'
        )
        .select(['project_milestone', 'milestone_links.link_title', 'milestone_links.link_url', 'employee.first_name', 'employee.last_name', 'employee.id', 'project_assignee.id '])
      // .select(
      //   'project_milestone.project_id,project_milestone.name,project_milestone.milestone_detail,project_milestone.assignee_id, project_milestone.start_date,project_milestone.due_date,project_milestone.priority,milestone_links.link_type,milestone_links.link_url,milestone_links.status',
      // );

      const data = await queryBuilder.getOne();
      return data;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async addProjectDocuments(id, body, req) {
    try {
      const saveDocument = new ProjectDocument();
      saveDocument.document_type = body.document_type;
      saveDocument.document_url = body.document_url;
      saveDocument.project = id.id;
      const saveProjectDocument = await this.projectDocumentReporsitory.save(
        saveDocument,
      );
      const adminId = await this.adminRepository.findOne({
        where: {
          email: req.user.email
        }
      });
      let datas = JSON.stringify(saveProjectDocument)
      const dataLog = new LogActivity();
      dataLog.id_admin = adminId.id;
      dataLog.admin_name = adminId.name;
      dataLog.type = Api_Log_Type.CREATE;
      dataLog.sub_module_type = Module_Type.PROJECT_LINKS;
      dataLog.project_id = id.id;
      dataLog.module_type = Module_Type.PROJECT;

      dataLog.value = datas
      const saveLogEmployee = await this.logActivityRepository.save(dataLog);
      return {
        status: 200,
        messages: messages.PROJECT_DOCUMENT_SAVED,
      };
    } catch (error) {
      throw error;
    }
  }
  async getProjectDocument(id, req) {
    try {
      const data = await this.projectDocumentReporsitory
        .createQueryBuilder('project_document')
        .where('project_document.project_id = :projectId', { projectId: id.id })
        .getMany();

      return data;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getEmployeeBySearch(search) {
    try {
      const emp_id = await this.employeeRepository
        .createQueryBuilder()
        .where('first_name like :search', { search: search.search })
        .orWhere('last_name like :search', { search: search.search })
        .getMany();
      return emp_id;
    } catch (error) {
      throw error;
    }
  }

  async addProjectTeam(id, body, req) {
    try {
      const adminId = await this.adminRepository.findOne({
        where: {
          email: req.user.email
        }
      });
      for (const item of body.members) {
        const employee = await this.employeeRepository.createQueryBuilder()
          .where("id = :first_name", { first_name: item['employee_name'] })
          .getOne();
        const role = await this.projectRolesRepository.findOne({
          where: {
            id: item.Role
          }
        })
        if (employee) {
          const checkMember = await this.projectTeamRepository.createQueryBuilder()
            .where('emp_id = :id', { id: employee.id })
            .andWhere('role = :role', { role: role.roles })
            .andWhere('project_id = :project_id', { project_id: id.id })
            .getMany();
          if (checkMember.length > 0) {
            return {
              status: 403,
              message: messages.DATA_ALREADY_EXISTS,
            }
          }
          else {
            const addNewTeam = new ProjectAssignee();
            addNewTeam.employee = employee.id;
            addNewTeam.project = id.id;
            addNewTeam.role = role.roles;
            const addedTeam = await this.projectTeamRepository.save(addNewTeam);

            if (role.roles == Project_Role.PROJECT_INCHARGED) {
              const saveIncharge = await this.projectRepository.createQueryBuilder()
                .update(Project)
                .set({ employee: employee.id })
                .where("id = :id", { id: id.id })
                .execute();
            }

            let datas = JSON.stringify(addedTeam)
            const dataLog = new LogActivity();
            dataLog.id_admin = adminId.id;
            dataLog.admin_name = adminId.name;
            dataLog.type = Api_Log_Type.CREATE;
            dataLog.sub_module_type = Module_Type.TEAM_MEMBER;
            dataLog.project_id = id.id;
            dataLog.module_type = Module_Type.PROJECT;

            dataLog.value = datas
            const saveLogEmployee = await this.logActivityRepository.save(dataLog);
          }
        }
        else {
          return {
            status: 404,
            message: messages.NOT_FOUND,
          }
        }
      }
      return {
        status: 200,
        message: messages.PROJECT_ASSIGNEE_SAVED,
      }

      // let data;
      // for (const item of body.members) {
      //   for (const name of Object.values(item['employee_name'])) {
      //     const datas = (name as string).split(' ');
      //     const first_name = Object.values(datas)[0];
      //     const last_name = Object.values(datas)[1];
      //     const employee = await this.employeeRepository.createQueryBuilder("employee")
      //       .where("employee.first_name = :first_name", { first_name: first_name })
      //       .andWhere("employee.last_name = :last_name", { last_name: last_name })
      //       .getOne();
      //     if (employee) {
      //       const addNewTeam = new ProjectAssignee();
      //       addNewTeam.emp_id = employee.id;
      //       addNewTeam.project_id = id.id;
      //       addNewTeam.role = item.Role;
      //      let data = await this.projectTeamRepository.save(addNewTeam);
      //     }
      //   }
      // }
      // return data;
    } catch (error) {
      throw error;
    }
  }

  async getProjectTeamMembers(id) {
    try {
      const Id = id.id;
      const data = await this.projectTeamRepository.createQueryBuilder('project_assignee')
        .leftJoinAndMapMany(
          'project_assignee.milestone_assignee',
          Milestone_Assignee,
          'milestone_assignee',
          'milestone_assignee.team_id = project_assignee.id'
        )
        .leftJoinAndMapMany(
          'project_assignee.project_milestone',
          ProjectMilestone,
          'project_milestone',
          'project_milestone.id = milestone_assignee.milestone_id'
        )
        .leftJoinAndMapMany(
          'project_assignee.employee',
          Employee,
          'employee',
          'project_assignee.emp_id = employee.id'
        )
        .leftJoinAndMapMany(
          'employee.job_details',
          JobDetails,
          'job_details',
          'job_details.emp_id = project_assignee.emp_id',
        )
        .where('project_assignee.project_id = :project_id', { project_id: Id })
        // .andWhere('project_assignee.id = milestone_assignee.team_id')
        // .andWhere('project_assignee.emp_id = employee.id')
        .select(['project_assignee.id', 'employee.id', 'employee.first_name', 'employee.last_name', 'project_assignee.role', 'project_milestone.name', 'project_milestone.id', 'project_assignee.created_at', 'job_details.department'])
        .getRawMany();
      // const data = await this.employeeRepository
      //   .createQueryBuilder('employee')
      //   .leftJoinAndMapMany(
      //     'employee.project_assignee',
      //     ProjectAssignee,
      //     'project_assignee',
      //     'project_assignee.emp_id = employee.id',
      //   )
      //   .leftJoinAndMapMany(
      //     'employee.project_milestone',
      //     ProjectMilestone,
      //     'project_milestone',
      //     'project_milestone.project_id = project_assignee.project_id',
      //   )
      //   .leftJoinAndMapMany(
      //     'employee.milestone_assignee',
      //     Milestone_Assignee,
      //     'milestone_assignee',
      //     'milestone_assignee.milestone_id = project_milestone.id',
      //   )
      //   .leftJoinAndMapMany(
      //     'employee.job_details',
      //     JobDetails,
      //     'job_details',
      //     'job_details.emp_id = project_assignee.emp_id',
      //   )
      //   .where('project_assignee.project_id = :project_id', { project_id: Id })
      //   .andWhere('project_assignee.id = milestone_assignee.team_id')
      //   // .select("project_assignee.id ,employee.id AS employee_id, employee.first_name AS employee_first_name, employee.last_name AS employee_last_name,project_assignee.role AS employee_role, project_milestone.start_date AS project_milestone_start_date, job_details.department AS job_details_department")
      //   .select(['employee.id', 'employee.first_name', 'employee.last_name', 'project_assignee.role', 'project_assignee.id', 'project_assignee.status', 'job_details.department', 'milestone_assignee.milestone_name'])
      //   .getRawMany();
      if (data.length > 0) {
        return {
          status: 200,
          message: messages.TEAM_FETCHED_SUCCESSFULLY,
          data: data
        }
      }
      else {
        return {
          status: 200,
          message: messages.NOT_FOUND,
          data: data
        }
      }
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async addSalaryEmployee(id, body) {
    try {
      const emp_id = id.id;
      const addSalary = new Salary();
      addSalary.emp_id = emp_id;
      addSalary.basic_salary = body.basic_salary;
      addSalary.effective_date = body.effective_date;
      addSalary.bank_account = body.bank_account;
      addSalary.branch_name = body.branch_name;
      addSalary.ifsc_code = body.ifsc_code;
      addSalary.last_CTC = body.last_CTC;
      addSalary.next_review_date = body.next_review_date
      addSalary.inHand_Salary = body.inHand_Salary;
      addSalary.mode_Of_Payment = body.mode_Of_Payment;
      addSalary.last_salary_Date = body.last_salary_date;
      addSalary.last_salary_hike = body.last_salary_hike;
      return await this.salaryRepository.save(addSalary);
    } catch (error) {
      throw error;
    }
  }

  // async addEmployeeLastSalary(id, body){
  //   try {
  //     const emp_id = id.id;
  //     const addLastSalary = new Salary();

  //   } catch (error) {
  //     throw new BadRequestException(error.message)
  //   }
  // }

  async updateSalaryEmployee(id, body) {
    try {
      const addSalary = new Salary();
      addSalary.basic_salary = body.basic_salary;
      addSalary.effective_date = body.effective_date;
      addSalary.bank_account = body.bank_account;
      addSalary.branch_name = body.branch_name;
      addSalary.ifsc_code = body.ifsc_code;
      addSalary.last_CTC = body.last_CTC;
      addSalary.inHand_Salary = body.inHand_Salary;
      addSalary.next_review_date = body.next_review_date
      addSalary.mode_Of_Payment = body.mode_Of_Payment;
      addSalary.last_salary_Date = body.last_salary_date;
      addSalary.last_salary_hike = body.last_salary_hike;
      return await this.salaryRepository.update(id, addSalary);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getEmployeeSalary(id) {
    try {
      const getData = await this.salaryRepository.createQueryBuilder()
        .where("emp_id = :id", { id: id.id })
        .getOne();
      return getData;
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }

  async addTasks(id, body, req) {
    try {
      const adminId = await this.adminRepository.findOne({
        where: {
          email: req.user.email
        }
      });
      const project_id = id.id;
      const addTask = new Task();
      addTask.project = project_id;
      addTask.task_title = body.task_title;
      addTask.start_date = body.start_date;
      addTask.end_date = body.end_date;
      addTask.Priority_Label = body.Priority_Label;
      addTask.status = body.status;
      addTask.assigned_to = body.assigned_to;
      addTask.description = body.description;
      const savedTasked = await this.taskRespository.save(addTask);

      let data = JSON.stringify(savedTasked)
      const dataLog = new LogActivity();
      dataLog.id_admin = adminId.id;
      dataLog.admin_name = adminId.name;
      dataLog.type = Api_Log_Type.CREATE;
      dataLog.sub_module_type = Module_Type.TASK;
      dataLog.module_type = Module_Type.PROJECT;
      dataLog.project_id = project_id;
      dataLog.value = data
      const saveLog = await this.logActivityRepository.save(dataLog);
      return;
    } catch (error) {
      throw error;
    }
  }

  async updateTasks(id, body, req) {
    try {
      const Id = id.id;
      const addTask = new Task();
      addTask.task_title = body.task_title;
      addTask.start_date = body.start_date;
      addTask.end_date = body.end_date;
      addTask.Priority_Label = body.Priority_Label;
      addTask.status = body.status;
      addTask.assigned_to = body.assigned_to;
      addTask.description = body.description;
      const data = await this.taskRespository.update(Id, addTask);
      const updatedTask = await this.taskRespository.findOne({
        where: {
          id: Id
        }
      });
      const adminId = await this.adminRepository.findOne({
        where: {
          email: req.user.email
        }
      });
      let datas = JSON.stringify(updatedTask)
      const dataLog = new LogActivity();
      dataLog.id_admin = adminId.id;
      dataLog.admin_name = adminId.name;
      dataLog.type = Api_Log_Type.UPDATE;
      dataLog.sub_module_type = Module_Type.TASK;
      dataLog.module_type = Module_Type.PROJECT;
      dataLog.project_id = +updatedTask.project;
      dataLog.value = datas
      const saveLog = await this.logActivityRepository.save(dataLog);
      return {
        status: 200,
        message: messages.TASK_UPDATE,
      };
    } catch (error) {
      throw error;
    }
  }

  async getAllTasks(req, id) {
    try {
      const search = req.search;

      const column = req.column || 'task.created_at';
      const sort = req.sort || 'DESC';
      const query = await this.taskRespository.createQueryBuilder('task')
        .leftJoin(Employee, 'employee', 'employee.id = task.assigned_to')
        .where("task.project_id = :id", { id: id.id })
      if (search) {
        query.where('task.task_title like :search', { search: search });
      }
      const data = await query
        .select("task.id ,task.task_title , task.start_date, task.end_date, task.Priority_Label , task.status , CONCAT(employee.first_name,' ', employee.last_name) AS assignee")
        .orderBy(column, sort)
        .getRawMany();

      return {
        status: 200,
        message: messages.TASK_FETCHED,
        data: data,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async updateRequestModule(id, data, req) {
    try {
      const adminId = await this.adminRepository.findOne({
        where: {
          email: req.user.email
        }
      });
      const updateModule = new Request_Module();
      updateModule.title = data.title;
      updateModule.client_approved = data.client_approved;
      updateModule.description = data.description;
      updateModule.no_of_hours = data.no_of_hours;
      const update = await this.requestModuleRepository.update(id, updateModule);
      const updatedModule = await this.requestModuleRepository.findOne({
        where: {
          id: id.id
        }
      });
      let datas = JSON.stringify(updatedModule);
      const dataLog = new LogActivity();
      dataLog.id_admin = adminId.id;
      dataLog.admin_name = adminId.name;
      dataLog.type = Api_Log_Type.UPDATE;
      dataLog.sub_module_type = Module_Type.REQUEST_MODULE;
      dataLog.module_type = Module_Type.PROJECT;
      dataLog.project_id = +updatedModule.project;
      dataLog.value = datas;
      const saveLogEmployee = await this.logActivityRepository.save(dataLog);
      const moduleId = { module_id: id.id };
      const deleteModuleLinks = await this.requestModuleLinksRepository.delete(moduleId)
      if (deleteModuleLinks) {
        for (const item of data.links) {
          const saveModuleLinks = new RequestModuleLinks();
          saveModuleLinks.link_title = item['link_title'];
          saveModuleLinks.link_url = item['link_url'];
          saveModuleLinks.module_id = id.id;
          const saveLinks = await this.requestModuleLinksRepository.save(saveModuleLinks);
          let datas = JSON.stringify(saveLinks)
          const dataLog = new LogActivity();
          dataLog.id_admin = adminId.id;
          dataLog.admin_name = adminId.name;
          dataLog.type = Api_Log_Type.CREATE;
          dataLog.sub_module_type = Module_Type.REQUEST_MODULE_LINKS;
          dataLog.project_id = +updatedModule.project;
          dataLog.module_type = Module_Type.PROJECT;

          dataLog.value = datas
          const saveLogEmployee = await this.logActivityRepository.save(dataLog);
        }
      }
      return {
        status: 200,
        message: messages.MODULE_UPDATED,
        data: updatedModule,
      }
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }


  async addRequestModule(id, data, req) {
    try {
      const adminId = await this.adminRepository.findOne({
        where: {
          email: req.user.email
        }
      });
      const saveModule = new Request_Module();
      saveModule.title = data.title;
      saveModule.project = id.id;
      saveModule.client_approved = data.client_approved;
      saveModule.description = data.description;
      saveModule.no_of_hours = data.no_of_hours;
      const save = await this.requestModuleRepository.save(saveModule);
      let datas = JSON.stringify(save)
      const dataLog = new LogActivity();
      dataLog.id_admin = adminId.id;
      dataLog.admin_name = adminId.name;
      dataLog.type = Api_Log_Type.CREATE;
      dataLog.sub_module_type = Module_Type.REQUEST_MODULE;
      dataLog.module_type = Module_Type.PROJECT;
      dataLog.project_id = id.id;
      dataLog.value = datas;
      const saveLogEmployee = await this.logActivityRepository.save(dataLog);
      if (save) {
        for (const item of data.links) {
          const saveModuleLinks = new RequestModuleLinks();
          saveModuleLinks.link_title = item['link_title'];
          saveModuleLinks.link_url = item['link_url'];
          saveModuleLinks.module_id = save.id;
          const saveLinks = await this.requestModuleLinksRepository.save(saveModuleLinks);
          let datas = JSON.stringify(saveLinks)
          const dataLog = new LogActivity();
          dataLog.id_admin = adminId.id;
          dataLog.admin_name = adminId.name;
          dataLog.type = Api_Log_Type.CREATE;
          dataLog.sub_module_type = Module_Type.REQUEST_MODULE_LINKS;
          dataLog.project_id = id.id;
          dataLog.module_type = Module_Type.PROJECT;

          dataLog.value = datas
          const saveLogEmployee = await this.logActivityRepository.save(dataLog);
        }
        return {
          status: 200,
          message: messages.REQUEST_MODULE_CHANGED,
        };
      }
    } catch (error) {
      throw error;
    }
  }

  async getRequestListing(req, id) {
    try {
      const search = req.search;
      const column = req.column || 'request_module.created_at';
      const sort = req.sort || 'DESC';
      const query = await this.requestModuleRepository.createQueryBuilder(
        'request_module',
      )
        .leftJoinAndMapMany(
          'request_module.project',
          Project,
          'project',
          'project.id = request_module.project_id')
        .where('request_module.project_id = :id', { id: id.id })
      if (search) {
        query.where('request_module.title like :search', { search: search });
      }
      const data = query
        .select(['project.name', 'request_module'])
        .orderBy(column, sort)
        .getMany();

      return data;
    } catch (error) {
      throw error;
    }
  }

  async getRequestDetails(id) {
    try {
      const data = await this.requestModuleRepository.createQueryBuilder('request_module')
        .leftJoinAndMapMany(
          'request_module.request_module_links',
          RequestModuleLinks,
          'request_module_links',
          'request_module.id = request_module_links.module_id'
        )
        .where("request_module.id =  :id", { id: id.id })
        .getOne();
      return data;
    } catch (error) {
      throw error;
    }
  }

  async applyLeave(body) {
    try {
      const data = await this.leaveManageRepository.save(body);
      if (data) {
        return {
          status: 200,
          message: messages.LEAVE_APPLIED,
        };
      }
    } catch (error) {
      throw error;
    }
  }

  async getLeaveManagement(req) {
    try {
      const limit = req.limit || 10;
      const page = (req.page - 1) * limit || 0;
      const column = req.column || 'created_at';
      const sort = req.sort || 'DESC';
      const query = await this.leaveManageRepository
        .createQueryBuilder('leave_management')
        .orderBy(column, sort)
        .limit(limit)
        .offset(page)
        .getMany();
      return {
        status: 200,
        message: messages.LEAVE_FETCHED,
        data: query,
      };
    } catch (error) {
      throw error;
    }
  }

  // async saveAdminSettings(body) {
  //   try {
  //     for await (const element of body.employee) {
  //       const user = await this.rolesPermissionRepository.findOne({
  //         where: { emp_id: element['emp_id'] },
  //       });
  //       if (user) {
  //         const userId = user.id;
  //         const saveData = new Roles_And_Permission();
  //         saveData.create = element['create'];
  //         saveData.delete = element['delete'];
  //         saveData.fullAccess = element['fullAccess'];
  //         saveData.read = element['read'];
  //         saveData.write = element['write'];
  //         await this.rolesPermissionRepository.update(userId, saveData);
  //         return {
  //           status: 200,
  //           message: messages.ROLES_PERMISSION_SAVED,
  //         };
  //       } else {
  //         const saveData = new Roles_And_Permission();
  //         saveData.emp_id = element['emp_id'];
  //         saveData.create = element['create'];
  //         saveData.delete = element['delete'];
  //         saveData.fullAccess = element['fullAccess'];
  //         saveData.read = element['read'];
  //         saveData.write = element['write'];
  //         await this.rolesPermissionRepository.save(saveData);
  //       }
  //     }
  //     return {
  //       status: 200,
  //       message: messages.SETTING_SAVED
  //     }
  //   } catch (error) {
  //     throw new BadRequestException(error.message)
  //   }
  // }

  async rolePermission(body, id) {
    try {
      const findEmp = await this.rolesPermissionRepository.createQueryBuilder()
        .where("admin_id = :id", { id: id.id })
        .getMany();
      if (findEmp) {
        const deletePermission = await this.rolesPermissionRepository.createQueryBuilder()
          .delete()
          .from('roles_and_permission')
          .where("admin_id = :id", { id: id.id })
          .execute();
        for (const item of body.roles_Permission) {
          const saveRoles = new Roles_And_Permission();
          saveRoles.admin_id = id.id;
          saveRoles.module = item.module;
          saveRoles.read = item.read;
          saveRoles.write = item.write;
          saveRoles.create = item.create;
          saveRoles.delete = item.delete;
          await this.rolesPermissionRepository.save(saveRoles);
        }
      }
      else {
        for (const item of body.roles_Permission) {
          const saveRoles = new Roles_And_Permission();
          saveRoles.admin_id = id.id;
          saveRoles.module = item.module;
          saveRoles.read = item.read;
          saveRoles.write = item.write;
          saveRoles.create = item.create;
          saveRoles.delete = item.delete;
          await this.rolesPermissionRepository.save(saveRoles);
        }
      }
    }
    catch (error) {
      throw error;
    }
  }

  // async rolesPermissionAdmins(id , body){
  //   try {
  //     for (const item of body.roles_Permission) {
  //       const saveRoles = new Roles_And_Permission();
  //       saveRoles.emp_id = id.id;
  //       saveRoles.module = item.module;
  //       saveRoles.read = item.read;
  //       saveRoles.write = item.write;
  //       saveRoles.create = item.create;
  //       saveRoles.delete = item.delete;
  //       await this.rolesPermissionRepository.save(saveRoles);
  //     }
  //   } catch (error) {
  //     throw new BadRequestException(error.message)
  //   }
  // }


  async getRolesAndPermission(req, id) {
    try {
      const limit = req.limit;
      const page = (req.page - 1) * limit || 0;
      const column = req.column || 'created_at';
      const sort = req.sort || 'DESC';
      const data = await this.rolesPermissionRepository.createQueryBuilder("roles_and_permission")
        .where("admin_id = :id", { id: id.id })
        .getMany();
      return {
        status: 200,
        message: messages.ROLES_PERMISSION_FETCHED,
        data: data
      }
    } catch (error) {
      throw error;
    }
  }

  async updateMilestone(id, body, query, req) {
    try {
      const adminId = await this.adminRepository.findOne({
        where: {
          email: req.user.email
        }
      });
      const getPriority = await this.milestonePriorityRepository.findOne({
        where: {
          id: body.priority
        }
      });

      const projectId = query.project_id;

      const projectMilestoneSave = new ProjectMilestone();
      projectMilestoneSave.name = body.name;
      projectMilestoneSave.milestone_detail = body.milestone_detail;
      projectMilestoneSave.priority = getPriority.priority;
      projectMilestoneSave.start_date = body.start_date;
      projectMilestoneSave.due_date = body.due_date;
      projectMilestoneSave.project = projectId;
      const recentMilestone = await this.projectMilestonesRepository.update(
        id, projectMilestoneSave,
      );
      // const updatedMilestone = await this.projectMilestonesRepository.find(id)
      let data = JSON.stringify(projectMilestoneSave)
      const dataLog = new LogActivity();
      dataLog.id_admin = adminId.id;
      dataLog.admin_name = adminId.name;
      dataLog.type = Api_Log_Type.UPDATE;
      dataLog.sub_module_type = Module_Type.MILESTONE
      dataLog.module_type = Module_Type.PROJECT;
      dataLog.project_id = projectId;
      dataLog.value = data
      const saveLog = await this.logActivityRepository.save(dataLog);
      const milestone_id = { milestone_id: id.id }
      const deleteMilestone = await this.milestoneAssigneeRepository.delete(milestone_id);
      for (let item of body.assignee) {
        if (deleteMilestone) {

          const saveMilestoneAssignee = new Milestone_Assignee();
          saveMilestoneAssignee.milestone_id = id.id;
          saveMilestoneAssignee.assignee_id = item['assignee_id'];
          saveMilestoneAssignee.team_id = item['team_id'];
          saveMilestoneAssignee.project_id = projectId;
          saveMilestoneAssignee.milestone_name = body.name;
          const saveData = await this.milestoneAssigneeRepository.save(saveMilestoneAssignee);

          let data = JSON.stringify(saveData)
          const dataLog = new LogActivity();
          dataLog.id_admin = adminId.id;
          dataLog.admin_name = adminId.name;
          dataLog.type = Api_Log_Type.CREATE;
          dataLog.sub_module_type = Module_Type.MILESTONE_ASSIGNEE;
          dataLog.module_type = Module_Type.PROJECT;
          dataLog.project_id = projectId;
          dataLog.value = data
          const saveLog = await this.logActivityRepository.save(dataLog);
        }

      }
      const deleteLinks = await this.milestoneLinksRespository.delete(milestone_id);
      for (const item of body.links) {

        if (deleteLinks) {
          const milestone_links_data = new MilestonesLinks();
          milestone_links_data.link_title = item['link_title'];
          milestone_links_data.link_url = item['link_url'];
          milestone_links_data.milestone_id = id.id;
          const linkSave = await this.milestoneLinksRespository.save(
            milestone_links_data,
          );
          let data = JSON.stringify(linkSave)
          const dataLog = new LogActivity();
          dataLog.id_admin = adminId.id;
          dataLog.admin_name = adminId.name;
          dataLog.type = Api_Log_Type.CREATE;
          dataLog.sub_module_type = Module_Type.MILESTONE_LINKS;
          dataLog.module_type = Module_Type.PROJECT;
          dataLog.project_id = projectId;
          dataLog.value = data
          const saveLog = await this.logActivityRepository.save(dataLog);
        }

      }
      return;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async updateDocuments(id, body, req) {
    try {
      const adminId = await this.adminRepository.findOne({
        where: {
          email: req.user.email
        }
      });
      const updateDocument = new ProjectDocument()
      updateDocument.document_type = body.document_type;
      const data = await this.projectDocumentReporsitory.update(id, updateDocument)

      if (data) {
        const getUpdateData = await this.projectDocumentReporsitory.createQueryBuilder()
          .where('id = :id', { id: id.id })
          .getOne();
        let data = JSON.stringify(getUpdateData)
        const dataLog = new LogActivity();
        dataLog.id_admin = adminId.id;
        dataLog.admin_name = adminId.name;
        dataLog.type = Api_Log_Type.UPDATE;
        dataLog.sub_module_type = Module_Type.PROJECT_LINKS
        dataLog.module_type = Module_Type.PROJECT;
        dataLog.project_id = +getUpdateData.project;
        dataLog.value = data
        const saveLog = await this.logActivityRepository.save(dataLog);
        return {
          status: 200,
          message: messages.PROJECT_DOCUMENT_UPDATED,
        };
      }
      else {
        return {
          status: 500,
          message: messages.SOMETHING_WENT_WRONG,
        };
      }
    } catch (error) {
      throw error;
    }
  }


  async deleteProject(req, id) {
    try {
      const findProject = await this.projectRepository.findOne({
        where: {
          id: id.id
        }
      });
      if (findProject) {
        const updateStatus = new Project();
        updateStatus.status = Project_status.DELETED;
        const deletProject = await this.projectRepository.update(id, updateStatus);
        if (deletProject) {
          const adminId = await this.adminRepository.findOne({
            where: {
              email: req.user.email
            }
          });
          let data = JSON.stringify(findProject)
          const dataLog = new LogActivity();
          dataLog.id_admin = adminId.id;
          dataLog.admin_name = adminId.name;
          dataLog.type = Api_Log_Type.DELETE;
          dataLog.sub_module_type = Module_Type.PROJECT
          dataLog.module_type = Module_Type.PROJECT;
          dataLog.project_id = id.id;
          dataLog.value = data
          const saveLog = await this.logActivityRepository.save(dataLog);
        }
        return {
          status: 200,
          message: messages.PROJECT_DELETED
        }
      }
      else {
        return {
          status: 500,
          message: messages.SOMETHING_WENT_WRONG
        }
      }
    } catch (error) {
      throw error;
    }
  }


  async deleteEmployee(id) {
    try {
      const findEmployee = await this.employeeRepository.findOne({
        where: {
          id: id.id
        }
      });
      if (findEmployee) {
        const updateStatus = new Employee();
        updateStatus.status = EMP_Status.DELETED;
        const deletEmployee = await this.employeeRepository.update(id, updateStatus);
        return {
          status: 200,
          message: messages.EMPLOYEE_DELETED
        }
      }
      else {
        return {
          status: 500,
          message: messages.SOMETHING_WENT_WRONG
        }
      }
    } catch (error) {
      throw error;
    }
  }

  async addRemarks(id, body) {
    try {
      const checkEmp = await this.employeeRepository.findOne({
        where: { id: id.id }
      });
      if (checkEmp) {
        const saveRemarks = new Remarks()
        saveRemarks.employee_id = id.id;
        saveRemarks.remarks = body.remarks
        const saved = await this.remarksRepository.save(saveRemarks);
        return saved;
      }
    } catch (error) {
      throw error;
    }
  }

  async getEmployeeDropdown(req) {
    try {
      const search = req.search;
      const listing = await this.employeeRepository.createQueryBuilder("employee");
      if (search) {
        listing.where(`employee.first_name ILIKE '%${search}%'`)
          .orWhere(`employee.last_name  ILIKE '%${search}%'`)
      }
      const data = await listing
        .select("CONCAT(employee.first_name,' ',employee.last_name)AS value , id AS key")
        .getRawMany();
      return data;
    } catch (error) {
      throw error;
    }
  }

  async getProjectDropDown() {
    try {
      const listing = await this.projectRepository.createQueryBuilder('project')
        .select("project.name , project.id")
        .getRawMany();
      return listing
    } catch (error) {
      throw error;
    }
  }

  async getEmployeeDetails(id) {
    try {

      const query = await this.employeeRepository.createQueryBuilder('employee')
        .where("employee.id =  :id", { id: id.id })
        .leftJoinAndMapMany(
          'employee.job_details',
          JobDetails,
          'job_details',
          'job_details.emp_id = employee.id'
        )
        .leftJoinAndMapMany(
          'employee.credentials',
          Credentials,
          'credentials',
          'employee.id = credentials.emp_id'
        )
        .leftJoinAndMapMany(
          'employee.work_experience',
          WorkExperience,
          'work_experience',
          'employee.id = work_experience.emp_id'
        )
        .leftJoinAndMapMany(
          'employee.education',
          Education,
          'education',
          'employee.id = education.emp_id'
        )
        .leftJoinAndMapMany(
          'employee.address',
          Address,
          'address',
          'address.emp_id = employee.id'
        )
        .select(['employee', 'credentials', 'job_details', 'work_experience', 'education'])
        .getOne();

      const currentAddress = await this.addressRepository.createQueryBuilder('address')
        .where('address.emp_id = :id', { id: id.id })
        .andWhere('address.address_type = :type', { type: AddressType.LOCAL })
        .getOne();
      const permanentAddress = await this.addressRepository.createQueryBuilder('address')
        .where('address.emp_id = :id', { id: id.id })
        .andWhere('address.address_type = :type', { type: AddressType.PERMANENT })
        .getOne();

      const isSameAddress = await this.addressRepository.createQueryBuilder('address')
        .where('address.emp_id = :id', { id: id.id })
        .andWhere('address.address_type = :type', { type: AddressType.LOCAL })
        .select("address.isSameAddress")
        .getOne();

      const data = { ...query, permanentAddress, isSameAddress, currentAddress };
      return {
        status: 200,
        message: messages.EMPLOYEE_FETCHED,
        data: data
      }
    } catch (error) {
      throw error;
    }
  }
  async sendRandomId() {
    try {
      var val = Math.floor(1000 + Math.random() * 9000);
      const emp_id = 'SFS' + val;
      const checkEmpId = await this.employeeRepository.createQueryBuilder()
        .where("id = :id", { id: emp_id })
        .getOne();
      if (checkEmpId) {
        var val = Math.floor(1000 + Math.random() * 9000);
        const emp_id = 'SFS' + val;
        return emp_id;
      }
      return emp_id;
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }

  async deleteMilestone(req, id) {
    try {
      const findMilestone = await this.projectMilestonesRepository.findOne({
        where: {
          id: id.id
        }
      });
      const project_id = findMilestone.project;
      const deleteMilestone = await this.projectMilestonesRepository.delete(id);
      if (deleteMilestone) {
        const milestoneId = { milestone_id: id.id }
        const milestoneAssignee = await this.milestoneAssigneeRepository.delete(milestoneId);
        const milestoneLinks = await this.milestoneLinksRespository.delete(milestoneId);
        const adminId = await this.adminRepository.findOne({
          where: {
            email: req.user.email
          }
        });
        let data = JSON.stringify(findMilestone)
        const dataLog = new LogActivity();
        dataLog.id_admin = adminId.id;
        dataLog.admin_name = adminId.name;
        dataLog.type = Api_Log_Type.DELETE;
        dataLog.sub_module_type = Module_Type.MILESTONE
        dataLog.module_type = Module_Type.PROJECT;
        dataLog.project_id = +project_id;
        dataLog.value = data
        const saveLog = await this.logActivityRepository.save(dataLog);

        return {
          status: 200,
          message: messages.MILESTONE_DELETED,
        }

      }
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }


  async deleteTeamMeber(id, req) {
    try {
      const Id = req.query.milestone_id;
      if (Id) {
        const deleteMilestoneAssignee = await this.milestoneAssigneeRepository.delete(Id);
        const findTeam = await this.projectTeamRepository.findOne({
          where: {
            id: id.id
          }
        });
        const project_id = findTeam.project;

        const deleteMilestone = await this.projectTeamRepository.delete(id);
        const adminId = await this.adminRepository.findOne({
          where: {
            email: req.user.email
          }
        });
        let data = JSON.stringify(findTeam)
        const dataLog = new LogActivity();
        dataLog.id_admin = adminId.id;
        dataLog.admin_name = adminId.name;
        dataLog.type = Api_Log_Type.DELETE;
        dataLog.sub_module_type = Module_Type.TEAM_MEMBER
        dataLog.module_type = Module_Type.PROJECT;
        dataLog.project_id = +project_id;
        dataLog.value = data
        const saveLog = await this.logActivityRepository.save(dataLog);
        return {
          status: 200,
          message: messages.TEAM_MEMBER_DELETED,
        }
      }
      else {
        const findTeam = await this.projectTeamRepository.createQueryBuilder()
          .where("id = :id", { id: id.id })
          .getOne();
        const project_id = findTeam.project;
        const deleteMilestone = await this.projectTeamRepository.delete(id);
        const adminId = await this.adminRepository.findOne({
          where: {
            email: req.user.email
          }
        });
        let data = JSON.stringify(findTeam)
        const dataLog = new LogActivity();
        dataLog.id_admin = adminId.id;
        dataLog.admin_name = adminId.name;
        dataLog.type = Api_Log_Type.DELETE;
        dataLog.sub_module_type = Module_Type.TEAM_MEMBER
        dataLog.module_type = Module_Type.PROJECT;
        dataLog.project_id = +project_id;
        dataLog.value = data
        const saveLog = await this.logActivityRepository.save(dataLog);
        return {
          status: 200,
          message: messages.TEAM_MEMBER_DELETED,
        }
      }
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }

  async logActivity(options, id) {
    try {
      const limit = options.limit;
      const page = (options.page - 1) * limit || 0;
      const type = options.type;
      const listingLogs = await this.logActivityRepository.createQueryBuilder()
        .where("module_type = :project", { project: type })
        .andWhere("project_id = :id", { id: id.id })
        .orderBy('created_at', 'DESC')
        .limit(limit)
        .offset(page)
        .getMany();
      return {
        status: 200,
        message: messages.DATA_FTECHED,
        data: listingLogs
      }
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }

  async deleteProjectDocument(req, id) {
    try {
      const findDocument = await this.projectDocumentReporsitory.findOne({
        where: {
          id: id.id
        }
      });
      const project_id = findDocument.project;
      const deleteDocument = await this.projectDocumentReporsitory.delete(id);
      const adminId = await this.adminRepository.findOne({
        where: {
          email: req.user.email
        }
      });
      let data = JSON.stringify(findDocument)
      const dataLog = new LogActivity();
      dataLog.id_admin = adminId.id;
      dataLog.admin_name = adminId.name;
      dataLog.type = Api_Log_Type.DELETE;
      dataLog.sub_module_type = Module_Type.PROJECT_DOCUMENT
      dataLog.module_type = Module_Type.PROJECT;
      dataLog.project_id = +project_id;
      dataLog.value = data
      const saveLog = await this.logActivityRepository.save(dataLog);
      if (deleteDocument) {
        return {
          status: 200,
          message: messages.DELETED_DOCUMENT,
        }
      }
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }

  async getAssignee(id) {
    try {
      const assignee = await this.employeeRepository.createQueryBuilder('employee')
        .leftJoin(ProjectAssignee, 'project_assignee', 'employee.id = project_assignee.emp_id')
        .where('project_assignee.project_id = :id', { id: id.id })
        .select("CONCAT(employee.first_name,' ',employee.last_name)AS value , employee.id AS key , project_assignee.id")
        .getRawMany()
      return assignee;
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }
  async deleteModule(id, req) {
    try {
      const findModule = await this.requestModuleRepository.findOne({
        where: {
          id: id.id
        }
      });
      const deleteModule = await this.requestModuleRepository.delete(id);
      if (deleteModule) {
        const moduleId = { module_id: id.id }
        const deleteModuleLinks = await this.requestModuleLinksRepository.delete(moduleId);
        const adminId = await this.adminRepository.findOne({
          where: {
            email: req.user.email
          }
        });
        let data = JSON.stringify(findModule)
        const dataLog = new LogActivity();
        dataLog.id_admin = adminId.id;
        dataLog.admin_name = adminId.name;
        dataLog.type = Api_Log_Type.DELETE;
        dataLog.sub_module_type = Module_Type.REQUEST_MODULE
        dataLog.module_type = Module_Type.PROJECT;
        dataLog.project_id = +findModule.project;
        dataLog.value = data
        const saveLog = await this.logActivityRepository.save(dataLog);
        return deleteModuleLinks;
      }
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }


  async deleteModuleLinks(id) {
    try {
      const deleteModuleLinks = await this.requestModuleLinksRepository.delete(id);
      return deleteModuleLinks;
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }

  async updateLinkTitleModule(id, body) {
    try {
      const update = await this.requestModuleLinksRepository.update(id, body);
      return {
        status: 200,
        message: messages.MODULE_UPDATED
      }
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }

  async updateMilestoneStatus(id, body) {
    try {

      await this.projectMilestonesRepository.update(id, body)
      return {
        status: 200,
        message: messages.MILESTONE_UPDATED
      }
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }


  async updateMilestonePriority(id, body) {
    try {
      const getPriority = await this.milestonePriorityRepository.findOne({
        where: {
          id: body.priority
        }
      });
      const updateSatusAndPriority = new ProjectMilestone();
      updateSatusAndPriority.priority = getPriority.priority;
      await this.projectMilestonesRepository.update(id, updateSatusAndPriority)
      return {
        status: 200,
        message: messages.MILESTONE_UPDATED
      }
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }


  async deleteTasks(id, req) {
    try {
      const findTask = await this.taskRespository.findOne({
        where: {
          id: id.id
        }
      });
      const adminId = await this.adminRepository.findOne({
        where: {
          email: req.user.email
        }
      });
      const projectId = +findTask.project;
      let datas = JSON.stringify(findTask)
      const dataLog = new LogActivity();
      dataLog.id_admin = adminId.id;
      dataLog.admin_name = adminId.name;
      dataLog.type = Api_Log_Type.DELETE;
      dataLog.sub_module_type = Module_Type.TASK;
      dataLog.module_type = Module_Type.PROJECT;
      dataLog.project_id = projectId;
      dataLog.value = datas;

      const deleteTask = await this.taskRespository.delete(id)
      if (deleteTask) {
        const saveLog = await this.logActivityRepository.save(dataLog);
        return {
          status: 200,
          message: messages.TASK_DELETED,
        }
      }
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }

  async getTaskDetails(id) {
    try {
      const taskDetails = await this.taskRespository.createQueryBuilder()
        .where("id = :id", { id: id.id })
        .getOne();
      if (taskDetails) {
        return {
          status: 200,
          message: messages.TASK_FETCHED,
          data: taskDetails
        }
      }
      else {
        return {
          status: 403,
          message: messages.NOT_FOUND
        }
      }
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }

  async getProjectStatusCount() {
    try {
      const active = await this.projectRepository.createQueryBuilder()
        .where("status = :status", { status: Project_status.ACTIVE })
        .getCount();
      const hired = await this.projectRepository.createQueryBuilder()
        .where("status = :status", { status: Project_status.HIRED })
        .getCount();
      const disputed = await this.projectRepository.createQueryBuilder()
        .where("status = :status", { status: Project_status.DISPUTED })
        .getCount();
      const canceled = await this.projectRepository.createQueryBuilder()
        .where("status = :status", { status: Project_status.CANCELED })
        .getCount();
      const delivered = await this.projectRepository.createQueryBuilder()
        .where("status = :status", { status: Project_status.DELIVERED })
        .getCount();
      const suspended = await this.projectRepository.createQueryBuilder()
        .where("status = :status", { status: Project_status.SUSPENDED })
        .getCount();
      const all = await this.projectRepository.createQueryBuilder()
        .where("status != :status", { status: Project_status.DELETED })
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
  }

  async deleteEmployeeCredential(id) {
    try {
      const findCredentials = await this.credentialsRepository.findOne({
        where: {
          id: id.id
        }
      });
      if (findCredentials) {
        const deleteEmployeeCredential = await this.credentialsRepository.delete(id);
        if (deleteEmployeeCredential) {
          return {
            status: 200,
            message: messages.CREDENTIAL_DELETED,
          }
        }
      }
      else {
        return {
          status: 200,
          message: messages.NOT_FOUND
        }
      }
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async deleteEmployeeWorkExperience(id) {
    try {
      const findWorkExperience = await this.workExperienceRepository.findOne({
        where: {
          id: id.id
        }
      });
      if (findWorkExperience) {
        const deleteEmployeeWorkExperience = await this.workExperienceRepository.delete(id);
        if (deleteEmployeeWorkExperience) {
          return {
            status: 200,
            message: messages.WORKEXPERIENCE_DELETED,
          }
        }
      }
      else {
        return {
          status: 200,
          message: messages.NOT_FOUND
        }
      }
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }
  async deleteEmployeeEducation(id) {
    try {
      const deleteEducation = await this.educationRepository.delete(id);
      return {
        status: 200,
        message: messages.EDCUATION_DELETED
      }
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }

  async getRemarks(id) {
    try {
      const data = await this.remarksRepository.createQueryBuilder()
        .where("emp_id = :id", { id: id.id })
        .getMany();
      return {
        status: 200,
        message: messages.DATA_FTECHED,
        data: data,
      }
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }

  async deleteRemarks(id) {
    try {
      const deleteRemarks = await this.remarksRepository.delete(id);
      return {
        status: 200,
        message: messages.REMARKS_DELTED
      }
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }

  async getReportListing(req) {
    try {
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
      throw new BadRequestException(error.message)
    }
  }

  async getallAdmin() {
    try {
      const data = await this.adminRepository.createQueryBuilder('admin_table')
        .leftJoinAndMapMany(
          'admin_table.roles_and_permission',
          Roles_And_Permission,
          'roles_and_permission',
          'roles_and_permission.admin_id = admin_table.id'
        )
        .where("admin_table.status != :status" ,{status : EMP_Status.DELETED})
        .orderBy('admin_table.created_at', 'DESC')
        .getMany();
      return {
        status: 200,
        message: messages.DATA_FTECHED,
        data: data
      }
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }

  async deleteAdmin(id) {
    try {
      const deleteAdmin = await this.adminRepository.createQueryBuilder()
        .update(AdminTable)
        .set({ status: EMP_Status.DELETED })
        .where("id = :id", { id: id.id })
        .execute();
        const deleteAccount = await this.accountRepository.createQueryBuilder()
        .update(Accounts)
        .set({ status: Account_Status.DELETE })
        .where("admin = :id", { id: id.id })
        .execute();
      return {
        status : 200,
        messages: messages.ADMIN_DELETED,
      }
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }

  async createClient(data, req) {
    try {
      
      const checkId = await this.clientsRepository.findOne({
        where: {
          email: data.email
        }
      });
      if (checkId) {
        return {
          status: 200,
          message: messages.CLIENT_ALREADY_EXISTS
        }
      }
      
      const saveClient = new Clients();
      saveClient.name = data.name;
      saveClient.email = data.email;
      saveClient.contact = data.contact;
      saveClient.address = data.address;
      const saved = await this.clientsRepository.save(saveClient);
      if( saved) {
        return {
          status: 200,
          message: messages.CLIENT_CREATED
        }
      }
      else {
        return {
          status: 500,
          message: messages.SOMETHING_WENT_WRONG
        }
      }  
      }
     catch (error) {
      throw new BadRequestException(error.message)
    }
  }

  async getAllClient(req) {
    try {
      const search = req.search;
      const sort = req.sort;
      const query = await this.clientsRepository
        .createQueryBuilder('client')
      if (search) {
        query
          .where(`client.name ILIKE '%${search}%'`)
          .orWhere(`client.name  ILIKE '%${search}%'`)
      }
     
      if (sort == '1') {
        const data = await query
          .orderBy('client.name', 'ASC')
          .getMany();

        return data;
      }
      if (sort == '2') {
        const data = await query
          .orderBy('client.name', 'DESC')
          .getMany();

        return data;
      }
      const data = query
        // .orderBy(column_name, column_order)
        .getMany();
      return data;
    } catch (error) {
      throw error;
    }
  }

  async updateClient(id, data, req) {
    try {

      if (data.email) {
        return {
          status: 409,
          message: messages.EMAIL_NOT_ALLOWED
        }
      }
      const checkEmail = await this.clientsRepository.createQueryBuilder("client")
        .where("client.id = :id", { id: id.id })
        .getOne();

      const saveClient = new Clients();
      saveClient.name = data?.name ? data.name: checkEmail.name;
      saveClient.email = data?.email ? data.email: checkEmail.email;
      saveClient.contact = data?.contact ? data.contact: checkEmail.contact;
      saveClient.address = data?.address ? data.address: checkEmail.address
      saveClient.skype_id = data?.skype_id ? data.skype_id: checkEmail?.skype_id ? checkEmail.skype_id: null
      saveClient.slack_id = data?.slack_id ? data.slack_id: checkEmail?.slack_id ? checkEmail.slack_id: null
      const saved = await this.clientsRepository.update(id, saveClient);
      if (saved) {
          return {
            status: 200,
            message: messages.Client_UPDATED
          }
      }
      else {
        return {
          status: 500,
          message: messages.SOMETHING_WENT_WRONG
        }
      } 
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }

  async deleteClient(id) {
    try {
      const deleteAdmin = await this.clientsRepository
      .createQueryBuilder('client')
      .delete()
      .from(Clients)
      .where("id = :id", { id: id.id })
      .execute()
      return {
        status : 200,
        messages: messages.Client_DELETED,
      }
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }

}

// async addProjectDocument() {
//   try {
    
//   } catch (error) {
//     throw new BadRequestException(error.message)
//   }
//   }
// }\

