import { ConfigService } from '@nestjs/config';
import * as yaml from 'js-yaml';
import { join } from 'path';
import { readFileSync } from 'fs';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { isNil, toNumber } from 'lodash';
import { isNumberString } from 'class-validator';
const YAML_CONFIGURATION = 'config.yaml';

// export default () => {
//   return yaml.load(
//     readFileSync(join(__dirname, './config.yaml'), 'utf8'),
//   ) as Record<string, any>;
// };
@Injectable()
export class ConfigServiceRoot {
  constructor(private readonly configService: ConfigService) {}
  private readonly logger = new Logger(ConfigServiceRoot.name);

  private get(key: string, optional = false): string | undefined {
    try {
      const value = this.configService.get<string>(key);
      if (!optional && (isNil(value) || !value.length)) {
        throw new Error(key + ' environment variable is not set');
      }

      return value;
    } catch (error) {
      this.logger.error(error);
      process.exit();
    }
  }

  private getNumber(key: string, optional = false): number | undefined {
    try {
      const value = this.get(key);

      if (value && !isNumberString(value)) {
        throw new Error(key + ' environment variable is not a number');
      }

      return value ? toNumber(value) : undefined;
    } catch (error) {
      this.logger.error(error);
      process.exit();
    }
  }
  private getBoolean(key: string): boolean {
    const value = this.get(key);

    return value === 'true' || value === '1';
  }
  private getString(key: string, optional = false): string | undefined {
    const value = this.get(key, optional);

    return value ? value.replace(/\\n/g, '\n') : undefined;
  }

  get test() {
    return {
      port: this.getNumber('PORT') || 3000,
    };
  }

  get host() {
    return {
      uri: this.getString('DB_HOST'),
    };
  }
}
