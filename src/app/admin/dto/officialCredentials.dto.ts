import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { Service_Type } from 'src/helpers/constants';
import { EMP_Status } from 'src/typeOrm/employee.entity';

export class OfficialCredentials {
  @ApiProperty({example: 'Email'})
  @IsEnum(Service_Type)
  service_type: Service_Type;

  @ApiProperty({example: 'www.url.com'})
  service_url: string;

  @ApiProperty({example: 'employee02@yopmail.com'})
  @IsNotEmpty()
  @IsEmail()
  email_user_name: string;

  @ApiProperty({example: 'Employee02'})
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(50)
  password: string;

  @ApiProperty({example: '5555555555'})
  @MaxLength(20)
  @MinLength(10)
  contact_number: string;

  @ApiProperty({example: '454'})
  code: string;

  @ApiProperty({example: 'remarks'})
  remarks: string;

  @ApiProperty({example: 'Active'})
  status: EMP_Status;
}
