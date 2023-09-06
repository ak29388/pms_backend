import { ApiProperty } from '@nestjs/swagger';
import { Designation } from 'src/typeOrm/jobDetail.entity';
import { IsNotEmpty } from 'class-validator';
import { EMP_Status } from 'src/typeOrm/employee.entity';
import { Department } from 'src/helpers/constants';

export class JobDetails {
 
  @ApiProperty({example: '02/02/2022'})
  @IsNotEmpty()
  date_of_joinig: string;

  @ApiProperty({example: '02/02/2023'})
  date_of_leaving: string;

  @ApiProperty({example: '2'})
  designation: string;

  @ApiProperty({example: '1'})
  department: string;

  @ApiProperty({example: 'Active'})
  job_status: EMP_Status;

  @ApiProperty({example: 'Admin01'})
  Reporting_manager: string;
}
