import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { jwtConstants } from 'src/helpers/constants';
import { PaginateModule } from 'nestjs-sequelize-paginate';
import {
  Address,
  AdminTable,
  Credentials,
  Education,
  Employee,
  JobDetails,
  MilestonesLinks,
  Project,
  ProjectDocument,
  ProjectMilestone,
  WorkExperience,
  ProjectAssignee,
  Salary,
  Task,
  Accounts,
  Project_Type,
  Project_Condition,
  Project_Phase,
  Milestone_Priority,
  Link_title,
  Project_roles,
  Designation_table,
  Request_Module,
  LeaveManagement,
  Roles_And_Permission,
  Remarks,
  Sourced_From,
  LogActivity,
  Milestone_Assignee,
  ServiceType,
  RequestModuleLinks,
  Reporting,
  Clients,
} from 'src/typeOrm';
import { Department_Table } from 'src/typeOrm/deparments.entity';
import { Designation } from 'src/typeOrm/jobDetail.entity';
import { Milestone_Status } from 'src/typeOrm/milestone_status.entity';
import { Platform } from 'src/typeOrm/platform.entity';
import { Project_Status } from 'src/typeOrm/project_status.entity';
import { Roles } from 'src/typeOrm/roles.entity';
import { Technology } from 'src/typeOrm/technology.entity';
import { AuthModule } from '../auth/auth.module';
// import { AuthModule } from '../auth/auth.module';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([
      AdminTable,
      Project,
      Employee,
      Address,
      JobDetails,
      Credentials,
      WorkExperience,
      Education,
      ProjectMilestone,
      MilestonesLinks,
      ProjectDocument,
      ProjectAssignee,
      Salary,
      Task,
      Accounts,
      Department_Table,
      Roles,
      Platform,
      Technology,
      Project_Type,
      Project_Condition,
      Project_Phase,
      Project_Status,
      Milestone_Status,
      Milestone_Priority,
      Link_title,
      Project_roles,
      Designation_table,
      Request_Module,
      LeaveManagement,
      Roles_And_Permission,
      Remarks,
      Sourced_From,
      LogActivity,
      Milestone_Assignee,
      ServiceType,
      RequestModuleLinks,
      Reporting,
      Clients
    ]),
  ],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
