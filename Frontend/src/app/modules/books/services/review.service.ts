import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Review } from '../interfaces/review';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  // Add a new review
  addReview(review: Review): Observable<any> {
    return this.http.post(`${this.apiUrl}/reviews`, review);
  }

  // Edit a review
  editReview(reviewId: number, review: Review): Observable<any> {
    return this.http.put(`${this.apiUrl}/reviews/${reviewId}`, review);
  }

  // Delete a review
  deleteReview(reviewId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/reviews/${reviewId}`);
  }

  // Get reviews by BookId
  getReviewsByComicId(comicId: number): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.apiUrl}/reviews/comic/${comicId}`);
  }

  // Get reviews by UserId
  getReviewsByUserId(userId: number): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.apiUrl}/reviews/user/${userId}`);
  }
}
