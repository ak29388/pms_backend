import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class WorkExperience {
  @ApiProperty({example : 'react native'})
  job_title: string;

  @ApiProperty({example : '14/1/2020'})
  start_date: string;

  @ApiProperty({example : '14/1/2022'})
  end_date: string;

  @ApiProperty({example : '2yrs'})
  total_work_experience: string;

  @ApiProperty({example : 'Company name pvt ltd'})
  company_name: string;
}
