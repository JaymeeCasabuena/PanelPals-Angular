import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

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

  constructor(private http: HttpClient) {}

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

  getCurrentUser(): Observable<UserResponse> {
    const token = localStorage.getItem('auth_token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<UserResponse>(`${this.apiUrl}/users/current`, {
      headers,
    });
  }

  signOut(): void {
    localStorage.removeItem('auth_token');
  }
}
