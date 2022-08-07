import { Inject, Injectable } from '@nestjs/common';
import { use } from 'passport';
import { Pool, QueryResult } from 'pg';
import { CreateUserRequest } from 'src/dtos/CreateUserRequest.dto';
import { ProfileDto } from 'src/dtos/Profile.dto';
import { ProfileEntity } from 'src/dtos/ProfileEntity.dto';
import { UserEntity } from 'src/dtos/UserEntity.dto';

@Injectable()
export class DatabaseService {
  constructor(@Inject('DATABASE_PROVIDER') private pool: Pool) {}

  private async executeQuery(queryText: string, values: any[] = []): Promise<any[]> {
    const queryResult: QueryResult = await this.pool.query(queryText, values);
    return queryResult.rows;
  }

  async getCityById(cityId: number): Promise<any> | null {
    const query = `
      SELECT *
      FROM db.city
      WHERE id = $1
    `;
    const results = await this.executeQuery(query, [cityId]);
    return results[0] as Promise<any>;
  }

  async createUser(request: CreateUserRequest) {
    try {
      await this.executeQuery('BEGIN')

      const insertAddressQueryResults = await this.executeQuery(
        'INSERT INTO db.address (cityId, street) VALUES ($1, $2) RETURNING id',
        [request.cityId, request.address]
      );
      const insertUserQueryResults = await this.executeQuery(
        'INSERT INTO db.user (username, password) VALUES ($1, $2) RETURNING id',
        [request.username, request.password]
      );
      
      await this.executeQuery(
        'INSERT INTO db.profile (userId, addressId, name) VALUES ($1, $2, $3)',
        [insertUserQueryResults[0].id, insertAddressQueryResults[0].id, request.name]
      );
      await this.executeQuery('COMMIT');
    } catch (error) {
      await this.executeQuery('ROLLBACK');
      throw error;
    }
  }

  async getUser(username: string): Promise<UserEntity> {
    const query = `
      SELECT *
      FROM db.user
      WHERE username = $1
    `;
    const results = await this.executeQuery(query, [username]);
    return results[0];
  }

  async getUserProfileById(userId: number): Promise<ProfileDto> {
    const query = `
      SELECT db.profile.userId AS id, db.profile.name, db.address.street, db.city.name AS city, db.country.name AS country
      FROM db.profile
      LEFT JOIN db.address ON db.address.id = db.profile.addressId
      LEFT JOIN db.city ON db.city.id = db.address.cityId
      LEFT JOIN db.country ON db.country.id = db.city.countryId
      WHERE db.profile.userId = $1
    `;
    const results = await this.executeQuery(query, [userId]);
    return new ProfileDto(results[0] as ProfileEntity);
  }
}
