import { ApiProperty } from '@nestjs/swagger';

export class MilestonePriority {

@ApiProperty({example: '2'})
priority: string;

}