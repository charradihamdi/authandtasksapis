import * as yaml from 'js-yaml';
import { join } from 'path';
import { readFileSync } from 'fs';

const YAML_CONFIGURATION = 'config.yaml';

// export default () => {
//   return yaml.load(
//     readFileSync(join(__dirname, './config.yaml'), 'utf8'),
//   ) as Record<string, any>;
// };
export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    host: process.env.DB_URI,
    port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
  },
});
