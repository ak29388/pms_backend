import {
    IsNotEmpty,
    IsEmail,
    MinLength,
    MaxLength,
    IsEnum,
    IsDate,
  } from 'class-validator';
  import { EmployeeGender, EMP_Status, Role } from 'src/typeOrm/employee.entity';
  import { ApiProperty } from '@nestjs/swagger';
  import { Department } from 'src/helpers/constants';
  import { Designation } from 'src/typeOrm/jobDetail.entity';
  
  export class EmployeeUpdate {
  
    @ApiProperty({
      example : 'SFS2004'
    })
    @IsNotEmpty()
    emp_id : string;
  
  
    @ApiProperty({ example: 'rahul' })
    @IsNotEmpty({ message: 'name should not be empty' })
    first_name: string;
  
    @IsNotEmpty({ message: 'name should not be empty' })
    @ApiProperty({ example: 'sharma' })
    last_name: string;
  
    @ApiProperty({ example: 'image.jpg' })
    profile_image: string;
  
    @ApiProperty({ example: 'SFS2021' })
    old_id: string;
  
    @ApiProperty({ example: '2' })
    @IsEnum(Role)
    role: Role;
  
    @IsEnum(EmployeeGender)
    @ApiProperty({ example: 'man' })
    gender: EmployeeGender;
  
    @ApiProperty({ example: 'single' })
    martial_status: string;
  
    @ApiProperty({ example: '02/11/1997' })
    date_of_birth: string;
  
    @ApiProperty({ example: 'ab+' })
    blood_group: string;
  
    @ApiProperty({ example: '5855888566' })
    @IsNotEmpty({ message: 'Contact_no should not be empty' })
    @MaxLength(20)
    @MinLength(10)
    contact_number: string;
  
    @ApiProperty({ example: '5855888566' })
    @IsNotEmpty({ message: 'Contact_no should not be empty' })
    @MaxLength(20)
    @MinLength(10)
    emergency_contact_number: string;
  
    @ApiProperty({ example: '5855888566' })
    @MaxLength(20)
    @MinLength(10)
    whatsapp_number: string;
  
    @ApiProperty({ example: 'rahul.sharma@yopmail.com' })
    @IsEmail()
    @IsNotEmpty({ message: 'Email should not be empty' })
    email: string;
  
    @ApiProperty({ example: 'dsdsid44' })
    udid: string;
  
    @ApiProperty({
      example: 'DZLPA88566',
    })
    pan_no: string;
  
    @ApiProperty({ example: '2' })
    designation: string;
  
    @ApiProperty({ example: '2' })
    department: string;
  
    @ApiProperty({ example: 'sfs.rahul23@yopmail.com' })
    official_email: string;
  
    @ApiProperty({
      example : 'Address of current'
    })
    cu_address_line_one : string;
  
    @ApiProperty({
      example : 'Address of current line 2'
    })
    cu_address_line_two : string;
  
    @ApiProperty({
      example : 'city'
    })
    cu_city : string;
  
    @ApiProperty({
      example : 'country'
    })
    cu_country : string;
  
    @ApiProperty({
      example : 'state of india'
    })
    cu_state : string;
  
    @ApiProperty({
      example : '133002'
    })
    cu_postalcode : string;
  
    @ApiProperty({
      example : 'Address of current'
    })
    P_address_line_one : string;
  
    @ApiProperty({
      example : 'Address of current line 2'
    })
    P_address_line_two : string;
  
    @ApiProperty({
      example : 'city'
    })
    P_city : string;
  
    @ApiProperty({
      example : 'country'
    })
    P_country : string;
  
    @ApiProperty({
      example : 'state of india'
    })
    P_state : string;
  
    @ApiProperty({
      example : '133002'
    })
    P_postalcode : string;
  
    @ApiProperty({
       example : true 
    })
    isSameAddress : boolean ;

    @ApiProperty({ example : '21'})
    currentAddressId : number;

    @ApiProperty({ example : '22'})
    permanentAddressId : number;
  }
  