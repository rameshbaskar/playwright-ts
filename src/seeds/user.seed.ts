import {writeInTransaction} from '@src/core/database';
import {User, DatabaseStatement} from '@src/core/types';
import {getRandomUUID, getEncryptedString} from '@src/core/utils';
import * as falso from '@ngneat/falso';

const getNewUser = () => {
  const plainText = falso.randPassword();
  return {
    guid: getRandomUUID(),
    username: falso.randUserName({withAccents: false}),
    password: plainText,
    encPassword: getEncryptedString(plainText),
    fullName: falso.randFullName({withAccents: false}),
    email: falso.randEmail(),
    mobile: falso.randPhoneNumber({countryCode: 'SG'}),
  } as User;
};

export const createUser = async () => {
  const user = getNewUser();
  const statements: DatabaseStatement[] = [
    getInsertUsersTableStatement(user),
    getInsertContactNumbersTableStatement(user),
  ];
  await writeInTransaction(statements);
  return user;
};

const getInsertUsersTableStatement = (user: User) => {
  const sql = `INSERT INTO users (
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
  )`;
  return {
    sql: sql,
    params: [user.guid, user.username, user.encPassword, user.fullName, user.email],
  } as DatabaseStatement;
};

const getInsertContactNumbersTableStatement = (user: User) => {
  const sql = `INSERT INTO user_contact_numbers (
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
  )`;
  return {
    sql: sql,
    params: [getRandomUUID(), user.guid, user.mobile],
  } as DatabaseStatement;
};

export const deleteUser = async (user: User) => {
  const statements: DatabaseStatement[] = [
    {
      sql: 'DELETE FROM user_contact_numbers WHERE guid = $1',
      params: [user.guid],
    },
    {
      sql: 'DELETE FROM users WHERE guid = $1',
      params: [user.guid],
    },
  ];
  await writeInTransaction(statements);
};
