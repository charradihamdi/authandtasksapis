import { ConfigModule } from '@nestjs/config';
import {
  TypeOrmModuleOptions,
  TypeOrmModuleAsyncOptions,
} from '@nestjs/typeorm';
import { ConfigServiceRoot } from 'common/configurations';

// export const typeOrmConfig: TypeOrmModuleOptions = {
//   type: 'postgres',
//   host: '127.0.0.1',
//   port: 5444,
//   username: 'postgres',
//   password: '123456',
//   database: 'tasks',
//   entities: ['dist/**/*.entity{.ts,.js}'],
//   //entities: [Task, User],
//   synchronize: true,
// };

export default class typeOrmConfig {
  static getOrmConfig(configService: ConfigServiceRoot): TypeOrmModuleOptions {
    return;
    ({
      type: 'postgres',
      host: configService.port,
      port: configService.port,
      username: configService.username,
      password: configService.password,
      database: configService.db,
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
    });
  }
}

export const TpeOrmConfigAsync: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: async (
    configService: ConfigServiceRoot,
  ): Promise<TypeOrmModuleOptions> => typeOrmConfig.getOrmConfig(configService),
  inject: [ConfigServiceRoot],
};
