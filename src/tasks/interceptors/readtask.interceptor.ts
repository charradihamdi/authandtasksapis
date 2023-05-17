import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
@Injectable()
export class ExecutionTime implements NestInterceptor {
  private logger = new Logger('task Interceptor');
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Before...');

    const now = Date.now();
    return next
      .handle()
      .pipe(
        tap(() => console.log(`response send  After...${Date.now() - now}ms`)),
      );
  }
}
