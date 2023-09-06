import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Request,
  Res,
} from '@nestjs/common';
import express, { Response } from 'express';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ServerResponse } from 'http';
import { Login } from 'src/app/auth/dto/login.dto';
import { messages } from 'src/helpers/message';
import { ForgetPassword } from '../admin/dto/forgetPassword.dto';
import { AuthService } from './auth.service';
import { CreateAdmin } from './dto/createAdmin.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) { }

  @ApiOperation({ summary: messages.LOGIN })
  @ApiResponse({ status: 200, description: messages.ADMIN_LOGGEDIN })
  @HttpCode(200)
  @Post('/login')

  async adminLogin(@Body() body: Login,
    @Res({ passthrough: true }) res: Response,
  ) {
    try {

      
      const data = await this.authService.logIn(body);
      if (data) {
        return data;
      }
      else {
        return {
          status: 500,
          message: messages.SOMETHING_WENT_WRONG
        }
      }
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @ApiOperation({ summary: messages.FORGET_PASSWORD })
  @ApiResponse({ status: 200, description: messages.PASSWORD_UPDATED })
  @ApiResponse({ status: 400, description: messages.BAD_REQUEST })
  @ApiParam({
    type: 'string',
    name: 'id',
    required: true,
  })
  @Put('/forgot-password/:id')
  async forgetPassword(@Param() id, @Body() body: ForgetPassword) {
    try {
      return await this.authService.forgetPassword(id, body);
    } catch (error) {
      throw error;
    }
  }


  @ApiOperation({ summary: messages.CREATE_ADMIN })
  @ApiResponse({
    status: 200,
    description: messages.ADMIN_CRAETED
  })
  @ApiResponse({
    status: 400,
    description: messages.BAD_REQUEST
  })
  @Post('admin-signUp')
  async createAdmin(@Body() body :CreateAdmin) {
    try {
      const createAdmin = await this.authService.createAdmin(body);
      return createAdmin ;
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }


 


}
