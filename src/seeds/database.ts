import {DatabaseStatement} from '@src/core/types';
import {Client} from 'pg';

export default class Database {
  statements!: DatabaseStatement[];

  constructor() {
    this.resetStatements();
  }

  resetStatements() {
    this.statements = [];
  }

	addStatement(statement: DatabaseStatement) {
		this.statements.push(statement);
	}

  getClient() {
    return new Client({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });
  }

  async read(statement: DatabaseStatement) {
    const client = this.getClient();
		try {
			const result = await client.query(statement.sql, statement.params);
			return result.rows;
    } catch (e) {
			throw e;
		} finally {
			await client.end();
		}
  }

	async write() {
		const client = this.getClient();
		try {
			await client.query('BEGIN');
			for (const statement of this.statements) {
				await client.query(statement.sql, statement.params);
			}
			await client.query('COMMIT');
		} catch (e) {
			await client.query('ROLLBACK');
			throw e;
		} finally {
			await client.end();
		}
	}
}
