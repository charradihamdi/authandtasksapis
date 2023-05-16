import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from './user.entity';

export const ReadUser = createParamDecorator(
  (data, ctx: ExecutionContext): any => {
    const req = ctx.switchToHttp().getRequest();
    //console.log(req);
    const user = {
      username: 'chhamdi1',
      id: '4374e974-4be4-4f6d-9313-023adb0360ed',
    };
    return user;
  },
);
