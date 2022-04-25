import { Inject, Injectable } from '@nestjs/common';
import { Pool, QueryResult } from 'pg';
import { CreateUserRequest } from 'src/dtos/CreateUserRequest.dto';

@Injectable()
export class DatabaseService {
  constructor(@Inject('DATABASE_PROVIDER') private pool: Pool) {}
}
