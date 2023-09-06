import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class LeaveForm {
  @ApiProperty({
    example: 'dio brando',
  })
  @IsNotEmpty({ message: 'Employee name can not be empty' })
  employee_name: string;

  @ApiProperty({
    example: 'Sick Leave',
  })
  @IsNotEmpty({ message: 'this column can not be empty' })
  leave_type: string;

  @ApiProperty({
    example: '02/04/2023',
  })
  @IsNotEmpty({ message: 'this column can not be empty' })
  from_date: string;

  @ApiProperty({
    example: 'full day',
  })
  @IsNotEmpty({ message: 'this column can not be empty' })
  from_date_duration: string;

  @ApiProperty({
    example: '04/04/2023',
  })
  @IsNotEmpty({ message: 'this column can not be empty' })
  end_date: string;

  @ApiProperty({
    example: 'full day',
  })
  @IsNotEmpty({ message: 'this column can not be empty' })
  end_date_duration: string;

  @ApiProperty({
    example: 'Admin01',
  })
  @IsNotEmpty({ message: 'this column can not be empty' })
  approved_by: string;

  @ApiProperty({
    example: 'feeling sick',
  })
  @IsNotEmpty({ message: 'this column can not be empty' })
  reason: string;
}
