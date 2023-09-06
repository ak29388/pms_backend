import {
  IsNotEmpty,
  IsEmail,
  MinLength,
  MaxLength,
  IsEnum,
  IsDate,
  IsUrl,
  Validate,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import {
  Platform_enum,
  Project_Condition_Enum,
  Project_Phase_ENUM,
  Project_status,
  Project_Type_Enum,
} from 'src/helpers/constants';
import { Project_Phase } from 'src/typeOrm';
import { Platform } from 'src/typeOrm/platform.entity';
import { Unique } from 'typeorm';
import { Transform } from 'stream';

export class Project {
  @ApiProperty({
    example: 'Dating_app',
    description: 'Project name',
  })
  @IsNotEmpty({ message: 'Project Name should not be empty' })

  name: string;

  @ApiProperty({
    example: '2023-05-25',
    description: 'Project start date',
  })
  @IsNotEmpty({ message: 'Project date should not be empty' })
  start_date: string;

  @ApiProperty({ example: '2023-05-30' })
  end_date: string;

  @ApiProperty({example : '2'})
  sourced_from: string;

  @ApiProperty({ example: 'www.url.com' })
  @IsUrl()
  url: string;

  @ApiProperty({ example: 'Cleint' })
  @IsNotEmpty({ message: 'Cleint Name should not be empty' })
  client_name: string;

  @ApiProperty({ example: 'h272' })
  hired_id: string;

  @ApiProperty({ example: '40hrs' })
  no_of_hours: string;

  @ApiProperty({ example: '$2000' })
  budget: string;

  @ApiProperty({ example: 'Date_p' })
  @IsNotEmpty({ message: 'App Name should not be empty' })
  app_name: string;

  @ApiProperty({ example: '1' })
  @IsEnum(Platform_enum)
  platform: Platform_enum;

  @ApiProperty({ example: 'Description regarding app' })
  notes: string;

  @ApiProperty({ example: '1' })
  @IsEnum(Project_Type_Enum)
  project_type: Project_Type_Enum;

  @ApiProperty({ example: '1' })
  @IsEnum(Project_Condition_Enum)
  project_condition: Project_Condition_Enum;

  @ApiProperty({ example: '7' })
  @IsEnum(Project_Phase_ENUM)
  project_phase: Project_Phase_ENUM;

}
