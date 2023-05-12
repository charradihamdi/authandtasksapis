import { TaskEntity } from './tasks/entity/task.entity';
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
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '127.0.0.1',
      port: 5444,
      username: 'postgres',
      password: '123456',
      database: 'tasks',
      entities: [TaskEntity],
      synchronize: true,
    }),

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
