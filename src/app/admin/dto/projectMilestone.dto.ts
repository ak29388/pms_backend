import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { Document_type, Priority } from 'src/helpers/constants';
import { messages } from 'src/helpers/message';

export class ProjectMilestone {
  @ApiProperty({example: 'Milestone01'})
  @IsNotEmpty({message: 'Milestone name can not be empty'})
  name: string;

  @ApiProperty({example : 'milestone details this project'})
  milestone_detail: string;

  @ApiProperty({type: [String],
    example: [
      {
        assignee_id: 'SFS4461',
        team_id : '275',
      },
    ],})
  assignee: [];

  @ApiProperty({
    example: 'Low'
  })
  @IsEnum(Priority)
  priority: Priority;

  @ApiProperty({example: '02/04/2023'})
  start_date: string;

  @ApiProperty({example: '05/05/2023'})
  due_date: string;

  @ApiProperty({
    type: [String],
    example: [
      {
        link_title: '1',
       link_url : 'www.url.com'
      },
    ],
  })
  @IsEnum(Document_type)
  links: [];

}
