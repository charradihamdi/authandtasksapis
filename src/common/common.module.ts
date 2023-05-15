import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './../auth/auth.module';
import { ConfigServiceRoot } from './configurations';
import { Module, Global } from '@nestjs/common';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      load: [],
    }),
  ],
  providers: [ConfigServiceRoot],
  exports: [ConfigServiceRoot],
})
export class CommonModule {}
