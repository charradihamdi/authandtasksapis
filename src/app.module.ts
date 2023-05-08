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
import { Tesks } from './tesks/tesks';
import { apiTokenCheck } from './middlware/token.Middlware';
import configuration from './config/configurations';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      load: [configuration],
    }),
    MongooseModule.forRoot(process.env.DB_URI),
    AuthModule,
    CatsModule,
    TasksModule,
  ],
  providers: [Tesks],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(apiTokenCheck)
      //*.exclude({path:'cats',method : RequestMethod.GET})
      .forRoutes({ path: '*', method: RequestMethod.ALL }, CatsController);
  }
}
