import { Injectable } from '@angular/core'
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { catchError, tap } from 'rxjs/operators';
import { BehaviorSubject, Subject, throwError } from 'rxjs';

import {User } from './user.model';

export interface AuthResponseData {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {

    user = new BehaviorSubject<User>(null);
    private API_KEY = "AIzaSyCps7oVN3nhKzp-54Ee-dfG12eRVo_osZk";

    constructor(private http: HttpClient) { }

    signUp(email: string, password: string) {
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + this.API_KEY, {
            email: email,
            password: password,
            returnSecureToken: true
        })
        .pipe(
            catchError(this.handleError), tap(resData => {
                this.handleAuthentication(resData.localId, resData.email, resData.idToken, +resData.expiresIn);
            })
        );
    }

    login(email: string, password: string) {
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + this.API_KEY, {
            email: email,
            password: password,
            returnSecureToken: true
        })
        .pipe(
            catchError(this.handleError), tap(resData => {
                this.handleAuthentication(resData.localId, resData.email, resData.idToken, +resData.expiresIn);
            })
        );
    }

    private handleAuthentication(localId: string, email: string, idToken: string, expiresIn: number){
        const experationDate = new Date(new Date().getTime() + expiresIn * 1000);
        const user = new User(localId, email, idToken, experationDate);
        this.user.next(user);
    }

    private handleError(errorResp: HttpErrorResponse) {
        let errorMessage = "An error occurred!";
        if (!errorResp.error || !errorResp.error.error) {
            return throwError(errorMessage);
        } else {
            switch (errorResp.error.error.message) {
                case 'EMAIL_EXISTS':
                    errorMessage = 'The email address is already in use by another account';
                    break;
                case 'EMAIL_NOT_FOUND':
                    errorMessage = 'There is no user record corresponding to this identifier. The user may have been deleted';
                    break;
                case 'INVALID_PASSWORD':
                    errorMessage = 'The password is invalid or the user does not have a password.';
                    break;
                case 'USER_DISABLED':
                    errorMessage = 'The user account has been disabled by an administrator.';
                    break;
            }

            return throwError(errorMessage);
        }
    }
}