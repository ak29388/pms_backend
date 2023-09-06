import { ApiProperty } from '@nestjs/swagger';

export class MilestoneStatus {
  @ApiProperty({example: '1'})
  status: string;


}
