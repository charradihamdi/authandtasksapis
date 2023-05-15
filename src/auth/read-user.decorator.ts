import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from './user.entity';

export const ReadUser = createParamDecorator(
  (data, ctx: ExecutionContext): User => {
    const req = ctx.switchToHttp().getRequest();
    console.log(req);
    return req.user;
  },
);
