import {createPool} from '@src/core/database';

const REQUIRED_ENV_VARS = ['BASE_URL', 'DB_HOST', 'DB_USER', 'DB_PASSWORD', 'DB_NAME'];

const validateEnvironment = () => {
  const invalidVars = REQUIRED_ENV_VARS.filter((v) => !process.env[v]?.trim());
  if (invalidVars.length > 0) {
    throw new Error(`The following environment variables are not defined:\n[${invalidVars.join(',')}]`);
  }
};

function globalSetup() {
  validateEnvironment();
  createPool();
}

export default globalSetup;
