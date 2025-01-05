import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

interface UserResponse {
  message: string;
  data?: any;
  token?: string;
  user?: any;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  private apiUrl = environment.apiUrl;

  registerUser(
    username: string,
    email: string,
    password: string
  ): Observable<UserResponse> {
    const body = { username, email, password };
    return this.http.post<UserResponse>(`${this.apiUrl}/users/register`, body);
  }

  loginUser(email: string, password: string): Observable<UserResponse> {
    const body = { email, password };
    return this.http
      .post<UserResponse>(`${this.apiUrl}/users/login`, body)
      .pipe(
        tap((response) => {
          if (response.token) {
            localStorage.setItem('auth_token', response.token);
          }
        })
      );
  }

  signOut(): void {
    localStorage.removeItem('auth_token');
    this.router.navigate(['/login']);
  }
}
