import {hashSync} from 'bcrypt-ts';
import {v4 as uuidv4} from 'uuid';

const NO_OF_SALT_ROUNDS = 10;

export const getRandomUUID = () => {
  return uuidv4();
};

export const getEncryptedString = (plainText: string) => {
  return hashSync(plainText, NO_OF_SALT_ROUNDS);
};

export const sleep = async (timeInMs: number) => {
  // eslint-disable-next-line no-undef
  await new Promise((resolve) => setTimeout(resolve, timeInMs));
};

export const deepClone = (origObj: unknown) => {
  return JSON.parse(JSON.stringify(origObj));
};

export const getSubsetFromArray = (arr: unknown[], numOfItems: number, startingIndex = 0) => {
  if (numOfItems > arr.length) {
    throw new Error(`Number of items: ${numOfItems} is more than the array length: ${arr.length}`);
  }
  return arr.slice(startingIndex, numOfItems + startingIndex);
};

export const sanitiseDatabaseParam = (val?: string) => {
  return val ? `'${val}'` : 'NULL';
};
