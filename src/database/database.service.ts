import { Inject, Injectable } from '@nestjs/common';
import { Pool, QueryResult } from 'pg';
import { CreateUserRequest } from 'src/dtos/CreateUserRequest.dto';

@Injectable()
export class DatabaseService {
  constructor(@Inject('DATABASE_PROVIDER') private pool: Pool) {}

  private executeQuery(queryText: string, values: any[] = []): Promise<any[]> {
    return this.pool.query(queryText, values).then((result: QueryResult) => {
      return result.rows;
    });
  }

  private async getLastCreatedId(tableName: string): Promise<number> {
    const query = `SELECT id FROM db.${tableName} ORDER BY id DESC LIMIT 1`;
    const results = await this.executeQuery(query);
    return results[0].id as Promise<number>;
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

  async createAddress(street: string, cityId: number): Promise<number> {
    const insertQuery = `INSERT INTO db.address (cityId, street) VALUES ($1, $2);`;
    await this.executeQuery(insertQuery, [cityId, street]);

    return await this.getLastCreatedId('address');
  }

  async createProfile(name: string, userId: number, addressId: number): Promise<number> {
    const insertQuery = `INSERT INTO db.profile (userId, addressId, name) VALUES ($1, $2, $3);`;
    await this.executeQuery(insertQuery, [userId, addressId, name]);

    return await this.getLastCreatedId('profile');
  }

  async createUser(request: CreateUserRequest) {
    const insertQuery = `INSERT INTO db.user (username, password) VALUES ($1, $2);`;
    await this.executeQuery(insertQuery, [request.username, request.password]);

    return await this.getLastCreatedId('user');
  }
}
