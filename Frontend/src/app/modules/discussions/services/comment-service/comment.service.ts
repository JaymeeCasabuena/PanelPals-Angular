import { Injectable } from '@angular/core';
import { Comment } from '../../interfaces/comment';
import { environment } from '../../../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private apiUrl = environment.apiUrl;
  private commentsSubject = new BehaviorSubject<Comment[]>([]);
  comments$ = this.commentsSubject.asObservable();

  constructor(private http: HttpClient) {}

  addComment(commentData: {
    discussionId: number;
    reviewId: number;
    userId: number;
    commentText: string;
  }): Observable<Comment> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http
      .post<Comment>(`${this.apiUrl}/comments/`, commentData, { headers })
      .pipe(
        tap((newComments) => {
          const currentComments = this.commentsSubject.value;
          this.commentsSubject.next([...currentComments, newComments]);
        })
      );
  }

  editComment(
    commentData: {
      userId: number;
      commentText: string;
    },
    commentId: number
  ): Observable<Comment> {
    return this.http
      .put<Comment>(`${this.apiUrl}/comments/${commentId}`, commentData)
      .pipe(
        tap((updatedComment) => {
          const currentComments = this.commentsSubject.value.map((c) =>
            c.commentId === commentId ? updatedComment : c
          );
          this.commentsSubject.next(currentComments);
        })
      );
  }

  deleteComment(commentId: number, userId: number): Observable<any> {
    return this.http
      .delete(`${this.apiUrl}/comments/${commentId}?userId=${userId}`)
      .pipe(
        tap(() => {
          const updatedComments = this.commentsSubject.value.filter(
            (c) => c.commentId !== commentId
          );
          this.commentsSubject.next(updatedComments);
        })
      );
  }
}
