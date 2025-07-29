import {cleanEnv, url, str, port, bool} from 'envalid';

const env = cleanEnv(process.env, {
  FULLY_PARALLEL: bool({default: false}),
  CI: bool({default: false}),
  BASE_URL: url(),
  LOGIN_API_URL: url(),
  DB_HOST: str(),
  DB_PORT: port({default: 5432}),
  DB_NAME: str(),
  DB_USER: str(),
  DB_PASSWORD: str(),
});

export default env;
