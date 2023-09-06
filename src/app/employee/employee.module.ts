import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { jwtConstants } from 'src/helpers/constants';
import { Accounts, Employee, Project, Remarks, Reporting } from 'src/typeOrm';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';

@Module({
  imports: [TypeOrmModule.forFeature([
    Accounts,
    Employee,
    Project,
    Reporting,
    Remarks,
  ])],
  controllers: [EmployeeController],
  providers: [EmployeeService],
})
export class EmployeeModule { }
