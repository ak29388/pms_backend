import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { Priority, Priority_Label } from 'src/helpers/constants';

export class Task {
  @ApiProperty({ example: 'taskNew' })
  @IsNotEmpty({ message: 'Title should not be empty' })
  task_title: string;

  @ApiProperty({
    example: '01/10/2021',
  })
  @IsNotEmpty({ message: 'Date should not be empty' })
  start_date: string;

  @ApiProperty({ example: '01/10/2021' })
  end_date: string;

  @ApiProperty({
    example: '1',
  })
  @IsNotEmpty({ message: 'Status should not be empty' })
  status: string;

  @ApiProperty({ example: '1' })
  Priority_Label: string;

  @ApiProperty({
    example: '11',
  })
  assigned_to: string;

  @ApiProperty({ example: 'description' })
  description: string;
}
