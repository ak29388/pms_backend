import { ApiProperty } from '@nestjs/swagger';

export class Salary {
  @ApiProperty({example : '30000'})
  basic_salary: string;

  @ApiProperty({example : '28/03/2020'})
  effective_date: string;

  @ApiProperty({example : '0041251002478'})
  bank_account: string;

  @ApiProperty({example : 'Manimajara'})
  branch_name: string;

  @ApiProperty({example : 'ICICI01245'})
  ifsc_code: string;

  @ApiProperty({example : '8 LPA'})
  last_CTC: string;

  @ApiProperty({example : '30000'})
  in_Hand_Salary: string;

  @ApiProperty({example : 'NEFT'})
  mode_Of_Payment: string;

  @ApiProperty({example : '10/06/2023'})
  next_review_date: string;
  

  @ApiProperty({example : '10/05/2023'})
  last_salary_date: string;

  @ApiProperty({example : '10%'})
  last_salary_hike: string;
}
