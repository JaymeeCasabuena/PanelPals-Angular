import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
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
    RouterModule,
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
  currentUser: any;
  reviewText: string = '';
  rating: number = 0;
  reviews: Review[] = [];
  formattedGenres: string = '';

  constructor(
    private comicService: ComicService,
    private route: ActivatedRoute,
    private reviewService: ReviewService
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe({
      next: (data) => {
        this.currentUser = data['currentUser']['data'];
      },
      error: (error) => console.error('Error resolving current user', error),
    });

    const comicId = this.route.snapshot.paramMap.get('id');
    if (comicId) {
      this.fetchComicById(Number(comicId));
      this.fetchReviewsByComicId(Number(comicId));
    }
  }

  fetchComicById(id: number): void {
    this.comicService.getComicById(id).subscribe({
      next: (response) => {
        this.comic = response;
        if (this.comic.Genres && this.comic.Genres.length > 0) {
          this.formattedGenres = this.comic.Genres.split(',').join(', ');
        }
      },
      error: (error) => console.error('Error fetching comic', error),
      complete: () => console.log('Fetching comic complete'),
    });
  }

  fetchReviewsByComicId(comicId: number): void {
    this.reviewService.getReviewsByComicId(comicId).subscribe({
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

    console.log(this.currentUser);
    const newReview: Review = {
      ComicId: this.comic.Id,
      UserId: this.currentUser.Id,
      ReviewText: this.reviewText,
      Rating: this.rating,
    };

    this.reviewService.addReview(newReview).subscribe({
      next: (response) => {
        console.log('Review submitted successfully', response);
        this.fetchComicById(this.comic.Id);
        this.reviewText = '';
        this.rating = 0;
      },
      error: (error) => console.error('Error submitting review', error),
    });
  }
}
