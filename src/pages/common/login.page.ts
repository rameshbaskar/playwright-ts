import {User} from '@src/core/types';
import Element from '@src/core/element';

const usernameTextBox = new Element('username-text-box');
const passwordTextBox = new Element('password-text-box');
const submitButton = new Element('button[type=submit]');

export const verifyLoaded = async () => {
  await usernameTextBox.verifyVisibility(true);
  await passwordTextBox.verifyVisibility(true);
  await submitButton.verifyVisibility(true);
  await submitButton.verifyContainsText('Login');
};

export const login = async (user: User) => {
  await usernameTextBox.fill(user.username);
  await passwordTextBox.fill(user.password);
  await submitButton.click();
};
