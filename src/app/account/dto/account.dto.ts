import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Role } from 'src/typeOrm/employee.entity';

export class Account {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(12)
  @IsString()
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(12)
  @Matches('password')
  confirm_password: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(Role)
  role: Role;
}
