import { Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'

interface AuthResponseData {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
}

@Injectable({providedIn: 'root'})
export class AuthService {
    
    API_KEY = "AIzaSyCps7oVN3nhKzp-54Ee-dfG12eRVo_osZk";

    constructor(private http: HttpClient){}

    signUp(email: string, password: string) {
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + this.API_KEY, {
            email: email,
            password: password,
            returnSecureToken: true
        });
    }
}