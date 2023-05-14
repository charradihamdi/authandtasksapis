import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { LoggerMiddleware } from './logger/logger.middleware';
import { AuthController } from './auth/auth.controller';
import { CatsModule } from './cats/cats.module';
import { CatsController } from './cats/cats.controller';
import { TasksModule } from './tasks/tasks.module';
import { CacheModule } from '@nestjs/cache-manager';
import { apiTokenCheck } from './middlware/token.Middlware';
import { ConfigServiceRoot } from './config/configurations';
import databaseConfig from './config/database.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { TasksController } from './tasks/tasks.controller';
import { CommonModule } from 'common/common.module';
import { UploadsModule } from './uploads/uploads.module';
import { typeOrmConfig } from './type-orm.config';
@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),

    CacheModule.register(),
    MongooseModule.forRoot(process.env.DB_URI),
    AuthModule,
    CatsModule,
    TasksModule,
    CommonModule,
    UploadsModule,
  ],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes(
        { path: '*', method: RequestMethod.ALL },
        CatsController,
        TasksController,
      );
  }
}
