import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Query,
  Req,
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
import { IPaginationOptions } from 'nestjs-typeorm-paginate';
import { messages } from 'src/helpers/message';
import { Role } from 'src/typeOrm/employee.entity';
import { Login } from '../auth/dto/login.dto';
import { RolesGuard } from '../guards/jwt-auth-roles.guard';
import { AuthGuard } from '../guards/jwt-auth.guard';
import { Roles } from '../guards/roles.decorators';
import { Reporting } from './dto/reporting.dto';
import { EmployeeService } from './employee.service';

@ApiTags('Employee')
@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) { }

  @ApiOperation({ summary: messages.GET_PROJECT_LISTING_SUMMARY })
  @ApiResponse({ status: 200, description: messages.PROJECT_FETCHED })
  @ApiResponse({ status: 400, description: messages.BAD_REQUEST })
  @ApiParam({
    type: 'string',
    required: true,
    name: 'id',
  })
  @ApiQuery({ name: 'sort', type: 'string', required: false })
  @ApiQuery({ name: 'platform', type: 'string', required: false })
  @ApiQuery({ name: 'search', type: 'string', required: false })
  @ApiQuery({ name: 'status', type: 'string', required: false })
  @ApiQuery({ name: 'column_name', type: 'string', required: false })
  @ApiQuery({ name: 'column_order', type: 'string', required: false })
  @Get('/get-projects/:id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.EMPLOYEE)
  @HttpCode(200)
  async getProjects(@Query() req: IPaginationOptions , @Param() id) {
    try {
      return await this.employeeService.getAllProjects(req,id);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @ApiOperation({ summary: messages.GET_PROJECT_DETAILS })
  @ApiResponse({ status: 200, description: messages.PROJECT_FETCHED })
  @ApiResponse({ status: 400, description: messages.BAD_REQUEST })
  @ApiParam({
    type: 'string',
    required: true,
    name: 'id',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.EMPLOYEE)
  @HttpCode(200)
  @Get('/get-project-details/:id')
  async getProjectDetails(@Param() id) {
    try {
      const data = await this.employeeService.getProjectDetails(id);
      return data;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @ApiOperation({ summary: messages.REPORTING_CREATE })
  @ApiResponse({ status: 200, description: messages.REPORT_CREATED })
  @ApiResponse({ status: 400, description: messages.BAD_REQUEST })
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.EMPLOYEE)
  @Post('/create-reports')
  async createReports(@Request() req,@Body() body: Reporting) {
    try {
      const data = await this.employeeService.createReporting(body , req);
     return data ;
    } catch (error) {
      throw error;
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
  @UseGuards(AuthGuard)
  @HttpCode(200)
  @Get('get-reports')
  async getReportings(@Query() req , @Request() request){
    try {
      const reportListing = await this.employeeService.getReportListing(req ,request);
      return reportListing ;
    } catch (error) {
      throw error ;
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
  async getProjectStatusCount(@Request() req) {
    try {
      const data = await this.employeeService.getProjectStatusCount(req);
      return data;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
