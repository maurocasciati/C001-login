import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RedisCacheService } from './cache/cache.service';
import { DatabaseService } from './database/database.service';
import { CreateUserRequest } from './dtos/CreateUserRequest.dto';
import { ProfileDto } from './dtos/Profile.dto';

@Injectable()
export class AppService {
  constructor(
    private readonly dbconnection: DatabaseService,
    private readonly cache: RedisCacheService,
  ) {}

  async createUser(request: CreateUserRequest) {
    try {
      const city = await this.dbconnection.getCityById(request.cityId);
      if (!city) {
        throw new HttpException(`City with id ${request.cityId} does not exist`, HttpStatus.NOT_FOUND);
      }

      const userId = await this.dbconnection.createUser(request);
      const addressId = await this.dbconnection.createAddress(request.address, request.cityId);
      await this.dbconnection.createProfile(request.name, userId, addressId);
    } catch(error) {
      // TODO: Log error using a logger service (like nestjs built in pino logger)
      throw new HttpException('An error ocurred. Please contact support', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getUserProfileById(userId: number): Promise<ProfileDto> {
    return await this.cache.get(userId) || await this.getUserProfileFromDB(userId);
  }

  private async getUserProfileFromDB(userId): Promise<ProfileDto> {
    return this.dbconnection.getUserProfileById(userId)
      .then(profileDto => {
        this.cache.set(userId, profileDto);
        console.log('Fetching user profile from DB');
        return profileDto;
      })
  }
}
