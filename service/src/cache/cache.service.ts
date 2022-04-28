import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { ProfileDto } from 'src/dtos/Profile.dto';

@Injectable()
export class RedisCacheService {
  constructor(@Inject(CACHE_MANAGER) private readonly cache: Cache) {}

  async get(key: number): Promise<ProfileDto> {
    return await this.cache.get(key);
  }

  async set(key: number, value: ProfileDto) {
    await this.cache.set(key, value, 1000);
  }
}
