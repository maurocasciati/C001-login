import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { LoginRequestDto } from 'src/dtos/LoginRequest.dto';

import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  login(@Body() loginRequestDto: LoginRequestDto) {
    return this.authService.login(loginRequestDto);
  }
}