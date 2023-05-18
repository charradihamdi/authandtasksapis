import { Module, Global } from '@nestjs/common';
import * as config from 'config';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { UserRepository } from './user.repository';
import { RefreshJwtStrategy } from './refreshToken.strategy';
import { AccessJwtStrategy } from './accesstoken.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      global: true,
      secret: 'process.env.JWT_SECRET',
      signOptions: {
        expiresIn: 30000,
      },
    }),
    TypeOrmModule.forFeature([UserRepository]),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    AccessJwtStrategy,
    UserRepository,
    RefreshJwtStrategy,
  ],
  exports: [AccessJwtStrategy, PassportModule, AuthService],
})
export class AuthModule {}
