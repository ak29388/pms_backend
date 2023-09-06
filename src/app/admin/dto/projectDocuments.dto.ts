import { ApiProperty } from '@nestjs/swagger';
import { Document_type } from 'src/helpers/constants';

export class ProjectDocument {
  @ApiProperty({example : 'Privacy Policy'})
  document_type: Document_type;

  @ApiProperty({example : 'www.url.com'})
  document_url: string;
}
