import { ApiProperty } from '@nestjs/swagger';
import { MilestoneLinksStatus } from 'src/helpers/constants';

export class MilestoneLinks {
  @ApiProperty({example: 'Invision'})
  link_type: string;

  @ApiProperty({example: 'www.url.com'})
  link_url: string;

  @ApiProperty({example: 'Active'})
  status: MilestoneLinksStatus;
}
