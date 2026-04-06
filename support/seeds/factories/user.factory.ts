import {User} from '@support/core/types';
import {getEncryptedString} from '@support/core/utils';
import * as falso from '@ngneat/falso';

export const getValidUser = () => {
  const plainTextPassword = falso.randPassword();
  return {
    guid: falso.randUuid(),
    username: falso.randUserName({withAccents: false}),
    password: plainTextPassword,
    encPassword: getEncryptedString(plainTextPassword),
    fullName: falso.randFullName({withAccents: false}),
    email: falso.randEmail(),
    mobile: falso.randPhoneNumber({countryCode: 'SG'}),
  } as User;
};

export const getUserWithNoEmail = () => {
  const plainTextPassword = falso.randPassword();
  return {
    guid: falso.randUuid(),
    username: falso.randUserName({withAccents: false}),
    password: plainTextPassword,
    encPassword: getEncryptedString(plainTextPassword),
    fullName: falso.randFullName({withAccents: false}),
    mobile: falso.randPhoneNumber({countryCode: 'SG'}),
  } as User;
};

export const getUserWithNoMobileNumber = () => {
  const plainTextPassword = falso.randPassword();
  return {
    guid: falso.randUuid(),
    username: falso.randUserName({withAccents: false}),
    password: plainTextPassword,
    encPassword: getEncryptedString(plainTextPassword),
    fullName: falso.randFullName({withAccents: false}),
    email: falso.randEmail(),
  } as User;
};
