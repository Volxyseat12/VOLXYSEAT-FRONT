import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { IRegister } from '../../models/SubscriptionModel/IRegister';
import { VolxyseatEndpoints } from '../../volxyseat.endpoints';
import { ILogin } from '../../models/SubscriptionModel/ILogin';

export interface AuthResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = 'https://localhost:7088';

  constructor(
    private http: HttpClient,
    private router: Router,
    private jwtHelper: JwtHelperService
  ) {}

  register(register: IRegister) {
    const endpointUrl = VolxyseatEndpoints.endpoints.register(this.apiUrl);
    return this.http.post(endpointUrl, register);
  }

  login(login: ILogin): Observable<AuthResponse> {
    if (!login.email || !login.password) {
      return throwError(
        () => new Error("Todos os parâmetros são obrigatórios.")
      );
    }
    const endpointUrl = VolxyseatEndpoints.endpoints.login(this.apiUrl);
    return this.http.post<AuthResponse>(endpointUrl, login);
  }

  logout() {
    const endpointUrl = VolxyseatEndpoints.endpoints.logout(this.apiUrl);
    return this.http.post(endpointUrl, {});
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return token ? !this.jwtHelper.isTokenExpired(token) : false;
  }

  getUserRoles(): string[] {
    const token = localStorage.getItem('token');
    if (!this.isAuthenticated()) {
      return [];
    }
    const decodedToken = this.jwtHelper.decodeToken(token!);
    return decodedToken.role || [];
  }


}
