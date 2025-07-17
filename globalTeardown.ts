import {closePool} from '@src/core/database';

async function globalTeardown() {
  await closePool();
}

export default globalTeardown;
