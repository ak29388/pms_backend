import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsNotEmpty, IsUrl } from 'class-validator';
import { Document_type } from 'src/helpers/constants';

export class Request_Module {
  @ApiProperty({ example: 'Title_module' })
  @IsNotEmpty({ message: 'Title should not be empty' })
  title: string;

  @ApiProperty({
    type: [String],
    example: [
      {
        link_title: '1',
        link_url: 'www.url.com'
      },
    ],
  })
  @IsEnum(Document_type)
  links: [];

  @ApiProperty({ example: 'true' })
  @IsBoolean()
  client_approved;

  @ApiProperty({ example: '4hrs' })
  no_of_hours: string;

  @ApiProperty({ example: 'Title_module description' })
  description: string;


}
