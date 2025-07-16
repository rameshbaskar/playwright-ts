import {createPool} from '~/core/database';

function globalSetup() {
  createPool();
}

export default globalSetup;
