import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs';
import { Review } from '../interfaces/review';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  private apiUrl = environment.apiUrl;

  private reviewsSubject = new BehaviorSubject<Review[]>([]);
  reviews$ = this.reviewsSubject.asObservable();

  constructor(private http: HttpClient) {}

  // Add a new review
  addReview(review: Review): Observable<Review> {
    return this.http.post<Review>(`${this.apiUrl}/reviews`, review).pipe(
      tap((newReview) => {
        const currentReviews = this.reviewsSubject.value;
        this.reviewsSubject.next([...currentReviews, newReview]);
      })
    );
  }

  // Edit a review
  editReview(reviewId: number, review: Review): Observable<Review> {
    return this.http
      .put<Review>(`${this.apiUrl}/reviews/${reviewId}`, review)
      .pipe(
        tap((updatedReview) => {
          const currentReviews = this.reviewsSubject.value.map((r) =>
            r.ReviewId === reviewId ? updatedReview : r
          );
          this.reviewsSubject.next(currentReviews);
        })
      );
  }

  // Delete a review
  deleteReview(reviewId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/reviews/${reviewId}`).pipe(
      tap(() => {
        const currentReviews = this.reviewsSubject.value.filter(
          (r) => r.ReviewId !== reviewId
        );
        this.reviewsSubject.next(currentReviews);
      })
    );
  }
  // Get reviews by BookId
  getReviewsByComicId(comicId: number): Observable<Review[]> {
    return this.http
      .get<Review[]>(`${this.apiUrl}/reviews/comic/${comicId}`)
      .pipe(
        tap((reviews) => {
          this.reviewsSubject.next(reviews);
        })
      );
  }
  // Get reviews by UserId
  getReviewsByUserId(userId: number): Observable<Review[]> {
    return this.http
      .get<Review[]>(`${this.apiUrl}/reviews/user/${userId}`)
      .pipe(
        tap((reviews) => {
          this.reviewsSubject.next(reviews);
        })
      );
  }
}
