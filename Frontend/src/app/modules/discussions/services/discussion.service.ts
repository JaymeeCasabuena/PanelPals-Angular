import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Discussion } from '../interfaces/discussion';

@Injectable({
  providedIn: 'root',
})
export class DiscussionService {
  constructor(private http: HttpClient) {}

  private apiUrl = environment.apiUrl;

  createDiscussion(discussionData: {
    userId: number;
    title: string;
    content: string;
  }): Observable<Discussion[]> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Discussion[]>(
      `${this.apiUrl}/discussions/`,
      discussionData,
      {
        headers,
      }
    );
  }

  getAllDiscussions(): Observable<Discussion[]> {
    return this.http.get<Discussion[]>(`${this.apiUrl}/discussions/getAll`);
  }
}
