import { NotFoundException } from '@nestjs/common';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { User } from './user.entity';

@Injectable()
export class RefreshGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<any> {
    try {
      const request = context.switchToHttp().getRequest();
      const token = request?.body?.rt;

      if (!token) {
        throw new UnauthorizedException();
      }

      const payload = await this.jwtService.verify(token, {
        secret: 'rtoken',
      });
      const { username } = payload;
      request['username'] = payload;
      const user = await User.findOneBy({ username });
      if (!user) throw new NotFoundException();
      request.user = user;
      return request.user;
    } catch {
      throw new UnauthorizedException();
    }
  }
}
