import { Controller, Post } from '@nestjs/common';
import { OwnBody } from 'src/decorators/ownBody.decorator';
import { LoginRequestDto } from 'src/dtos/LoginRequest.dto';
import { BodyValidator } from 'src/pipes/BodyValidator.pipe';

import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  login(@OwnBody(new BodyValidator()) loginRequestDto: LoginRequestDto) {
    return this.authService.login(loginRequestDto);
  }
}