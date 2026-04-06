import Database from '@support/core/database';
import {User} from '@support/core/types';
import {getValidUser} from '@support/seeds/factories/user.factory';
import * as falso from '@ngneat/falso';

export default class UserSeed extends Database {
  async createUser(user?: User) {
    this.resetStatements();

    // Step 1: Get a fresh user profile data
    user = user || getValidUser();

    // Step 2: Insert into 'users' table
    this.addStatement({
      sql: `INSERT INTO users (
							guid,
							username,
							enc_password,
							full_name,
							email,
							created_at,
							modified_at
						) VALUES (
							$1,
							$2,
							$3,
							$4,
							$5,
							CURRENT_TIMESTAMP,
							CURRENT_TIMESTAMP
						)`,
      params: [user.guid, user.username, user.encPassword, user.fullName, user.email],
    });

    // Step 3: Insert into 'contact_numbers' table
    this.addStatement({
      sql: `INSERT INTO user_contact_numbers (
							uuid,
							guid,
							contact_number,
							contact_number_type,
							created_at,
							modified_at
						) VALUES (
							$1,
							$2,
							$3,
							'MOBILE',
							CURRENT_TIMESTAMP,
							CURRENT_TIMESTAMP
						)`,
      params: [falso.randUuid(), user.guid, user.mobile],
    });

    await this.write();
    return user;
  }

  async deleteUser(user: User) {
    this.resetStatements();

    // Step 1: Delete from 'contact_numbers' table
    this.addStatement({
      sql: `DELETE FROM contact_numbers WHERE guid = $1`,
      params: [user.guid],
    });

    // Step 2: Delete from 'users' table
    this.addStatement({
      sql: `DELETE FROM users WHERE guid = $1`,
      params: [user.guid],
    });

    await this.write();
  }
}
