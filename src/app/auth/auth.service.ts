import { Injectable } from '@angular/core'
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { catchError, tap } from 'rxjs/operators';
import { BehaviorSubject, throwError } from 'rxjs';
import { environment } from '../../environments/environment'

import { User } from './user.model';
import { Router } from '@angular/router';

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
    private tokenExperationTimer = null;
    user = new BehaviorSubject<User>(null);

    constructor(private http: HttpClient, private router: Router) { }

    signUp(email: string, password: string) {
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebaseApiKey, {
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
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseApiKey, {
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

    logout() {
        this.user.next(null);
        localStorage.removeItem('userData');
        this.router.navigate(['/auth']);

        if (this.tokenExperationTimer) {
            clearTimeout(this.tokenExperationTimer);
        }

        this.tokenExperationTimer = null;
    }

    autoLogin() {
        const userData: {
            id: string,
            email: string,
            _token: string,
            _tokenExpiredDate: string
        } = JSON.parse(localStorage.getItem('userData'));

        if (!userData) {
            return;
        }

        const loadedUSer = new User(userData.id, userData.email, userData._token, new Date(userData._tokenExpiredDate))

        if (loadedUSer.token) {
            this.user.next(loadedUSer);
            const experationDuration = new Date(userData._tokenExpiredDate).getTime() - new Date().getTime();

            this.autoLogout(experationDuration);
        }
    }

    autoLogout(experationDuration: number) {
        console.log(experationDuration);
        this.tokenExperationTimer = setTimeout(() => {
            this.logout();
        }, experationDuration);
    }

    private handleAuthentication(localId: string, email: string, idToken: string, expiresIn: number) {
        const experationDate = new Date(new Date().getTime() + expiresIn * 1000);
        const user = new User(localId, email, idToken, experationDate);
        this.user.next(user);
        this.autoLogout(expiresIn * 1000);
        localStorage.setItem('userData', JSON.stringify(user));
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