import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { Project_Role, Project_Team_Status } from 'src/helpers/constants';
import { Role } from 'src/typeOrm/employee.entity';

export class ProjectTeam {

  @ApiProperty({
    type: [String],
    example: [
      {
        employee_name: 'SFS2074',
        Role: '1'
      },
    ],
  })
  @IsNotEmpty({message : 'This field can not be empty'})
  members : [] ;

  // @ApiProperty({example: 'adity kenny'})
  // @IsNotEmpty({message : 'This field can not be empty'})
  // employee_name: string;

  // @ApiProperty({example: 'Developer'})
  // @IsNotEmpty({message : 'This field can not be empty'})
  // Role: Project_Role;
}
