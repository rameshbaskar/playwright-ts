import {hashSync} from 'bcrypt-ts';

const NO_OF_SALT_ROUNDS = 10;

export const getEncryptedString = (plainText: string) => {
  return hashSync(plainText, NO_OF_SALT_ROUNDS);
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
