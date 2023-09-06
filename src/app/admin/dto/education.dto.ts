import { ApiProperty } from '@nestjs/swagger';

export class Education {
   @ApiProperty({example: 'Btech'})
  qualification: string;

  @ApiProperty({example: 'Computer science'})
  field_of_education: string;

  @ApiProperty({example: '2019'})
  completion_year: string;

  @ApiProperty({example: 'Bachelors'})
  education_type: string;

  @ApiProperty({example: '60%'})
  result: string;
}
