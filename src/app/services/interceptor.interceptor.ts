import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ServiceLoginService } from './service-login.service';

@Injectable()
export class InterceptorInterceptor implements HttpInterceptor {
  constructor(
    public router: Router,
    private serviceLogin: ServiceLoginService
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    let token = null;
    if (this.serviceLogin.Token() && this.serviceLogin.Token().accessToken) {
      token = this.serviceLogin.Token().accessToken;
    }

    if (!request.headers.has('Authorization')) {
      request = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${token}`),
      });
    }

    if (!request.headers.has('Content-Type')) {
      request = request.clone({
        headers: request.headers.set('Content-Type', 'application/json'),
      });
    }

    request = request.clone({
      headers: request.headers.set('Accept', 'application/json'),
    });
    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          // console.log('event--->>>', event);
        }
        return event;
      }),

      catchError((error: HttpErrorResponse) => {
        switch (error.status) {
          case 401:
            this.serviceLogin.clearDelete();
            this.router.navigateByUrl('login');
            break;
          default:
            return throwError(error);
        }
      })
    );
  }
}
