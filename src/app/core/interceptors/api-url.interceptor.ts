import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { getApiUrlUtil } from '../utilities/api-url.util';

@Injectable()
export class ApiUrlInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const changedRequest = request.clone({
            url: getApiUrlUtil(request.url)
        });

        return next.handle(changedRequest);
    }
}
