import {
  BadGatewayException,
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { EmployeeDto } from './dto/employee.dto';
import { Client } from './dto/clients.dto';
import { Project } from './dto/Project.dto';
import { AdminService } from './admin.service';
import { AdminDto } from './dto/admin.dto';
import { Address } from './dto/address.dto';
import { OfficialCredentials } from './dto/officialCredentials.dto';
import { JobDetails } from './dto/jobDetails.dto';
import { WorkExperience } from './dto/workExperience.dto';
import { Education } from './dto/education.dto';
import { ProjectMilestone } from './dto/projectMilestone.dto';
import { MilestoneLinks } from './dto/milestoneLinks.dto';
import { IPaginationOptions } from 'nestjs-typeorm-paginate';
import { messages } from 'src/helpers/message';
import { ProjectDocument } from './dto/projectDocuments.dto';
import { ProjectTeam } from './dto/ProjectTeam.dto';
import { Salary } from './dto/salary.dto';
import { Task } from './dto/task.dto';
import { MESSAGES } from '@nestjs/core/constants';
import { Login } from '../auth/dto/login.dto';
import { AuthGuard } from '../guards/jwt-auth.guard';
import { Role } from 'src/typeOrm/employee.entity';
import { RolesGuard } from '../guards/jwt-auth-roles.guard';
import { Roles } from '../guards/roles.decorators';
import { Request_Module } from './dto/request_module.dto';
import { LeaveForm } from './dto/leaveform.dto';
import { ForgetPassword } from './dto/forgetPassword.dto';
import { Role_And_Permission } from './dto/roleAndPermission.dto';
import { Roles_And_Permission } from 'src/typeOrm';
import { Remarks } from './dto/remarks.dto';
import { PaginateQuery, PaginateQueryInterface } from 'nestjs-sequelize-paginate';
import { EmployeeUpdate } from './dto/employeeUpdate.dto';
import { ClientUpdate } from './dto/clientUpdate.dto';
import { ModuleLinkTitle } from './dto/module_linktitle.dto';
import { MilestoneStatus } from './dto/milestoneStatusAndPriority.dto';
import { MilestonePriority } from './dto/milestonePriority.dto';
import { SetMetadata } from '@nestjs/common';
import e from 'express';
import { Settings_Admin } from './dto/setting.dto';
export const AllowAny = () => SetMetadata('allow-any', true);

@ApiTags('admin')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) { }

  @ApiOperation({ summary: messages.ADMIN_SUMMARY })
  @ApiResponse({
    status: 200,
    description: messages.ADMIN_CREATED,
  })
  @ApiResponse({ status: 400, description: messages.BAD_REQUEST })
  // @Post('/create-admin')
  @HttpCode(200)
  async createAdmin(@Request() req, @Body() body: AdminDto) {
    try {
      await this.adminService.createAdmin(body);
      return {
        status: 200,
        message: messages.ADMIN_CREATED,
      };
    } catch (error) {
      throw error;
    }
  }

  @ApiOperation({ summary: messages.UPDATE_ADMIN_SUMMARY })
  @ApiParam({
    name: 'id',
    type: 'string',
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: messages.UPDATE_ADMIN,
  })
  @ApiResponse({ status: 400, description: messages.BAD_REQUEST })
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  // @Put(':id')
  @HttpCode(200)
  async updateAmdin(@Param('id') id, @Body() body: AdminDto) {
    try {
      await this.adminService.updateAdminById(id, body);
      return {
        status: 200,
        message: messages.UPDATE_ADMIN,
      };
    } catch (error) {
      throw error;
    }
  }

  @ApiOperation({ summary: messages.ADD_PROJECT_SUMMARY })
  @ApiResponse({
    status: 200,
    description: messages.PROJECT_CREATED,
  })
  @ApiResponse({ status: 400, description: messages.BAD_REQUEST })
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Post('/create-project')
  @HttpCode(200)
  async createProject(@Request() req, @Body() body: Project) {
    try {
      const data = await this.adminService.createProject(body, req);
      return data;
    } catch (error) {
      throw new BadRequestException([error.message]);
    }
  }

  @ApiOperation({ summary: messages.GET_PROJECT_LISTING_SUMMARY })
  @ApiResponse({
    status: 200,
    description: messages.PROJECT_FETCHED,
  })
  @ApiQuery({ name: 'sort', type: 'string', required: false })
  @ApiQuery({ name: 'platform', type: 'string', required: false })
  @ApiQuery({ name: 'search', type: 'string', required: false })
  @ApiQuery({ name: 'status', type: 'string', required: false })
  @ApiQuery({ name: 'column_name', type: 'string', required: false })
  @ApiQuery({ name: 'column_order', type: 'string', required: false })
  @Get('/get-projects')
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @AllowAny()
  @HttpCode(200)
  async getProjects(@Query() req: IPaginationOptions) {
    try {
      return await this.adminService.getAllProjects(req);
    } catch (error) {
      throw error;
    }
  }

  @ApiOperation({ summary: messages.PROJECT_DETAILS_SUMMARY })
  @ApiParam({
    name: 'id',
    required: true,
    type: 'string',
  })
  @ApiResponse({
    status: 200,
    description: messages.PROJECT_FETCHED,
  })
  @ApiResponse({ status: 400, description: messages.BAD_REQUEST })
  @Get('/get-project-details/:id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @HttpCode(200)
  async getProjectDetails(@Param() id) {
    try {
      const data = await this.adminService.getProjectDetails(id);
      return {
        status: 200,
        message: messages.PROJECT_FETCHED,
        data: data,
      };
    } catch (error) {
      throw error;
    }
  }

  @ApiOperation({ summary: messages.UPDATE_PROJECT_SUMMARY })
  @ApiParam({
    name: 'id',
    required: true,
    type: 'string',
  })
  @ApiResponse({
    status: 200,
    description: messages.PROJECT_UPDATED,
  })
  @ApiResponse({ status: 400, description: messages.BAD_REQUEST })
  @Put('/update-project/:id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @HttpCode(200)
  async updateProject(@Param() id, @Body() body: Project, @Request() req) {
    try {
      await this.adminService.updateProject(id, body, req);
      return {
        status: 200,
        message: messages.PROJECT_UPDATED,
      };
    } catch (error) {
      throw error;
    }
  }
  @ApiOperation({ summary: messages.ADD_EMPLOYEE_SUMMARY })
  @ApiResponse({
    status: 200,
    description: messages.EMPLOYEE_CREATED,
  })
  @ApiResponse({ status: 400, description: messages.BAD_REQUEST })
  @Post('/add-employee')
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @HttpCode(200)
  async createEmployees(@Request() req, @Body() body: EmployeeDto) {
    try {
      const user = await this.adminService.findEmployeebyPhone(body);
      if (!user) {
        const saveEmployee = await this.adminService.createEmployee(body, req);
        return saveEmployee;
      }
      else {
        return {
          status: 409,
          message: messages.EMAIL_ALREADY_EXISTS
        }
      }
    } catch (error) {
      throw new BadRequestException([error.message]);
    }
  }

  @ApiOperation({ summary: messages.GET_EMPLOYEES })
  @ApiResponse({
    status: 200,
    description: messages.EMPLOYEE_FETCHED,
  })
  @ApiResponse({ status: 400, description: messages.BAD_REQUEST })
  @ApiQuery({ name: 'page', type: 'number', required: false })
  @ApiQuery({ name: 'limit', type: 'number', required: false })
  @ApiQuery({ name: 'search', type: 'string', required: false })
  @ApiQuery({ name: 'status', type: 'string', required: false })
  @ApiQuery({ name: 'sort', type: 'string', required: false })
  @ApiQuery({ name: 'department', type: 'string', required: false })
  @ApiQuery({ name: 'designation', type: 'string', required: false })
  @ApiQuery({ name: 'column_name', type: 'string', required: false })
  @ApiQuery({ name: 'column_order', type: 'string', required: false })
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Get('/get-employee')
  async getEmployees(@Query() req) {
    try {
      const listingEmployee = await this.adminService.getAllEmployees(req);
      return {
        status: 200,
        message: messages.EMPLOYEE_FETCHED,
        listingEmployee: listingEmployee,
      };
    } catch (error) {
      throw error;
    }
  }

  @ApiOperation({ summary: messages.UPDATE_ADDRESS_EMPLOYEE_SUMMARY })
  @ApiParam({
    name: 'id',
    required: true,
    type: 'string',
  })
  @ApiResponse({
    status: 200,
    description: messages.EMPLOYEE_UPDATED,
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiResponse({ status: 400, description: messages.BAD_REQUEST })
  @Put('/address-update/:id')
  @HttpCode(200)
  async updateAddress(@Param() id, @Body() body: Address) {
    try {
      const user = await this.adminService.findAddress(id);
      if (user) {
        await this.adminService.updateAddress(id, body);
      } else {
        await this.adminService.saveAddress(id, body);
      }
      return {
        status: 200,
        message: messages.EMPLOYEE_UPDATED,
      };
    } catch (error) {
      throw error;
    }
  }

  @ApiOperation({ summary: messages.EMPLOYEE_JOB_DETAILS_SUMMARY })
  @ApiParam({
    name: 'id',
    required: true,
    type: 'string',
  })
  @ApiResponse({
    status: 200,
    description: messages.EMPLOYEE_UPDATED,
  })
  @ApiResponse({ status: 400, description: messages.BAD_REQUEST })
  @Put('/job-details-update/:id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @HttpCode(200)
  async updateJobDetails(@Param() id, @Body() body: JobDetails) {
    try {
      const user = await this.adminService.findJobDetails(id);
      if (user > 0) {
        await this.adminService.updateJobDetails(id, body);
      } else {
        await this.adminService.saveJobDetails(id, body);
      }
      return {
        status: 200,
        message: messages.EMPLOYEE_UPDATED,
      };
    } catch (error) {
      throw error;
    }
  }


  @ApiOperation({ summary: messages.EMPLOYEE_JOB_DETAILS_SUMMARY })
  @ApiParam({
    name: 'id',
    required: true,
    type: 'string',
  })
  @ApiResponse({
    status: 200,
    description: messages.EMPLOYEE_FETCHED,
  })
  @ApiResponse({ status: 400, description: messages.BAD_REQUEST })
  @Get('/job-details-get/:id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @HttpCode(200)
  async getJobDetails(@Param() id) {
    try {
      const user = await this.adminService.getJobDetails(id);
      if (user) {
        return {
          status: 200,
          message: messages.EMPLOYEE_FETCHED,
          data: user
        };
      } else {
        return {
          status: 200,
          message: messages.NOT_FOUND,
        };
      }

    } catch (error) {
      throw error;
    }
  }





  @ApiOperation({ summary: messages.ADD_CREDENTIALS_SUMMARY })
  @ApiParam({
    name: 'id',
    required: true,
    type: 'string',
  })
  @ApiResponse({
    status: 200,
    description: messages.EMPLOYEE_UPDATED,
  })
  @ApiResponse({ status: 400, description: messages.BAD_REQUEST })
  @Post('/employee-credentials/:id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @HttpCode(200)
  async employeeCredentials(
    @Param() id,
    @Body() body: OfficialCredentials,
  ) {
    try {
      const data = this.adminService.saveOrUpdateCredentials(id, body);
      return data;
    } catch (error) {
      throw error;
    }
  }

  @ApiOperation({ summary: messages.ADD_CREDENTIALS_SUMMARY })
  @ApiParam({
    name: 'id',
    required: true,
    type: 'string',
  })
  @ApiResponse({
    status: 200,
    description: messages.EMPLOYEE_UPDATED,
  })
  @ApiResponse({ status: 400, description: messages.BAD_REQUEST })
  @Put('/update-employee-credentials/:id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @HttpCode(200)
  async employeeCredentialsUpdate(
    @Param() id,
    @Body() body: OfficialCredentials,
  ) {
    try {
      const data = this.adminService.UpdateCredentials(id, body);
      return data;
    } catch (error) {
      throw error;
    }
  }

  @ApiOperation({ summary: messages.UPDATE_WORK_EXPERIENCE })
  @ApiParam({
    name: 'id',
    required: true,
    type: 'string',
  })
  @ApiResponse({
    status: 200,
    description: messages.EMPLOYEE_UPDATED,
  })
  @ApiResponse({ status: 400, description: messages.BAD_REQUEST })
  @Put('/update-work-experience/:id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @HttpCode(200)
  async workExperienceUpdate(@Param() id, @Body() body: WorkExperience) {
    try {
      const data = await this.adminService.updateWorkExperience(id, body);
      return {
        status: 200,
        message: messages.EMPLOYEE_UPDATED,
        data: data,
      };
    } catch (error) {
      throw error;
    }
  }


  @ApiOperation({ summary: messages.UPDATE_WORK_EXPERIENCE })
  @ApiParam({
    name: 'id',
    required: true,
    type: 'string',
  })
  @ApiResponse({
    status: 200,
    description: messages.EMPLOYEE_UPDATED,
  })
  @ApiResponse({ status: 400, description: messages.BAD_REQUEST })
  @Post('/work-experience/:id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @HttpCode(200)
  async workExperience(@Param() id, @Body() body: WorkExperience) {
    try {
      const data = await this.adminService.saveworkExperience(id, body);
      return {
        status: 200,
        message: messages.EMPLOYEE_UPDATED,
      };
    } catch (error) {
      throw error;
    }
  }

  @ApiOperation({ summary: messages.UPDATE_EDUCATION_EMPLOYEE })
  @ApiParam({
    name: 'id',
    required: true,
    type: 'string',
  })
  @ApiResponse({
    status: 200,
    description: messages.EMPLOYEE_UPDATED,
  })
  @ApiResponse({ status: 400, description: messages.BAD_REQUEST })
  @Put('/education/:id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @HttpCode(200)
  async educationUpdate(@Param() id, @Body() body: Education) {
    try {
      const data = await this.adminService.saveOrUpdateEducation(id, body);
      return {
        status: 200,
        message: messages.EMPLOYEE_UPDATED,
      };
    } catch (error) {
      throw error;
    }
  }

  @ApiOperation({ summary: messages.ADD_EDUCATION_EMPLOYEE })
  @ApiParam({
    name: 'id',
    required: true,
    type: 'string',
  })
  @ApiResponse({
    status: 200,
    description: messages.EMPLOYEE_UPDATED,
  })
  @ApiResponse({ status: 400, description: messages.BAD_REQUEST })
  @Post('/education/:id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @HttpCode(200)
  async addeducation(@Param() id, @Body() body: Education) {
    try {
      const data = await this.adminService.saveEducation(id, body);
      return data;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }


  @ApiOperation({ summary: messages.MILESTONE_ADD_SUMMARY })
  @ApiResponse({
    status: 200,
    description: messages.MILESTONE_CREATED,
  })
  @ApiParam({
    name: 'project_id',
    required: true,
    type: 'string',
  })
  @ApiResponse({
    status: 400,
    description: messages.BAD_REQUEST,
  })
  @Post('/add-project-milestone/:project_id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  async createProjectMilestone(
    @Request() req,
    @Body() body: ProjectMilestone,
    @Param() project_id,
  ) {
    try {
      const recentMilestone = await this.adminService.createProjectMilestone(
        project_id,
        body,
        req
      );
      return {
        status: 200,
        message: messages.MILESTONE_CREATED,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }



  @ApiOperation({ summary: messages.PROJECT_DOCUMENT_UPDATE_SUMMARY })
  @ApiParam({
    name: 'id',
    required: true,
    type: 'number',
  })
  @ApiResponse({
    status: 200,
    description: messages.PROJECT_DOCUMENT_UPDATED,
  })
  @ApiResponse({ status: 400, description: messages.BAD_REQUEST })
  @Put('/update-project-documents/:id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @HttpCode(200)
  async milestoneLinks(
    @Request() req,
    @Param() id,
    @Body() body: ProjectDocument,
  ) {
    try {
      return await this.adminService.updateDocuments(id, body,req);

    } catch (error) {
      throw error;
    }
  }

  @ApiOperation({ summary: messages.GET_MILESTONES })
  @ApiResponse({
    status: 200,
    description: messages.MILESTONE_FETCHED,
  })
  @ApiResponse({ status: 400, description: messages.BAD_REQUEST })
  @ApiQuery({ name: 'search', type: 'string', required: false })
  @ApiQuery({ name: 'page', type: 'number', required: false })
  @ApiQuery({ name: 'limit', type: 'number', required: false })
  @ApiParam({
    name: 'id',
    required: true,
    type: 'number',
  })
  @Get('/get-milestones/:id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async getMilestones(@Query() req, @Param() id) {
    try {
      const data = await this.adminService.getMilestones(req, id);
      return {
        status: 200,
        message: messages.MILESTONE_FETCHED,
        data: data,
      };
    } catch (error) {
      throw error;
    }
  }

  @ApiOperation({ summary: messages.GET_MILESTONE_DETAILS })
  @ApiResponse({
    status: 200,
    description: messages.MILESTONE_FETCHED,
  })
  @ApiResponse({ status: 400, description: messages.BAD_REQUEST })
  @ApiParam({
    name: 'id',
    type: 'number',
    required: true,
  })
  @Get('/get-milestones-details/:id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async getMilestoneDetails(@Param() id) {
    try {
      const data = await this.adminService.getMilestonesDetails(id);
      return {
        status: 200,
        message: messages.MILESTONE_FETCHED,
        data: data,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @ApiOperation({ summary: messages.PROJECT_DOCUMENT_SUMMARY })
  @ApiResponse({
    status: 200,
    description: messages.PROJECT_DOCUMENT_SAVED,
  })
  @ApiParam({
    name: 'id',
    type: 'number',
    required: true,
  })
  @HttpCode(200)
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiResponse({ status: 400, description: messages.BAD_REQUEST })
  @Post('/add-project-documents/:id')
  async addProjectDocuments(@Param() id, @Body() body: ProjectDocument, @Request() req) {
    try {
      const project_document = await this.adminService.addProjectDocuments(
        id,
        body,
        req
      );
      return project_document;
    } catch (error) {
      throw new BadRequestException(error.messages);
    }
  }

  @ApiOperation({ summary: messages.GET_PROJECT_DOCUMENT_DETAILS })
  @ApiResponse({
    status: 200,
    description: messages.PROJECT_DOCUMENT_FETCHED,
  })
  @ApiResponse({ status: 400, description: messages.BAD_REQUEST })
  @ApiParam({
    name: 'id',
    type: 'number',
    required: true,
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get('/get-project-doucment-details/:id')
  async getProjectDocumentDetails(@Param() id, @Request() req) {
    try {
      const data = await this.adminService.getProjectDocument(id, req);
      if (data) {
        return {
          status: 200,
          message: messages.PROJECT_DOCUMENT_FETCHED,
          data: data
        };
      }
      else {
        return {
          status: 404,
          message: messages.NOT_FOUND,
        };
      }
    } catch (error) {
      throw error;
    }
  }

  @ApiOperation({ summary: messages.PROJECT_FETCHING_EMPLOYEE })
  @ApiResponse({
    status: 200,
    description: messages.PROJECT_EMPLOYEE_FETCHED,
  })
  @ApiResponse({ status: 400, description: messages.BAD_REQUEST })
  @ApiParam({
    name: 'search',
    type: 'string',
    required: true,
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get('/get-employee-search/:search')
  async getEmployeeBySearch(@Param() search) {
    try {
      const data = await this.adminService.getEmployeeBySearch(search);
      return {
        status: 200,
        message: messages.PROJECT_EMPLOYEE_FETCHED,
        data: data,
      };
    } catch (error) {
      throw error;
    }
  }

  @ApiOperation({ summary: messages.PROJECT_ASSGINEE_SUMMARY })
  @ApiResponse({
    status: 200,
    description: messages.PROJECT_ASSIGNEE_SAVED,
  })
  @ApiResponse({ status: 400, description: messages.BAD_REQUEST })
  @ApiParam({
    name: 'id',
    type: 'string',
    required: true,
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @HttpCode(200)
  @Post('/add-project-team-member/:id')
  async addProjectTeam(@Param() id, @Body() body: ProjectTeam, @Request() req) {
    try {
      const data = await this.adminService.addProjectTeam(id, body, req);
      return data;
    } catch (error) {
      throw error;
    }
  }

  @ApiOperation({ summary: messages.GET_PROJECT_TEAM })
  @ApiResponse({ status: 200, description: messages.TEAM_FETCHED_SUCCESSFULLY })
  @ApiResponse({ status: 400, description: messages.BAD_REQUEST })
  @ApiParam({
    name: 'id',
    type: 'string',
    required: true,
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get('/get-team-members/:id')
  async getProjectTeamMembers(@Param() id) {
    try {
      return await this.adminService.getProjectTeamMembers(id);
    } catch (error) {
      throw new BadRequestException(error.messages);
    }
  }

  @ApiOperation({ summary: messages.EMPLOYEE_SALARY_SUMMARY })
  @ApiResponse({ status: 200, description: messages.EMPLOYEE_SALARY_SAVED })
  @ApiResponse({ status: 400, description: messages.BAD_REQUEST })
  @ApiParam({
    name: 'id',
    type: 'string',
    required: true,
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @HttpCode(200)
  @Post('/add-employee-salary/:id')
  async addEmployeeSalary(@Param() id, @Body() body: Salary) {
    try {
      const data = await this.adminService.addSalaryEmployee(id, body);
      return {
        status: 200,
        description: messages.EMPLOYEE_SALARY_SAVED,
        data: data,
      };
    } catch (error) {
      throw new BadRequestException(error.messages);
    }
  }


  @ApiOperation({ summary: messages.ADMIN_SETTINGS })
  @ApiResponse({ status: 200, description: messages.SETTING_SAVED })
  @ApiResponse({ status: 400, description: messages.BAD_REQUEST })
  
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @HttpCode(200)
  @Post('/add-employee-last-salary/:id')
  async saveAdminSettings(@Body() body: Settings_Admin) {
    try {
      // const data = await this.adminService.saveAdminSettings(body);
      return {
        status: 200,
        // data: data,
      };
    } catch (error) {
      throw new BadRequestException(error.messages);
    }
  }

  @ApiOperation({ summary: messages.EMPLOYEE_SALARY_UPDATED })
  @ApiResponse({ status: 200, description: messages.EMPLOYEE_SALARY_UPDATED })
  @ApiResponse({ status: 400, description: messages.BAD_REQUEST })
  @ApiParam({
    name: 'id',
    type: 'string',
    required: true,
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @HttpCode(200)
  @Put('/update-employee-salary/:id')
  async updateEmployeeSalary(@Param() id, @Body() body: Salary) {
    try {
      // console.log(body.last_salary_date);
      const data = await this.adminService.updateSalaryEmployee(id, body);
      return {
        status: 200,
        description: messages.EMPLOYEE_SALARY_UPDATED,
      };
    } catch (error) {
      throw new BadRequestException(error.messages);
    }
  }


  @ApiOperation({ summary: messages.GET_EMPLOYEE_SALARY })
  @ApiResponse({
    status: 200,
    description: messages.SALARY_FETCHED
  })
  @ApiResponse({
    status: 400,
    description: messages.BAD_REQUEST
  })
  @ApiParam({
    name: 'id',
    type: 'string',
    required: true,
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Get('/get-employee-salary/:id')
  async getEmployeeSalary(@Param() id){
    try {
      const data = await this.adminService.getEmployeeSalary(id);
      return {
        status :200,
        message : messages.SALARY_FETCHED,
        data: data,
      }
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }


  @ApiOperation({ summary: messages.TASK_SUMMARY })
  @ApiResponse({
    status: 200,
    description: messages.TASK_SAVED,
  })
  @ApiResponse({ status: 400, description: messages.BAD_REQUEST })
  @HttpCode(200)
  @ApiParam({
    name: 'id',
    type: 'string',
    required: true,
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Post('/add-tasks/:id')
  async addtask(@Param() id, @Body() body: Task, @Request() req) {
    try {
      await this.adminService.addTasks(id, body, req);
      return {
        status: 200,
        message: messages.TASK_SAVED,
      };
    } catch (error) {
      throw error;
    }
  }

  @ApiOperation({ summary: messages.TASK_SUMMARY })
  @ApiResponse({
    status: 200,
    description: messages.TASK_UPDATE,
  })
  @ApiResponse({ status: 400, description: messages.BAD_REQUEST })
  @HttpCode(200)
  @ApiParam({
    name: 'id',
    type: 'string',
    required: true,
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Put('/update-tasks/:id')
  async updatetask(@Param() id, @Body() body: Task, @Request() req) {
    try {
      return await this.adminService.updateTasks(id, body, req);
    } catch (error) {
      throw error;
    }
  }

  @ApiOperation({ summary: messages.TASK_LISTING })
  @ApiResponse({
    status: 200,
    description: messages.TASK_FETCHED,
  })
  @ApiResponse({ status: 400, description: messages.BAD_REQUEST })
  @ApiQuery({ name: 'search', type: 'string', required: false })
  @ApiQuery({ name: 'column', type: 'string', required: false })
  @ApiQuery({ name: 'sort', type: 'string', required: false })
  @ApiParam({
    name: 'id',
    type: 'string',
    required: true,
  })
  @HttpCode(200)
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get('/get-tasks/:id')
  async getAllTasks(@Query() req, @Param() id) {
    try {
      return await this.adminService.getAllTasks(req, id);
    } catch (error) {
      throw error;
    }
  }

  @ApiOperation({ summary: messages.GET_ALL_DROPDOWN })
  @ApiResponse({ status: 200, description: messages.GET_ALL_DROPDOWN_FETCHED })
  @ApiResponse({ status: 400, description: messages.BAD_REQUEST })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get('/get-master-data')
  async getMasterData() {
    try {
      return await this.adminService.getMasterData();
    } catch (error) {
      throw error;
    }
  }

  @ApiOperation({ summary: messages.REQUEST_MODULE })
  @ApiResponse({ status: 200, description: messages.REQUEST_MODULE_CHANGED })
  @ApiResponse({ status: 400, description: messages.BAD_REQUEST })
  @ApiParam({
    name: 'id',
    type: 'string',
    required: true,
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Post('/change-request-module/:id')
  async addRequestModule(@Param() id, @Body() body: Request_Module, @Request() req) {
    try {
      const data = await this.adminService.addRequestModule(id, body, req);
      return data;
    } catch (error) {
      throw error;
    }
  }

  @ApiOperation({ summary: messages.REQUEST_MODULE_UPDATE })
  @ApiResponse({ status: 200, description: messages.MODULE_UPDATED })
  @ApiResponse({ status: 400, description: messages.BAD_REQUEST })
  @ApiParam({
    name: 'id',
    type: 'string',
    required: true,
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Put('/update-request-module/:id')
  async updateRequestModule(@Param() id, @Body() body: Request_Module, @Request() req) {
    try {
      const data = await this.adminService.updateRequestModule(id, body, req);
      return data;
    } catch (error) {
      throw error;
    }
  }





  @ApiOperation({ summary: messages.REQUEST_MODULE_LISTING })
  @ApiResponse({ status: 200, description: messages.REQUEST_MODULE_FETCHED })
  @ApiResponse({ status: 400, description: messages.BAD_REQUEST })
  @ApiQuery({ name: 'search', type: 'string', required: false })
  @ApiQuery({ name: 'column', type: 'number', required: false })
  @ApiQuery({ name: 'sort', type: 'string', required: false })
  @ApiParam({
    name: 'id',
    type: 'string',
    required: true,
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get('/get-change-request-module/:id')
  async getRequestListing(@Query() req, @Param() id) {
    try {
      const data = await this.adminService.getRequestListing(req, id);

      return {
        status: 200,
        message: messages.REQUEST_MODULE_FETCHED,
        data: data,
      };
    } catch (error) {
      throw error;
    }
  }

  @ApiOperation({ summary: messages.REQUEST_MODULE_LISTING })
  @ApiResponse({ status: 200, description: messages.REQUEST_MODULE_FETCHED })
  @ApiResponse({ status: 400, description: messages.BAD_REQUEST })
  @ApiParam({
    name: 'id',
    type: 'string',
    required: true,
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get('/get-change-request-module-details/:id')
  async getRequestDetails(@Param() id) {
    try {
      const data = await this.adminService.getRequestDetails(id);

      return {
        status: 200,
        message: messages.REQUEST_MODULE_FETCHED,
        data: data,
      };
    } catch (error) {
      throw error;
    }
  }

  @ApiOperation({ summary: messages.LEAVE_MANAGEMENT })
  @ApiResponse({ status: 200, description: messages.LEAVE_APPLIED })
  @ApiResponse({ status: 400, description: messages.BAD_REQUEST })
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Post('/leave-application')
  async applyLeave(@Body() body: LeaveForm) {
    try {
      return await this.adminService.applyLeave(body);
    } catch (error) {
      throw error;
    }
  }

  @ApiOperation({ summary: messages.LEAVE_LISTING })
  @ApiResponse({ status: 200, description: messages.LEAVE_FETCHED })
  @ApiResponse({ status: 400, description: messages.BAD_REQUEST })
  @ApiQuery({ name: 'page', type: 'number', required: false })
  @ApiQuery({ name: 'limit', type: 'number', required: false })
  @ApiQuery({ name: 'search', type: 'string', required: false })
  @ApiQuery({ name: 'column', type: 'number', required: false })
  @ApiQuery({ name: 'sort', type: 'string', required: false })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get('/get-leave-management')
  async getLeaveManagement(@Query() req) {
    try {
      return await this.adminService.getLeaveManagement(req);
    } catch (error) {
      throw error;
    }
  }

  @ApiOperation({ summary: messages.ROLES_PERMISSION_SUMMARY })
  @ApiResponse({ status: 200, description: messages.ROLES_PERMISSION_SAVED })
  @ApiResponse({ status: 400, description: messages.BAD_REQUEST })
  @ApiParam({
    name: 'id',
    type: 'string',
    required: true,
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Post('/roles-permission/:id')
  async rolesPermission(@Body() body: Role_And_Permission, @Param() id) {
    try {
      const saveRole = await this.adminService.rolePermission(body, id);
      return {
        status: 200,
        message: messages.ROLES_PERMISSION_SAVED,
      };
    } catch (error) {
      throw error;
    }
  }


  // @ApiOperation({ summary: messages.ROLES_PERMISSION_SUMMARY })
  // @ApiResponse({ status: 200, description: messages.ROLES_PERMISSION_SAVED })
  // @ApiResponse({ status: 400, description: messages.BAD_REQUEST })
  // @ApiParam({
  //   name: 'id',
  //   type: 'string',
  //   required: true,
  // })
  // @ApiBearerAuth()
  // @UseGuards(AuthGuard, RolesGuard)
  // @Roles(Role.ADMIN)
  // @Post('/roles-permission-admins/:id')
  // async rolesPermissionAdmins(@Body() body: Role_And_Permission, @Param() id) {
  //   try {
  //     const saveRole = await this.adminService.rolesPermissionAdmins(body, id);
  //     return {
  //       status: 200,
  //       message: messages.ROLES_PERMISSION_SAVED,
  //     };
  //   } catch (error) {
  //     throw error;
  //   }
  // }

  @ApiOperation({ summary: messages.ROLES_PERMISSION_LISTING })
  @ApiResponse({ status: 200, description: messages.ROLES_PERMISSION_FETCHED })
  @ApiResponse({ status: 400, description: messages.BAD_REQUEST })
  @ApiQuery({ name: 'page', type: 'number', required: false })
  @ApiQuery({ name: 'limit', type: 'number', required: false })
  @ApiQuery({ name: 'search', type: 'string', required: false })
  @ApiQuery({ name: 'column', type: 'number', required: false })
  @ApiQuery({ name: 'sort', type: 'string', required: false })
  @ApiParam({
    name: 'id',
    type: 'string',
    required: true,
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get('/get-roles-permission/:id')
  async getRolePermission(@Query() req, @Param() id) {
    try {
      return await this.adminService.getRolesAndPermission(req ,id);
    } catch (error) {
      throw error;
    }
  }

  @ApiOperation({ summary: messages.MILESTONE_UPDATE_DETAILS })
  @ApiResponse({ status: 200, description: messages.MILESTONE_UPDATED })
  @ApiResponse({ status: 400, description: messages.BAD_REQUEST })
  @ApiParam({
    type: 'string',
    name: 'id',
    required: true
  })
  @ApiQuery({ name: 'project_id', type: 'number', required: true })
  @HttpCode(200)
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Put('edit-milestone/:id')
  async updateMilestone(@Param() id, @Body() body: ProjectMilestone, @Query() query, @Request() req) {
    try {
      const data = await this.adminService.updateMilestone(id, body, query, req)
      return {
        status: 200,
        messages: messages.MILESTONE_UPDATED,
        data: data
      }
    } catch (error) {
      throw error;
    }
  }

  @ApiOperation({ summary: messages.DELETE_PROJECT })
  @ApiResponse({ status: 200, description: messages.PROJECT_DELETED })
  @ApiResponse({ status: 400, description: messages.BAD_REQUEST })
  @ApiParam({
    type: 'string',
    name: 'id',
    required: true
  })
  @HttpCode(200)
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Delete('delete-project/:id')
  async deleteProject(@Param() id, @Request() req) {
    try {
      const data = await this.adminService.deleteProject(req, id);
      return data;
    } catch (error) {
      throw error;
    }
  }

  @ApiOperation({ summary: messages.DELETE_EMPLOYEE })
  @ApiResponse({ status: 200, description: messages.EMPLOYEE_DELETED })
  @ApiResponse({ status: 400, description: messages.BAD_REQUEST })
  @ApiParam({
    type: 'string',
    name: 'id',
    required: true
  })
  @HttpCode(200)
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Delete('delete-employee/:id')
  async deleteEmployee(@Param() id) {
    try {
      const data = await this.adminService.deleteEmployee(id);
      return data;
    } catch (error) {
      throw error;
    }
  }

  @ApiOperation({ summary: messages.EMPLOYEE_REMARKS })
  @ApiResponse({
    status: 200,
    description: messages.REMARKS_SAVED
  })
  @ApiResponse({
    status: 400,
    description: messages.BAD_REQUEST
  })
  @ApiParam({
    type: 'string',
    name: 'id',
    required: true
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Post('add-remarks/:id')
  async addRemarks(@Param() id, @Body() body: Remarks) {
    try {
      const data = await this.adminService.addRemarks(id, body);
      if (data) {
        return {
          status: 200,
          message: messages.REMARKS_SAVED
        }
      }
      else {
        return {
          status: 500,
          message: messages.SOMETHING_WENT_WRONG,
        }
      }
    } catch (error) {
      throw error
    }
  }


  @ApiOperation({ summary: messages.GET_REMARKS })
  @ApiResponse({
    status: 200,
    description: messages.DATA_FTECHED
  })
  @ApiResponse({
    status: 400,
    description: messages.BAD_REQUEST
  })
  @ApiParam({
    type: 'string',
    name: 'id',
    required: true,
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Get('get-employees-remarks/:id')
  async getRemarks(@Param() id) {
    try {
      const data = await this.adminService.getRemarks(id)
      return data;
    } catch (error) {
      throw new BadGatewayException(error.message)
    }
  }


  @ApiOperation({ summary: messages.DELETE_REMARKS })
  @ApiResponse({
    status: 200,
    description: messages.REMARKS_DELTED
  })
  @ApiResponse({
    status: 400,
    description: messages.BAD_REQUEST
  })
  @ApiParam({
    type: 'string',
    name: 'id',
    required: true,
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Delete('delete-employees-remarks/:id')
  async deleteRemarks(@Param() id) {
    try {
      const data = await this.adminService.deleteRemarks(id)
      return data;
    } catch (error) {
      throw new BadGatewayException(error.message)
    }
  }



  @ApiOperation({ summary: messages.GET_EMPLOYEE_DROPDOWN })
  @ApiResponse({
    status: 200,
    description: messages.EMPLOYEE_FETCHED
  })
  @ApiResponse({
    status: 400,
    description: messages.BAD_REQUEST
  })
  @ApiQuery({ name: 'search', type: 'string', required: false })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get('get-employees-dropdown')
  async getEmployee(@Query() req) {
    try {
      const data = await this.adminService.getEmployeeDropdown(req)
      return {
        status: 200,
        messages: messages.EMPLOYEE_FETCHED,
        data: data
      }
    } catch (error) {
      throw error
    }
  }

  @ApiOperation({ summary: messages.GET_PROJECT_DROPDOWN })
  @ApiResponse({
    status: 200,
    description: messages.PROJECT_FETCHED
  })
  @ApiResponse({
    status: 400,
    description: messages.BAD_REQUEST
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get('get-project-dropdown')
  async getProjectDropDown() {
    try {
      const data = await this.adminService.getProjectDropDown()
      return {
        status: 200,
        messages: messages.PROJECT_FETCHED,
        data: data
      }
    } catch (error) {
      throw error
    }
  }

  @ApiOperation({ summary: messages.EMPLOYEE_DETAILS })
  @ApiResponse({
    status: 200,
    description: messages.EMPLOYEE_FETCHED
  })
  @ApiResponse({
    status: 400,
    description: messages.BAD_REQUEST
  })
  @ApiParam({
    type: 'string',
    name: 'id',
    required: true
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get('get-employee-details/:id')
  async getEmployeeDetails(@Param() id) {
    try {
  
      const data = await this.adminService.getEmployeeDetails(id)

      return data;

    } catch (error) {
      throw error
    }
  }

  @ApiOperation({ summary: messages.RANDOM_EMPLOYEE_ID })
  @ApiResponse({
    status: 200,
    description: messages.SUCCESS
  })
  @ApiResponse({
    status: 400,
    description: messages.BAD_REQUEST
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get('get-random-employeeId')
  async sendRandomId() {
    try {
      const data = await this.adminService.sendRandomId()
      return {
        status: 200,
        messages: messages.SUCCESS,
        data: data
      }
    } catch (error) {
      throw error
    }
  }

  @ApiOperation({ summary: messages.DELETE_MILESTONE })
  @ApiResponse({
    status: 200,
    description: messages.MILESTONE_DELETED,
  })
  @ApiResponse({ status: 400, description: messages.BAD_REQUEST })
  @ApiParam({
    name: 'id',
    type: 'number',
    required: true,
  })
  @Delete('/delete-milestones/:id')
  @ApiBearerAuth()
  @HttpCode(200)
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  async deleteMilestone(@Param() id, @Request() req) {
    try {
      const data = await this.adminService.deleteMilestone(req, id);
      return data;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }



  @ApiOperation({ summary: messages.DELETE_TEAM_MEMBER })
  @ApiResponse({
    status: 200,
    description: messages.TEAM_MEMBER_DELETED,
  })
  @ApiResponse({ status: 400, description: messages.BAD_REQUEST })
  @ApiQuery({ name: 'milestone_id', type: 'number', required: false })
  @ApiParam({
    name: 'id',
    type: 'number',
    required: true,
  })
  @Delete('/delete-team-member/:id')
  @ApiBearerAuth()
  @HttpCode(200)
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  async deleteTeamMeber(@Param() id, @Request() request) {
    try {
      const data = await this.adminService.deleteTeamMeber(id, request);
      return data;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }



  @ApiOperation({ summary: messages.UPDATE_EMPLOYEE_PERSONAL })
  @ApiResponse({
    status: 200,
    description: messages.EMPLOYEE_UPDATED,
  })
  @ApiResponse({ status: 400, description: messages.BAD_REQUEST })
  @ApiParam({
    name: 'id',
    type: 'string',
    required: true,
  })
  @Put('/update-employee/:id')
  @ApiBearerAuth()
  @HttpCode(200)
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  async updateEmployee(@Param() id, @Body() body: EmployeeUpdate, @Request() req) {
    try {
      const data = await this.adminService.updateEmployee(id, body, req);
      return data;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @ApiOperation({ summary: messages.LOG_ACTIVITY })
  @ApiResponse({
    status: 200,
    description: messages.LOG_ACTIVITY_FETCHED,
  })
  @ApiParam({
    name: 'id',
    type: 'string',
    required: true,
  })
  @ApiResponse({ status: 400, description: messages.BAD_REQUEST })
  @ApiQuery({ name: 'page', type: 'number', required: false })
  @ApiQuery({ name: 'limit', type: 'number', required: false })
  @ApiQuery({ name: 'type', type: 'string', required: true })
  @Get('/get-logs/:id')
  @ApiBearerAuth()
  @HttpCode(200)
  // @Roles(Role.ADMIN)
  async getLogActitvity(@Query() paginateQuery, @Param() id) {
    try {
      const data = await this.adminService.logActivity(paginateQuery, id);
      return data;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }


  @ApiOperation({ summary: messages.DELETE_PROJECT_DOCUMENT })
  @ApiResponse({
    status: 200,
    description: messages.DELETED_DOCUMENT,
  })
  @ApiResponse({ status: 400, description: messages.BAD_REQUEST })
  @ApiParam({
    name: 'id',
    type: 'number',
    required: true,
  })
  @Delete('/delete-project-document/:id')
  @ApiBearerAuth()
  @HttpCode(200)
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  async deleteProjectDocument(@Param() id, @Request() req) {
    try {
      const data = await this.adminService.deleteProjectDocument(req, id);
      return data;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @ApiOperation({ summary: messages.MILESTONE_ASSIGNEE })
  @ApiResponse({
    status: 200,
    description: messages.MILESTONE_ASSIGNEE_FETCHED,
  })
  @ApiParam({
    name: 'id',
    type: 'number',
    required: true,
  })
  @ApiResponse({ status: 400, description: messages.BAD_REQUEST })
  @Get('/get-assignee/:id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @HttpCode(200)
  async getAssignee(@Param() id) {
    try {
      const data = await this.adminService.getAssignee(id);
      if (data) {
        return {
          status: 200,
          message: messages.MILESTONE_ASSIGNEE_FETCHED,
          data: data,
        };
      }
      else {
        return {
          status: 403,
          message: messages.NOT_FOUND
        }
      }
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }


  @ApiOperation({ summary: messages.DELETE_MODULE })
  @ApiResponse({
    status: 200,
    description: messages.MODULE_DELTED,
  })
  @ApiParam({
    name: 'id',
    type: 'number',
    required: true,
  })
  @ApiResponse({ status: 400, description: messages.BAD_REQUEST })
  @Delete('/delete-module/:id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @HttpCode(200)
  @Roles(Role.ADMIN)
  async deleteModule(@Param() id, @Request() req) {
    try {
      const data = await this.adminService.deleteModule(id, req);
      return {
        status: 200,
        message: messages.MODULE_DELTED,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @ApiOperation({ summary: messages.DELETE_MODULE_LINKS })
  @ApiResponse({
    status: 200,
    description: messages.MODULE_LINKS_DELTED,
  })
  @ApiParam({
    name: 'id',
    type: 'number',
    required: true,
  })
  @ApiResponse({ status: 400, description: messages.BAD_REQUEST })
  @Delete('/delete-module-links/:id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @HttpCode(200)
  @Roles(Role.ADMIN)
  async deleteModuleLinks(@Param() id) {
    try {
      const data = await this.adminService.deleteModuleLinks(id);
      return {
        status: 200,
        message: messages.MODULE_LINKS_DELTED,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @ApiOperation({ summary: messages.EMPLOYEE_PERMISSIONS })
  @ApiResponse({
    status: 200,
    description: messages.EMPLOYEE_PERMISSION_FETCHED,
  })
  @ApiParam({
    name: 'id',
    type: 'number',
    required: true,
  })
  @ApiResponse({ status: 400, description: messages.BAD_REQUEST })
  @Get('/employee-permission/:id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @HttpCode(200)
  async getEmployeePermission(@Param() id) {
    try {
      // const data = await this.adminService.deleteModuleLinks(id);
      // return {
      //   status :200 ,
      //   message : messages.MODULE_LINKS_DELTED,
      // } ;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }


  @ApiOperation({ summary: messages.MODULE_LINKTITLE_UPDATE })
  @ApiResponse({
    status: 200,
    description: messages.MODULE_UPDATED,
  })
  @ApiParam({
    name: 'id',
    type: 'number',
    required: true,
  })
  @ApiResponse({ status: 400, description: messages.BAD_REQUEST })
  @Put('/update-link-title-module/:id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @HttpCode(200)
  @Roles(Role.ADMIN)
  async updateLinkTitleModule(@Param() id, @Body() body: ModuleLinkTitle) {
    try {
      const data = await this.adminService.updateLinkTitleModule(id, body);
      return data;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @ApiOperation({ summary: messages.UPDATE_MILESTONE_STATUS })
  @ApiResponse({
    status: 200,
    description: messages.MILESTONE_UPDATED,
  })
  @ApiParam({
    name: 'id',
    type: 'number',
    required: true,
  })
  @ApiResponse({ status: 400, description: messages.BAD_REQUEST })
  @Put('/update-milestone-status/:id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @HttpCode(200)
  @Roles(Role.ADMIN)
  async updateMilestoneStatus(@Param() id, @Body() body: MilestoneStatus) {
    try {
      const data = await this.adminService.updateMilestoneStatus(id, body);
      return data;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @ApiOperation({ summary: messages.UPDATE_MILESTONE_STATUS })
  @ApiResponse({
    status: 200,
    description: messages.MILESTONE_UPDATED,
  })
  @ApiParam({
    name: 'id',
    type: 'number',
    required: true,
  })
  @ApiResponse({ status: 400, description: messages.BAD_REQUEST })
  @Put('/update-milestone-priority/:id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @HttpCode(200)
  @Roles(Role.ADMIN)
  async updateMilestonePriority(@Param() id, @Body() body: MilestonePriority) {
    try {
      const data = await this.adminService.updateMilestonePriority(id, body);
      return data;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @ApiOperation({ summary: messages.DELETE_TASKS })
  @ApiResponse({
    status: 200,
    description: messages.TASK_DELETED,
  })
  @ApiParam({
    name: 'id',
    type: 'number',
    required: true,
  })
  @ApiResponse({ status: 400, description: messages.BAD_REQUEST })
  @Delete('/delete-tasks/:id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @HttpCode(200)
  @Roles(Role.ADMIN)
  async deleteTasks(@Param() id, @Request() req) {
    try {
      const data = await this.adminService.deleteTasks(id, req);
      return data;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }


  @ApiOperation({ summary: messages.TASK_DETAILS })
  @ApiResponse({
    status: 200,
    description: messages.TASK_FETCHED,
  })
  @ApiParam({
    name: 'id',
    type: 'number',
    required: true,
  })
  @ApiResponse({ status: 400, description: messages.BAD_REQUEST })
  @Get('/get-task-details/:id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @HttpCode(200)
  async getTaskDetails(@Param() id) {
    try {
      const data = await this.adminService.getTaskDetails(id);
      return data;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }


  @ApiOperation({ summary: messages.ALL_STATUS_PROJECT })
  @ApiResponse({
    status: 200,
    description: messages.PROJECT_STATUS_COUNT_FETCHED,
  })
  @ApiResponse({ status: 400, description: messages.BAD_REQUEST })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @HttpCode(200)
  @Get('/get-project-status-count')
  async getProjectStatusCount() {
    try {
      const data = await this.adminService.getProjectStatusCount();
      return data;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }


  @ApiOperation({ summary: messages.DELETE_CREDENTIALS })
  @ApiResponse({
    status: 200,
    description: messages.CREDENTIAL_DELETED,
  })
  @ApiParam({
    name: 'id',
    type: 'number',
    required: true,
  })
  @ApiResponse({ status: 400, description: messages.BAD_REQUEST })
  @Delete('/delete-employee-credentials/:id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @HttpCode(200)
  @Roles(Role.ADMIN)
  async deleteEmployeeCredential(@Param() id) {
    try {
      const data = await this.adminService.deleteEmployeeCredential(id);
      return data;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @ApiOperation({ summary: messages.DELETE_WORKEXPERIENCE })
  @ApiResponse({
    status: 200,
    description: messages.WORKEXPERIENCE_DELETED,
  })
  @ApiParam({
    name: 'id',
    type: 'number',
    required: true,
  })
  @ApiResponse({ status: 400, description: messages.BAD_REQUEST })
  @Delete('/delete-employee-work-experience/:id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @HttpCode(200)
  @Roles(Role.ADMIN)
  async deleteEmployeeWorkExperience(@Param() id) {
    try {
      const data = await this.adminService.deleteEmployeeWorkExperience(id);
      return data;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @ApiOperation({ summary: messages.DELETE_EDUCATION })
  @ApiResponse({
    status: 200,
    description: messages.EDCUATION_DELETED,
  })
  @ApiParam({
    name: 'id',
    type: 'number',
    required: true,
  })
  @ApiResponse({ status: 400, description: messages.BAD_REQUEST })
  @Delete('/delete-employee-education/:id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @HttpCode(200)
  @Roles(Role.ADMIN)
  async deleteEmployeeEducation(@Param() id) {
    try {
      const data = await this.adminService.deleteEmployeeEducation(id);
      return data;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }



  @ApiOperation({ summary: messages.REPORTS_LISTING })
  @ApiResponse({
    status: 200,
    description : messages.REPORTS_FETCHED
  })
  @ApiResponse({
    status:400,
    description : messages.BAD_REQUEST
  })
  @ApiQuery({ name: 'page', type: 'number', required: false })
  @ApiQuery({ name: 'limit', type: 'number', required: false })
  @ApiQuery({ name: 'search', type: 'string', required: false })
  @ApiQuery({ name: 'project', type: 'string', required: false })
  @ApiQuery({ name: 'employee', type: 'string', required: false })
  @ApiQuery({ name: 'start_date', type: 'string', required: false })
  @ApiQuery({ name: 'end_date', type: 'string', required: false })
  @ApiQuery({ name: 'column_name', type: 'string', required: false })
  @ApiQuery({ name: 'column_order', type: 'string', required: false })
  @ApiBearerAuth()
  @UseGuards(AuthGuard,RolesGuard)
  @Roles(Role.ADMIN)
  @HttpCode(200)
  @Get('get-reports')
  async getReportings(@Query() req){
    try {
      const reportListing = await this.adminService.getReportListing(req);
      return reportListing ;
    } catch (error) {
      throw error ;
    }
  }

  @ApiOperation({ summary: messages.CREATE_ADMIN })
  @ApiResponse({
    status: 200,
    description: messages.DATA_FTECHED
  })
  @ApiResponse({
    status: 400,
    description: messages.BAD_REQUEST
  })
  @UseGuards(AuthGuard,RolesGuard)
  @Roles(Role.ADMIN)
  @HttpCode(200)
  @Get('get-all-admins')
  async getallAdmin() {
    try {
      const createAdmin = await this.adminService.getallAdmin();
      return createAdmin ;
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }



  @ApiOperation({ summary: messages.DELETE_ADMIN })
  @ApiResponse({
    status: 200,
    description: messages.ADMIN_DELETED
  })
  @ApiResponse({
    status: 400,
    description: messages.BAD_REQUEST
  })
  @ApiParam({
    name: 'id',
    type: 'number',
    required: true,
  })
  @Delete('delete-admins/:id')
  async deleteAdmin(@Param() id) {
    try {
      const deleteAdmin = await this.adminService.deleteAdmin(id);
      return deleteAdmin ;
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }

  @ApiOperation({ summary: messages.ADD_CLIENT_SUMMARY })
  @ApiResponse({
    status: 200,
    description: messages.CLIENT_CREATED,
  })
  @ApiResponse({ status: 400, description: messages.BAD_REQUEST })
  @Post('/add-client')
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @HttpCode(200)
  async createClient(@Request() req, @Body() body: Client) {
    try {
        const saveEmployee = await this.adminService.createClient(body, req);
        return saveEmployee;
    } catch (error) {
      throw new BadRequestException([error.message]);
    }
  }


  @ApiOperation({ summary: messages.GET_Clients })
  @ApiResponse({
    status: 200,
    description: messages.CLIENT_FETCHED,
  })
  @ApiResponse({ status: 400, description: messages.BAD_REQUEST })
  // @ApiQuery({ name: 'page', type: 'number', required: false })
  // @ApiQuery({ name: 'limit', type: 'number', required: false })
  @ApiQuery({ name: 'search', type: 'string', required: false })
  // @ApiQuery({ name: 'status', type: 'string', required: false })
  @ApiQuery({ name: 'sort', type: 'string', required: false })
  // @ApiQuery({ name: 'column_name', type: 'string', required: false })
  // @ApiQuery({ name: 'column_order', type: 'string', required: false })
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Get('/get-allclients')
  async getClient(@Query() req) {
    try {
      const listingEmployee = await this.adminService.getAllClient(req);
      return {
        status: 200,
        message: messages.CLIENT_FETCHED,
        listingEmployee: listingEmployee,
      };
    } catch (error) {
      throw error;
    }
  }


  @ApiOperation({ summary: messages.UPDATE_Client })
  @ApiResponse({
    status: 200,
    description: messages.Client_UPDATED,
  })
  @ApiResponse({ status: 400, description: messages.BAD_REQUEST })
  @ApiParam({
    name: 'id',
    type: 'string',
    required: true,
  })
  @Put('/update-client/:id')
  @ApiBearerAuth()
  @HttpCode(200)
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  async updateClient(@Param() id, @Body() body: ClientUpdate, @Request() req) {
    try {
      const data = await this.adminService.updateClient(id, body, req);
      return data;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }


  @ApiOperation({ summary: messages.DELETE_CLIENT })
  @ApiResponse({
    status: 200,
    description: messages.Client_DELETED
  })
  @ApiResponse({
    status: 400,
    description: messages.BAD_REQUEST
  })
  @ApiParam({
    name: 'id',
    type: 'number',
    required: true,
  })
  @ApiBearerAuth()
  @HttpCode(200)
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Delete('delete-client/:id')
  async deleteClient(@Param() id) {
    try {
      const deleteClient = await this.adminService.deleteClient(id);
      return deleteClient ;
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }
}
