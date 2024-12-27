import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Discussion } from '../../interfaces/discussion';
import { DiscussionDetails } from '../../interfaces/discussion';

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

  getAllDiscussions(): Observable<DiscussionDetails[]> {
    return this.http.get<DiscussionDetails[]>(
      `${this.apiUrl}/discussions/getAll`
    );
  }

  getDiscussionById(id: number): Observable<DiscussionDetails> {
    return this.http.get<DiscussionDetails>(`${this.apiUrl}/discussions/${id}`);
  }

  getTrendingDiscussions(): Observable<Discussion[]> {
    return this.http.get<Discussion[]>(`${this.apiUrl}/discussions/trending`);
  }

  getRecentDiscussions(): Observable<Discussion[]> {
    return this.http.get<Discussion[]>(`${this.apiUrl}/discussions/recent`);
  }

  editDiscussion(
    discussionId: number,
    userId: number,
    content: string
  ): Observable<any> {
    const body = { userId, content };
    return this.http.put(`${this.apiUrl}/discussions/${discussionId}`, body);
  }

  deleteDiscussion(discussionId: number, userId: number): Observable<any> {
    return this.http.delete(
      `${this.apiUrl}/discussions/${discussionId}?userId=${userId}`
    );
  }
}
