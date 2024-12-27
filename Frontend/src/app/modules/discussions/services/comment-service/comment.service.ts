import { Injectable } from '@angular/core';
import { Comment } from '../../interfaces/comment';
import { environment } from '../../../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  constructor(private http: HttpClient) {}

  private apiUrl = environment.apiUrl;

  addComment(commentData: {
    discussionId: number;
    reviewId: number;
    userId: number;
    commentText: string;
  }): Observable<Comment[]> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Comment[]>(`${this.apiUrl}/comments/`, commentData, {
      headers,
    });
  }

  editComment(
    commentId: number,
    userId: number,
    commentText: string
  ): Observable<any> {
    const body = { userId, commentText };
    return this.http.put(`${this.apiUrl}/comments/${commentId}`, body);
  }

  deleteDiscussion(discussionId: number, userId: number): Observable<any> {
    return this.http.delete(
      `${this.apiUrl}/discussions/${discussionId}?userId=${userId}`
    );
  }
}
