import { Injectable } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';
import { isEmpty } from 'lodash';

import { storageAuthTokenField, storageXsrfTokenField } from '../core.constants';

@Injectable()
export class TokenService {
    constructor(private localStorageService: LocalStorageService) {}

    get token(): string {
        return <string>this.localStorageService.get(storageAuthTokenField);
    }

    get hasToken(): boolean {
        return !isEmpty(this.token);
    }

    remove() {
        this.localStorageService.remove(storageAuthTokenField);
        this.localStorageService.remove(storageXsrfTokenField);
    }

    setTokens({ falkonToken, xsrfToken }) {
        this.localStorageService.set(storageAuthTokenField, falkonToken);
        this.localStorageService.set(storageXsrfTokenField, xsrfToken);
    }
}
