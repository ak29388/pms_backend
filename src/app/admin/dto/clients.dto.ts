import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class Client {

    @ApiProperty({ example: 'Joshesp' })
    @IsNotEmpty()
    name: string;

    @ApiProperty({ example: 'Joshesp02@yopmail.com' })
    @IsEmail()
    email: string;

    @ApiProperty({ example: '7878787878' })
    @IsNotEmpty()
    contact: string;

    @ApiProperty({ example: 'house no. 132 st. columbia'})
    @IsNotEmpty()
    address: string;

    @ApiProperty({ example: 'skype id'})
    skype_id?: string;

    @ApiProperty({ example: 'slack id'})
    slack_id?: string;
}