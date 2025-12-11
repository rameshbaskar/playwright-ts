import {Page} from '@playwright/test';

export type User = {
  guid: string;
  username: string;
  password: string;
  encPassword?: string;
  fullName: string;
  email: string;
  mobile: string;
};

export type DatabaseStatement = {
  sql: string;
  params?: unknown[];
};

export type GAEvent = {
  event: string;
  event_action: string;
  event_category: string;
  event_label?: string;
};

export type Fixture = {
  page: Page;
  auth: {
    page: Page;
    user: User;
  };
};
