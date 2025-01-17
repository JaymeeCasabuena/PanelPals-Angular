import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { UserResponse } from '../../interfaces/user-response';
import { AuthService } from '../../../modules/auth/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  private apiUrl = environment.apiUrl;

  private user: any;

  setUser(user: any): void {
    this.user = user;
  }

  getUser(): any {
    return this.user;
  }

  getCurrentUser(): Observable<UserResponse> {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      this.authService.signOut();
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<UserResponse>(`${this.apiUrl}/users/current`, {
      headers,
    });
  }
}
