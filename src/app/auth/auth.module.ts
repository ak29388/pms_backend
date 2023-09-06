import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { jwtConstants } from 'src/helpers/constants';
import { Accounts,  AdminTable,  Designation_table, Employee, Link_title, Milestone_Priority, Project_Condition, Project_Phase, Project_roles, Project_Type } from 'src/typeOrm';
import { Department_Table } from 'src/typeOrm/deparments.entity';
import { Milestone_Status } from 'src/typeOrm/milestone_status.entity';
import { Platform } from 'src/typeOrm/platform.entity';
import { Project_Status } from 'src/typeOrm/project_status.entity';
import { Roles } from 'src/typeOrm/roles.entity';
import { Technology } from 'src/typeOrm/technology.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    JwtModule.register({
      secret: jwtConstants.JWTSECRET,
      signOptions: { expiresIn: '7d' },
    }),
    
    TypeOrmModule.forFeature([Accounts,
      AdminTable, 
      Employee,
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
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
