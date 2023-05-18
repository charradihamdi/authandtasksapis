import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { JwtPayload } from './jwt-payload-interface';
import { UserRepository } from './user.repository';
import { User } from './user.entity';
import { ConfigServiceRoot } from 'common/configurations';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'access_token') {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private confiService: ConfigServiceRoot,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: confiService.jwtsecret,
    });
  }

  async validate({ username }: JwtPayload): Promise<User> {
    const user = await this.userRepository.findOneBy({ username });
    console.log('user', user);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
