import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtAuthGuard } from './auth/auth.guard';
import { AuthHeader } from './decorators/authHeader.decorator';
import { UserBody } from './decorators/userBody.decorator';
import { CreateUserRequest } from './dtos/CreateUserRequest.dto';
import { UserValidator } from './pipes/userValidator.pipe';

@Controller('/api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/users')
  postUser(@UserBody(new UserValidator()) createUserRequest: CreateUserRequest) {
    this.appService.createUser(createUserRequest);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  getUserProfile(@AuthHeader('userId') userId: number) {
    return this.appService.getUserProfileById(userId);
  }
}
