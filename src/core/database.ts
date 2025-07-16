import {Pool} from 'pg';

let pool: Pool;

export const createPool = () => {
  pool = new Pool({
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT!),
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    max: 10, // maximum number of clients in the pool
    idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
    connectionTimeoutMillis: 2000, // how long to wait for a connection
  });
};

export const closePool = async () => {
  if (pool) {
    await pool.end();
  }
};

const getClient = async () => {
  if (!pool) {
    createPool();
  }
  const client = await pool.connect();
  client.on('error', err => {
    throw new Error(`Unexpected error on client: ${err}`);
  });
  return client;
};

export const read = async (sql: string, params?: unknown[]): Promise<unknown[]> => {
  const client = await getClient();
  try {
    const result = await client.query(sql, params);
    return result.rows;
  } finally {
    client.release();
  }
};

export const write = async (sql: string, params?: unknown[]): Promise<void> => {
  const client = await getClient();
  try {
    await client.query('BEGIN');
    await client.query(sql, params);
    await client.query('COMMIT');
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};
