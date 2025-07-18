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
