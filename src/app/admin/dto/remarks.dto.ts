import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class Remarks {

    @ApiProperty({example : 'Remarks towards the employee'})
    @IsNotEmpty({message : 'Please enter remarks'})
    remarks : string
}