import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty } from 'class-validator';
import { EMP_Status, Role } from 'src/typeOrm/employee.entity';
import { Unique } from 'typeorm';

export class AdminDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(Role)
  role: Role;

  @ApiProperty()
  profile_image: string;
}
