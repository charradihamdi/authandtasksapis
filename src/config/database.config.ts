import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  host: process.env.DB_URI,
  port: process.env.DATABASE_PORT || 5432,
}));
