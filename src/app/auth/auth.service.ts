import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Account_Status, Roles_Check } from 'src/helpers/constants';
import { messages } from 'src/helpers/message';
import { Accounts, AdminTable, Designation_table, Link_title, Milestone_Priority, Project_Condition, Project_Phase, Project_roles, Project_Type, Roles_And_Permission } from 'src/typeOrm';
import { Employee, EMP_Status, Role } from 'src/typeOrm/employee.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Department_Table } from 'src/typeOrm/deparments.entity';
import { Roles } from 'src/typeOrm/roles.entity';
import { Platform } from 'src/typeOrm/platform.entity';
import { Technology } from 'src/typeOrm/technology.entity';
import { Project_Status } from 'src/typeOrm/project_status.entity';
import { Milestone_Status } from 'src/typeOrm/milestone_status.entity';
import { use } from 'passport';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(Accounts)
    private readonly accountRepository: Repository<Accounts>,
    @InjectRepository(AdminTable)
    private readonly adminRepository: Repository<AdminTable>,
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
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
  ) { }

  async logIn(body) {
    try {      
      const user = await this.accountRepository.createQueryBuilder()
      .where("email = :email" , {email : body.email})
      .andWhere("status != :status",{status : Account_Status.DELETE})
      .getOne();
   
      if (user) {

        const isMatch = await bcrypt.compare(body.password, user?.password);
        if (!isMatch) {
          return {
            status: 401,
            message: messages.UNAUTHORIZED,
          }
        }
        const payload = { email: user.email, role: user.roles };
        if (payload.role != Roles_Check.EMPLOYEE) {
          const user_details = await this.adminRepository.createQueryBuilder('admin_table')
            .leftJoinAndMapMany(
              'admin_table.roles_and_permission',
              Roles_And_Permission,
              'roles_and_permission',
              'roles_and_permission.admin_id = admin_table.id'
            )
            .where("admin_table.email = :email" ,{email :body.email})
            .getRawMany();
          if (user_details) {
            return {
              status: 200,
              message: messages.ADMIN_LOGGEDIN,
              access_token: await this.jwtService.signAsync(payload),
              user_details: user_details,
            }
          }
          return {
            status: 404,
            message: messages.NOT_FOUND_EMAIL,
          };
        } else if (payload.role == Roles_Check.EMPLOYEE) {
          const user_details = await this.employeeRepository.findOne({
            where: { email: body.email },
          });
          const employee_details = [user_details]
          if (user_details) {
            return {
              status: 200,
              message: messages.EMPLOYEE_LOGGEDIN,
              access_token: await this.jwtService.signAsync(payload),
              user_details: employee_details,
            };
          }

        }
      }
      else {
        return {
          status: 404,
          message: messages.NOT_FOUND_EMAIL,
          data: user
        };
      }
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async forgetPassword(id, body) {
    try {
      if (body.new_password != body.confirm_password) {
        return {
          status: 400,
          message: messages.PASSWORD_DONT_MATCH,
        };
      }
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(body.new_password, saltRounds);
      const user = await this.accountRepository.findOne({
        where: { id: id.id },
      });
      const data = new Accounts();
      data.email = user.email;
      data.password = hashedPassword;
      data.roles = user.roles;
      data.status = user.status;
      const query = await this.accountRepository.update(id, data);

      return {
        status: 200,
        message: messages.PASSWORD_UPDATED,
      };
    } catch (error) {
      throw error;
    }
  }


  async logout(req) {
    try {
      const token = req.token;

    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }


  async createAdmin(body) {
    try {
      const emailCheck = await this.adminRepository.findOne({
        where : {
          email : body.email
        }
      });
      if(emailCheck){
        return {
          status : 403,
          message: messages.EMAIL_ALREADY_EXISTS
        }
      }
      else{

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(body.password, saltRounds);
        const saveAdmin = new AdminTable()
        saveAdmin.name = body.name;
        saveAdmin.email = body.email;
        saveAdmin.profile_image = body.image_url;
        saveAdmin.role = body.role;
        saveAdmin.status = EMP_Status.ACTIVE;
        const savingAdmin = await this.adminRepository.save(saveAdmin);
        
        const adminAccount = new Accounts()
        adminAccount.email = body.email;
        adminAccount.password = hashedPassword;
        adminAccount.roles = body.role;
        adminAccount.status = EMP_Status.ACTIVE;
        const createAccount = await this.accountRepository.save(adminAccount);
        
        return {
          status :200,
          message : messages.ADMIN_CRAETED
        } 
      } 
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }




}
