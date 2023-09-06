import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class Login {
  @ApiProperty({ example: 'Admin01@yopmail.com' })
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'Employee02' })
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(12)
  password: string;
}
