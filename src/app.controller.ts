import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { UserBody } from './decorators/userBody.decorator';
import { CreateUserRequest } from './dtos/CreateUserRequest.dto';
import { UserValidator } from './pipes/userValidator.pipe';

@Controller('/api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/hello')
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/users')
  postUser(
    @UserBody(new UserValidator()) createUserRequest: CreateUserRequest){
    console.log(createUserRequest)
  }
}
