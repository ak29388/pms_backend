import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class Reporting {
  @ApiProperty({
    example: 'hive',
  })
  @IsNotEmpty({ message: 'Select a project' })
  project_name: string;

  @ApiProperty({
    example: 'true',
  })
  @IsNotEmpty({ message: 'Select billable' })
  billable: boolean;

  @ApiProperty({
    example: '24hr',
  })
  @IsNotEmpty({ message: 'Enter hours' })
  billable_hours: string;

  @ApiProperty({
    example: 'description of this reports',
  })
  Description: string;
}
