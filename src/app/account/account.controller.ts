import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Post,
  Request,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AccountService } from './account.service';
import { Account } from './dto/account.dto';

@Controller('account')
@ApiTags('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @ApiOperation({ summary: 'Create Account' })
  @ApiResponse({
    status: 200,
    description: 'Admin Created Successfully',
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  // @Post('/create-account')
  @HttpCode(200)
  async createAdmin(@Request() req, @Body() body: Account) {
    try {
      await this.accountService.createAccount(body);
      return {
        status: 200,
        message: 'Admin Created successfully',
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
