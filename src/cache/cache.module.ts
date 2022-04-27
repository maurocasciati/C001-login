import { CacheModule, Module } from '@nestjs/common';
import { RedisCacheService } from './cache.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as redisStore from 'cache-manager-redis-store';

@Module({
  imports: [
    CacheModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        // TODO: Fix config file
        store: redisStore,
        host: 'redis',
        port: '6379',
        ttl: 60,
      })
    })
  ],
  providers: [RedisCacheService],
  exports: [RedisCacheService]
})
export class RedisCacheModule {}
