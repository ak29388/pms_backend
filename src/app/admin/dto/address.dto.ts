import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class Address {

  @ApiProperty({example: 'Permanent'})
  address_type: string;

  @ApiProperty({example: 'address line one - 1'})
  address_line_one: string;

  @ApiProperty({example: 'address line one - 2'})
  address_line_two: string;

  @ApiProperty({example: 'Delhi'})
  city: string;

  @ApiProperty({example: 'India'})
  country: string;

  @ApiProperty({example: 'Delhi'})
  state: string;

  @ApiProperty({example: '133002'})
  postalcode: string;
}
