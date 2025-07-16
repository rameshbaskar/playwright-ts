import { closePool } from '~/core/database';

async function globalTeardown() {
  await closePool();
}

export default globalTeardown;
