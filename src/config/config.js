import dotenv from 'dotenv';

dotenv.config();

const {
  MYSQL_DB,
  MYSQL_USER,
  MYSQL_PASS,
  MYSQL_HOST,
  MYSQL_PORT,
  DIALECT,
  SERVER_PORT,
  SERVER_HOST,
  SUPABASE_URL,
  SUPABASE_API_KEY,
} = process.env;

const config = {
  MYSQL_DB,
  MYSQL_USER,
  MYSQL_PASS,
  MYSQL_HOST,
  MYSQL_PORT,
  DIALECT,
  SERVER_PORT,
  SERVER_HOST,
  SUPABASE_URL,
  SUPABASE_API_KEY,
};

export default config;
