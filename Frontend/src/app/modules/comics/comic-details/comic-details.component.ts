import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ComicService } from '../../../shared/services/comic-services/comic.service';
import { SideBarComponent } from '../../../shared/components/side-bar/side-bar.component';
import { SearchBarComponent } from '../../../shared/components/search-bar/search-bar.component';
import { StarRatingComponent } from '../../../shared/components/star-rating/star-rating.component';
import { AvatarComponent } from '../../../shared/components/avatar/avatar.component';
import { FormsModule } from '@angular/forms';
import { ReviewService } from '../services/review.service';
import { Review } from '../interfaces/review';
import { AccordionModule } from 'primeng/accordion';
import { Avatar } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';

@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    SideBarComponent,
    SearchBarComponent,
    StarRatingComponent,
    AvatarComponent,
    Avatar,
    FormsModule,
    AccordionModule,
    BadgeModule,
  ],
  templateUrl: './comic-details.component.html',
  styleUrl: './comic-details.component.css',
})
export class ComicDetailsComponent {
  reviewForm: FormGroup;
  comic: any;
  currentUser: any;
  rating: number = 0;
  reviews: Review[] = [];
  formattedGenres: string = '';

  constructor(
    private fb: FormBuilder,
    private comicService: ComicService,
    private route: ActivatedRoute,
    private reviewService: ReviewService
  ) {
    this.reviewForm = this.fb.group({
      rating: [null, Validators.required],
      reviewText: ['', Validators.required],
    });
  }

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

  onRatingChange(value: number): void {
    this.reviewForm.get('rating')?.setValue(value);
    this.reviewForm.get('rating')?.markAsTouched();
  }

  onSubmit(): void {
    if (this.reviewForm.valid) {
      const reviewData = {
        ReviewText: this.reviewForm.get('reviewText')?.value,
        Rating: this.reviewForm.get('rating')?.value,
        ComicId: this.comic?.Id,
        UserId: this.currentUser.Id,
      };

      this.reviewService.addReview(reviewData).subscribe({
        next: () => {
          this.reviewForm.reset(), this.reloadPage();
        },
        error: (error) => {
          console.error('Error adding comic', error);
        },
      });
    } else {
      console.log('Form is invalid', this.reviewForm);
      this.reviewForm.markAllAsTouched();
    }
  }

  reloadPage() {
    window.location.reload();
  }
}
