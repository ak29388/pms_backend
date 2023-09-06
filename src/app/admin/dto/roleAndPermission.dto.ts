import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty } from 'class-validator';

export class Role_And_Permission {
  
  @ApiProperty({
    type: [String],
    example: [
      {
        write: 'true',
        read : 'true',
        create : 'true',
        delete: 'true',
        module : 'project'
      },
    ],
  })
  @IsNotEmpty()
  roles_Permission : [];

}
