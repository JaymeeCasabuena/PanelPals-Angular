import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '../../../shared/services/book-services/book.service';
import { SideBarComponent } from '../../../shared/components/side-bar/side-bar.component';
import { SearchBarComponent } from '../../../shared/components/search-bar/search-bar.component';
import { StarRatingComponent } from '../../../shared/components/star-rating/star-rating.component';
import { FormsModule } from '@angular/forms';

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

  constructor(
    private bookService: BookService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const bookId = this.route.snapshot.paramMap.get('id');
    if (bookId) {
      this.fetchBookById(Number(bookId));
    }
  }

  fetchBookById(id: number): void {
    this.bookService.getBookById(id).subscribe({
      next: (response) => (this.book = response),
      error: (error) => console.error('Error fetching book', error),
      complete: () => console.log('Fetching book complete'),
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

    const newReview = {
      rating: this.rating,
      text: this.reviewText,
    };

    this.reviewText = '';
    this.rating = 0;
  }
}
