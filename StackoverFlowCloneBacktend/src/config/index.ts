import dotenv from 'dotenv';

dotenv.config();

const getEnvVariable = (key: string): string => {
  const value = process.env[key];
  if (!value && process.env.NODE_ENV === 'production') {
    throw new Error(`ENVIRONMENT VARIABLE '${key}' NOT SPECIFIED.`);
  }
  return value as string;
};

const config = {
  DB: {
    HOST: getEnvVariable('HOST'),
    PORT: getEnvVariable('DATABASE_PORT'),
    USER: getEnvVariable('USER'),
    DATABASE: getEnvVariable('DATABASE'),
    PASSWORD: getEnvVariable('PASSWORD'),
  },
  JWT: {
    SECRET: getEnvVariable('JWT_SECRET'),
    EXPIRES_IN: +getEnvVariable('JWT_EXPIRES_IN'),
  },
};

export default config;
