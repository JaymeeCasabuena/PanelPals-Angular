import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '../../../shared/services/book-services/book.service';
import { SideBarComponent } from '../../../shared/components/side-bar/side-bar.component';
import { SearchBarComponent } from '../../../shared/components/search-bar/search-bar.component';
import { StarRatingComponent } from '../../../shared/components/star-rating/star-rating.component';
import { FormsModule } from '@angular/forms';
import { ReviewService } from '../services/review.service';
import { Review } from '../interfaces/review';

@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [
    CommonModule,
    SideBarComponent,
    SearchBarComponent,
    StarRatingComponent,
    FormsModule,
  ],
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.css',
})
export class BookDetailsComponent {
  book: any;
  reviewText: string = '';
  rating: number = 0;
  reviews: Review[] = [];

  constructor(
    private bookService: BookService,
    private route: ActivatedRoute,
    private reviewService: ReviewService
  ) {}

  ngOnInit(): void {
    const bookId = this.route.snapshot.paramMap.get('id');
    if (bookId) {
      this.fetchBookById(Number(bookId));
      this.fetchReviewsByBookId(Number(bookId));
    }
  }

  fetchBookById(id: number): void {
    this.bookService.getBookById(id).subscribe({
      next: (response) => (this.book = response),
      error: (error) => console.error('Error fetching book', error),
      complete: () => console.log('Fetching book complete'),
    });
  }

  fetchReviewsByBookId(bookId: number): void {
    this.reviewService.getReviewsByBookId(bookId).subscribe({
      next: (reviews) => (this.reviews = reviews),
      error: (error) => console.error('Error fetching reviews', error),
    });
  }

  onRatingChange(newRating: number): void {
    this.rating = newRating;
  }

  submitReview(): void {
    if (this.reviewText.trim() === '' || this.rating === 0) {
      alert('Please provide a rating and a review.');
      return;
    }

    const newReview: Review = {
      BookId: this.book.Id,
      UserId: 1,
      ReviewText: this.reviewText,
      Rating: this.rating,
    };

    this.reviewService.addReview(newReview).subscribe({
      next: (response) => {
        console.log('Review submitted successfully', response);
        this.fetchReviewsByBookId(this.book.Id);
        this.reviewText = '';
        this.rating = 0;
      },
      error: (error) => console.error('Error submitting review', error),
    });
  }
}
