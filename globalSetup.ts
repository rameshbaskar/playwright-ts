import {open} from 'fs/promises';

const validateEnvironment = async () => {
  const invalidVars = (await getRequiredEnvVars()).filter((v) => !process.env[v]?.trim());
  if (invalidVars.length > 0) {
    throw new Error(`The following environment variables are not defined:\n[${invalidVars.join(',')}]`);
  }
};

const getRequiredEnvVars = async () => {
  const requiredVars: string[] = [];
  const fileHandle = await open('.env.example', 'r');

  for await (const line of fileHandle.readLines()) {
    const trimmedLine = line.trim();

    // Ignore empty and commented lines
    if (trimmedLine && !trimmedLine.startsWith('#')) {
      const [envVar] = trimmedLine.split('=');
      requiredVars.push(envVar.trim());
    }
  }

  await fileHandle.close();
  return requiredVars;
};

async function globalSetup() {
  await validateEnvironment();
}

export default globalSetup;
