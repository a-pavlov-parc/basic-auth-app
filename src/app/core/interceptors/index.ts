import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { ApiUrlInterceptor } from './api-url.interceptor';
import { AuthTokenInterceptor } from './auth-token.interceptor';
import { ConsoleErrorInterceptor } from './console-error.interceptor';
import { UnauthorizedInterceptor } from './unauthorized.interceptor';

export const interceptors = [
    {
        provide: HTTP_INTERCEPTORS,
        useClass: ApiUrlInterceptor,
        multi: true
    },
    {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthTokenInterceptor,
        multi: true
    },
    {
        provide: HTTP_INTERCEPTORS,
        useClass: ConsoleErrorInterceptor,
        multi: true
    },
    {
        provide: HTTP_INTERCEPTORS,
        useClass: UnauthorizedInterceptor,
        multi: true
    }
];
