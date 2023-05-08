import { NestMiddleware, BadRequestException } from '@nestjs/common';
import { NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';
export class apiTokenCheck implements NestMiddleware {
  constructor(private jwtService: JwtService) {}
  use(req: Request, res: Response, next: NextFunction) {
    try {
      const token = this.extractTokenFromHeader(req);
      const check = this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });
      console.log(check);
    } catch (error) {
      throw new BadRequestException('invalid token ');
    }

    next();
  }
  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers['token']?.split(' ') ?? [];
    //  console.log(type, 'token', token);
    return type === 'Bearer' ? token : undefined;
  }
}
