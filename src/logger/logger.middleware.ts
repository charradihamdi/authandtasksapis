import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { IsEmpty } from 'class-validator';
import { Request, Response, NextFunction, response } from 'express';
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger();
  use(req: Request, res: Response, next: NextFunction) {
    const { ip, method, originalUrl, body } = req;
    const userAgent = req.get('user-agent') || '';
    response.on('close', () => {
      const { statusCode } = res;
      if (IsEmpty(body))
        this.logger.log(
          `${method} | ${originalUrl} | ${statusCode} | ${userAgent} ${ip}`,
        );
      else
        this.logger.log(
          `${method} | ${originalUrl} | ${statusCode} | ${userAgent} ${ip}`,
          body,
        );
    });

    next();
  }
}
