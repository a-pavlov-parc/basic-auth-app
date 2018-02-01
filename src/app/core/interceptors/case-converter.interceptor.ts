import { Injectable } from '@angular/core';
import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpResponse,
    HttpParams,
    HttpErrorResponse,
    HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { isEmpty, snakeCase, isEqual } from 'lodash';
import { camelcaseKeysDeep, decamelizeKeysDeep } from '@core/utilities/camelcase-keys.util';

export const NO_CASE_CONVERT_KEY = 'no-case-convert';

export function createNoCaseConvertHeaders() {
    let headers = new HttpHeaders();
    headers = headers.set(NO_CASE_CONVERT_KEY, 'true');
    return headers;
}

@Injectable()
export class CaseConverterInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (request.headers.has(NO_CASE_CONVERT_KEY)) {
            const sanitizedRequest = request.clone({
                headers: request.headers.delete(NO_CASE_CONVERT_KEY)
            });
            return next.handle(sanitizedRequest);
        }

        const transformedRequest = this.convertRequest(request);

        return next.handle(transformedRequest)/*.map(response => {
            return this.convertResponse(response);
        })*/;
    }

    convertRequest(request: HttpRequest<any>) {
        const body = decamelizeKeysDeep(request.body);
        const params = this.convertRequestParams(request.params);

        const transformedRequest = request.clone({ body, params });

        return transformedRequest;
    }

    convertRequestParams(inputParams: HttpParams) {
        let processedParams = new HttpParams();

        const paramsKeys = inputParams.keys();
        paramsKeys.forEach(key => {
            const processedKey = snakeCase(key);
            const values = inputParams.getAll(key);
            values.forEach(value => {
                processedParams = processedParams.append(processedKey, value);
            });
        });

        return processedParams;
    }

    convertResponse(response: HttpEvent<any>) {
        let changedResponse;

        if (response instanceof HttpResponse && !isEmpty(response.body)) {
            const originalBody = response.body;

            // @TODO temporary fix, make case converting less strict
            originalBody.id = originalBody.id || originalBody._id;
            delete originalBody._id;

            changedResponse = response.clone({
                body: camelcaseKeysDeep(originalBody)
            });
        }

        return changedResponse || response;
    }
}
