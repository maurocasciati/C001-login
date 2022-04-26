import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DatabaseService } from 'src/database/database.service';
import { LoginRequestDto } from 'src/dtos/LoginRequest.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly dbconnection: DatabaseService,
    private jwtService: JwtService,
  ) {}

  async login(request: LoginRequestDto) {
    const userId = await this.getValidatedUserId(request);

    const payload = {
        userId: userId,
      };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async getValidatedUserId(request: LoginRequestDto): Promise<number> {
    const { username, password } = request;

    const user = await this.dbconnection.getUser(username);
    if (user.password != password) {
      throw new UnauthorizedException();
    }

    return user.id;
  }
}