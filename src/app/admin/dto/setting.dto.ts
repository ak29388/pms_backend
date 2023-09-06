import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class Settings_Admin {

    @ApiProperty(
        {
            type: [String],
            example: [
                {
                    emp_id: 'SFS2074',
                    read: 'true',
                    write: 'true',
                    create: 'true',
                    delete: 'true',
                    fullAccess: 'true',
                }
            ],
        })
    @IsNotEmpty({ message: 'This column cannot be empty' })
    employee: [];

}