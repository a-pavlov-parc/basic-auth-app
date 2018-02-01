import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { IAuthSignInResponse, IAuthSignInRequest } from '../interfaces';
import { IUser } from '@user/interfaces';

@Injectable()
export class AuthApiService {
    constructor(private http: HttpClient) {}

    signIn(credentials: IAuthSignInRequest): Observable<IAuthSignInResponse> {
        return this.http.post<IAuthSignInResponse>('/system.user.login', credentials);
    }
}
