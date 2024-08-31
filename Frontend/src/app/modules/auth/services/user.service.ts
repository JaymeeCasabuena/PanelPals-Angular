import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

interface UserResponse {
  message: string;
  data?: any;
  token?: string;
  user?: any;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

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
    return this.http.post<UserResponse>(`${this.apiUrl}/users/login`, body);
  }
}
