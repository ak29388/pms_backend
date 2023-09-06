import { ApiProduces, ApiProperty } from "@nestjs/swagger";
import { isEmail, IsEnum, IsNotEmpty } from "class-validator";
import { Project_roles } from "src/typeOrm";
import { Role } from "src/typeOrm/admin.entity";
import { EMP_Status } from "src/typeOrm/employee.entity";
import { Roles } from "src/typeOrm/roles.entity";

export class CreateAdmin {

    @ApiProperty({
        example : 'Jid city'
    })
    @IsNotEmpty()
    name : string ;

    @ApiProperty({
        example : 'Jidcity@yopmail.com'
    })
    @IsNotEmpty()
    email : string ;

    @ApiProperty({
        example : 'Sub-Admin-HR'
    })
    @IsNotEmpty()
    @IsEnum(Role)
    role : string ;

    @ApiProperty({
        example : 'Admin02'
    })
    @IsNotEmpty()
    password : string ;


    @ApiProperty({
        example : 'Admin02.jpg'
    })
    image_url : string ;

}