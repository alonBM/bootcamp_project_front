import { Injectable } from '@angular/core';
import { UserAccount } from '../models/user-account.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private API_BASE_URL = 'http://localhost';

  constructor(private httpClient: HttpClient) {}

  signIn(userAccount: UserAccount): Observable<UserAccount> {
    return this.httpClient.post<UserAccount>(
      `${this.API_BASE_URL}/auth`,
      userAccount
    );
  }

  isSignedIn(): boolean {
    if (localStorage.getItem('token')) {
      return true;
    }
    return false;
  }

  signUp(userAccount: UserAccount): Observable<UserAccount> {
    return this.httpClient.post<UserAccount>(
      `${this.API_BASE_URL}/register`,
      userAccount
    );
  }

  getToken(): string {
    return localStorage.getItem('token');
  }

  removeToken(): void {
    localStorage.removeItem('token');
  }
}
