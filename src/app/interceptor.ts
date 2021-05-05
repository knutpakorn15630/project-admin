// import { Injectable } from '@angular/core';
// import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
// import { Observable, throwError } from 'rxjs';
// import { catchError } from 'rxjs/operators';


// @Injectable()
// export class ErrorInterceptor implements HttpInterceptor {
//     constructor() { }

//     intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//         return next.handle(request).pipe(catchError(err => {
//             if ([401, 403].includes(err.status) ) {
//                 console.log(`is interceptor ${err}`);
//             }
//             const error = (err && err.error && err.error.message) || err.statusText;
//             console.error(err);
//             return throwError(error);
//         }));
//     }
// }




import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ServiceLoginService } from './services/service-login.service';
import { NavController } from 'ionic-angular';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    token = '';
    constructor(private nav: NavController, private serviceLogin: ServiceLoginService) { }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

        if (this.serviceLogin.Token() && this.serviceLogin.Token().accessToken) {
            this.token = this.serviceLogin.Token().accessToken;
        }

        if (!request.headers.has('Authorization')) {
            request = request.clone({
                headers: request.headers.set('Authorization', `Bearer ${this.token}`),
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
                        break;
                    default:
                        return throwError(error);
                }
            }),
        );

    }
}
