import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { UserBody } from './decorators/userBody.decorator';
import { CreateUserRequest } from './dtos/CreateUserRequest.dto';
import { UserValidator } from './pipes/userValidator.pipe';

@Controller('/api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/users')
  postUser(
    @UserBody(new UserValidator()) createUserRequest: CreateUserRequest
  ) {
    this.appService.createUser(createUserRequest);
  }
}
