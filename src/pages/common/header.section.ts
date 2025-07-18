import Element from '@src/core/element';

// Elements
const logoEl = new Element('header-logo');
const homeLink = new Element('home-page-link');
const loginLink = new Element('login-link');
const logoutLink = new Element('logout-link');

// Actions and Validations
export const verifyLoaded = async () => {
  const elements = [logoEl, homeLink];
  for (const element of elements) {
    await element.verifyHasAttribute('href', process.env.BASE_URL!);
    await element.verifyHasAttribute('target', '_blank', false);
  }
};

export const verifyLoggedIn = async () => {
  await logoutLink.verifyVisibility(true);
  await loginLink.verifyVisibility(false);
};

export const verifyLoggedOut = async () => {
  await logoutLink.verifyVisibility(false);
  await loginLink.verifyVisibility(true);
};

export const clickLogin = async () => {
  await loginLink.click();
};

export const clickLogout = async () => {
  await logoutLink.click();
};
