import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    console.log(request.ip);
    if (request?.user) {
      const { id } = request.user;
      console.log(id);
      return true;
    }
    return false;
  }
}
