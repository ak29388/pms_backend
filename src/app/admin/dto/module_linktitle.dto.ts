import { ApiProperty } from '@nestjs/swagger';

export class ModuleLinkTitle {
  @ApiProperty({example: '1'})
  link_title: string;
}