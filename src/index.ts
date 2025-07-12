import Database from './database';

async function main() {
  console.log('🚀 Starting Playwright TypeScript application with PostgreSQL connection pooling');

  const db = Database.getInstance();

  try {
    console.log('📊 Database pool stats:');
    console.log(`Total connections: ${db.totalCount}`);
    console.log(`Idle connections: ${db.idleCount}`);
    console.log(`Waiting connections: ${db.waitingCount}`);

    // Example database query
    const result = await db.query<{ current_time: Date }>('SELECT NOW() as current_time');
    console.log('⏰ Current database time:', result[0].current_time);
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    console.log('💡 Make sure PostgreSQL is running and environment variables are set correctly');
  } finally {
    await db.close();
    console.log('🔒 Database connection closed');
  }
}

if (require.main === module) {
  main().catch(console.error);
}

export { Database };
