import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from './user.entity';

export const ReadUser = createParamDecorator(
  (data, ctx: ExecutionContext): any => {
    const req = ctx.switchToHttp().getRequest();

    return req.user;
  },
);
