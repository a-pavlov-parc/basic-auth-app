import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { includes, some, isEmpty } from 'lodash';

import { TokenService } from '../services/token.service';

@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {
    blackList: string[] = ['/i18n/', '/system.user.login'];

    headerName: string = 'authentication';
    headerPrefix: string = 'Bearer';

    constructor(private tokenService: TokenService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (some(this.blackList, item => includes(request.url, `${item}`))) {
            return next.handle(request)
                .do((response: any) => {
                    if (response instanceof HttpResponse) {
                        const falkonToken = response.headers.get('X-FALCON-TOKEN');
                        const xsrfToken = response.headers.get('X-FALCON-TOKEN');

                        if (!isEmpty(falkonToken) && !isEmpty(xsrfToken)) {
                            this.tokenService.setTokens({ falkonToken, xsrfToken });
                        }
                    }
                });
        } else {
            const token = this.tokenService.token;

            if (!isEmpty(token)) {
                const changedRequest = request.clone({
                    headers: request.headers.set(this.headerName, `${this.headerPrefix} ${token}`)
                });

                return next.handle(changedRequest).catch(response => {
                    return Observable.throw(response);
                });
            } else {
                return Observable.never();
            }
        }
    }
}
