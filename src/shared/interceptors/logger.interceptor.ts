import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const { url, method } = context.getArgs()[0];
    console.log('=======================');
    console.log(`Start request in ${context.getClass().name}`);
    console.log(`${method} ${url}`);
    console.log('=======================');

    const start = Date.now();

    return next.handle().pipe(
      tap(() => {
        console.log(`Request ended in: ${Date.now() - start}ms`);
        console.log('***');
      }),
    );
  }
}
