import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../../auth/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  private apiUrl = environment.apiUrl;

  editProfile(profileData: {
    userId: number;
    username: string;
    avatar: string;
  }): Observable<any> {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      this.authService.signOut();
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put(
      `${this.apiUrl}/users/${profileData.userId}`,
      profileData,
      { headers }
    );
  }
}
