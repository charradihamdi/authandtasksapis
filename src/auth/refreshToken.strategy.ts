import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { JwtPayload } from './jwt-payload-interface';
import { UserRepository } from './user.repository';
import { User } from './user.entity';
import { ConfigServiceRoot } from 'common/configurations';
import { Request } from 'express';
@Injectable()
export class RefreshJwtStrategy extends PassportStrategy(
  Strategy,
  'refreshtoken',
) {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private confiService: ConfigServiceRoot,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
          return req.body.refreshToken?.token;
        },
      ]),

      //secretOrKey: confiService.rtSecret,
      passReqToCallback: true,
    });
  }

  async validate({ username }: JwtPayload): Promise<User> {
    const user = await this.userRepository.findOneBy({ username });
    if (!user) {
      throw new NotFoundException(
        `refresh token not assigned to this use : ${username}`,
      );
    }
    return user;
  }
}
