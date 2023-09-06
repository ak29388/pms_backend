import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Matches, MaxLength, MinLength } from 'class-validator';

export class ForgetPassword {
  @ApiProperty({
    example: 'admin01212',
  })
  @IsNotEmpty({ message: 'this filed can not be empty' })
  @MinLength(4)
  @MaxLength(20)
  new_password: string;

  @ApiProperty({
    example: 'admin01212',
  })
  @IsNotEmpty({ message: 'this filed can not be empty' })
  @MinLength(4)
  @MaxLength(20)
  @Matches('new_password')
  confirm_password: string;
}
