import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
@Injectable()
export class SendInterceptor implements HttpInterceptor {
    constructor() { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = localStorage.getItem('token');
        if (token) {
            const newHeaders = new HttpHeaders().set("access-token", token);
            const AuthRequest = request.clone({ headers: newHeaders });
            // request1 = request.clone({
            //     setHeaders : {
            //         authToken : token
            //     }
            // })
            return next.handle(AuthRequest);//request1
        }
        return next.handle(request);
    }
}
