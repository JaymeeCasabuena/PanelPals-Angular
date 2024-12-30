import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private http: HttpClient) {}

  private apiUrl = environment.apiUrl;

  editProfile(profileData: {
    userId: number;
    username: string;
    avatar: string;
  }): Observable<any> {
    return this.http.put(
      `${this.apiUrl}/users/${profileData.userId}`,
      profileData
    );
  }
}
