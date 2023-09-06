import { ApiProperty } from "@nestjs/swagger";
import { IsEmail } from "class-validator";

export class ClientUpdate {

    @ApiProperty({ example: 'Joshesp' })
    name: string;

    @ApiProperty({ example: 'Joshesp02@yopmail.com' })
    @IsEmail()
    email: string;

    @ApiProperty({ example: '7878787878' })
    contact: string;

    @ApiProperty({ example: 'house no. 132 st. columbia'})
    address: string;

    @ApiProperty({ example: 'skype id'})
    skype_id?: string;

    @ApiProperty({ example: 'slack id'})
    slack_id?: string;
}