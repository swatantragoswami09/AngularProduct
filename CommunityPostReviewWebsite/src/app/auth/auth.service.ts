import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { JwtResponse } from './jwt-response';
import { AuthLoginInfo } from './login-info';
import { SignUpInfo } from './signup-info';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginUrl = 'http://localhost:8282/api/auth/signin';
  private signupUrl = 'http://localhost:8282/api/auth/signup';
  constructor(private http: HttpClient) {
  }

  ngOnInit() {
  }

  loginUser(token) {
    localStorage.setItem("token", token)
    return true;
  }
  isLoggedIn() {
    let token = localStorage.getItem("token");
    if (token == undefined || token === "" || token == null) {
      return false;
    }
    else {
      return true;
    }
  }
  getToken() {
    return localStorage.getItem("token")
  }
  attemptAuth(credentials: AuthLoginInfo): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(this.loginUrl, credentials, httpOptions);

  }


  users(credentials: AuthLoginInfo): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(this.loginUrl, credentials, httpOptions);

  }
  signUp(info: SignUpInfo): Observable<string> {
    console.log(this.http.post<string>(this.signupUrl, info, httpOptions))
    return this.http.post<string>(this.signupUrl, info, httpOptions);
  }
}
