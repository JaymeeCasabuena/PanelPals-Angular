import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ComicService } from '../../../shared/services/comic-services/comic.service';
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
  templateUrl: './comic-details.component.html',
  styleUrl: './comic-details.component.css',
})
export class ComicDetailsComponent {
  comic: any;
  reviewText: string = '';
  rating: number = 0;
  reviews: Review[] = [];

  constructor(
    private comicService: ComicService,
    private route: ActivatedRoute,
    private reviewService: ReviewService
  ) {}

  ngOnInit(): void {
    const comicId = this.route.snapshot.paramMap.get('id');
    if (comicId) {
      this.fetchComicById(Number(comicId));
      this.fetchReviewsByBookId(Number(comicId));
    }
  }

  fetchComicById(id: number): void {
    this.comicService.getComicById(id).subscribe({
      next: (response) => (this.comic = response),
      error: (error) => console.error('Error fetching comic', error),
      complete: () => console.log('Fetching comic complete'),
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
      BookId: this.comic.Id,
      UserId: 1,
      ReviewText: this.reviewText,
      Rating: this.rating,
    };

    this.reviewService.addReview(newReview).subscribe({
      next: (response) => {
        console.log('Review submitted successfully', response);
        this.fetchReviewsByBookId(this.comic.Id);
        this.reviewText = '';
        this.rating = 0;
      },
      error: (error) => console.error('Error submitting review', error),
    });
  }
}
