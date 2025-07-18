import {hashSync} from 'bcrypt-ts';
import {v4 as uuidv4} from 'uuid';

const NO_OF_SALT_ROUNDS = 10;

export const getRandomUUID = () => {
  return uuidv4();
};

export const getEncryptedString = (plainText: string) => {
  return hashSync(plainText, NO_OF_SALT_ROUNDS);
};
