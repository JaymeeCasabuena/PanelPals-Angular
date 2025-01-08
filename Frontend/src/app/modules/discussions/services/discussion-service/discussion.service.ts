import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Discussion } from '../../interfaces/discussion';

@Injectable({
  providedIn: 'root',
})
export class DiscussionService {
  private apiUrl = environment.apiUrl;
  private discussionsSubject = new BehaviorSubject<Discussion[]>([]);
  discussions$ = this.discussionsSubject.asObservable();

  constructor(private http: HttpClient) {}

  createDiscussion(discussionData: {
    userId: number;
    title: string;
    content: string;
  }): Observable<Discussion> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http
      .post<Discussion>(`${this.apiUrl}/discussions/`, discussionData, {
        headers,
      })
      .pipe(
        tap((newDiscussion) => {
          const currentDiscussions = this.discussionsSubject.value;
          this.discussionsSubject.next([...currentDiscussions, newDiscussion]);
        })
      );
  }

  getAllDiscussions(): Observable<Discussion[]> {
    return this.http
      .get<Discussion[]>(`${this.apiUrl}/discussions/getAll`)
      .pipe(
        tap((discussions) => {
          this.discussionsSubject.next(discussions);
        })
      );
  }

  getDiscussionById(id: number): Observable<Discussion> {
    return this.http.get<Discussion>(`${this.apiUrl}/discussions/${id}`);
  }

  getTrendingDiscussions(): Observable<Discussion[]> {
    return this.http.get<Discussion[]>(`${this.apiUrl}/discussions/trending`);
  }

  getRecentDiscussions(): Observable<Discussion[]> {
    return this.http.get<Discussion[]>(`${this.apiUrl}/discussions/recent`);
  }

  editDiscussion(
    discussionData: {
      userId: number;
      title: string;
      content: string;
    },
    discussionId: number
  ): Observable<Discussion> {
    return this.http
      .put<Discussion>(
        `${this.apiUrl}/discussions/${discussionId}`,
        discussionData
      )
      .pipe(
        tap((updatedDiscussion) => {
          const currentDiscussions = this.discussionsSubject.value.map((d) =>
            d.discussionId === discussionId ? updatedDiscussion : d
          );
          this.discussionsSubject.next(currentDiscussions);
        })
      );
  }

  deleteDiscussion(discussionId: number, userId: number): Observable<any> {
    return this.http
      .delete(`${this.apiUrl}/discussions/${discussionId}?userId=${userId}`)
      .pipe(
        tap(() => {
          const updatedDiscussions = this.discussionsSubject.value.filter(
            (d) => d.discussionId !== discussionId
          );
          this.discussionsSubject.next(updatedDiscussions);
        })
      );
  }
}
