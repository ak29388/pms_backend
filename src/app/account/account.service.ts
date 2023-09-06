import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

@Injectable()
export class AccountService {
  constructor() {}

  async createAccount(body) {
    try {
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
