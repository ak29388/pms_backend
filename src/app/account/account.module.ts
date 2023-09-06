import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';

@Module({
  controllers: [AccountController],
  providers: [AccountService],
})
export class AccountModule {}
