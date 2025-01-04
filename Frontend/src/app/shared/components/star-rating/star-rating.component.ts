import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-star-rating',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './star-rating.component.html',
  styleUrl: './star-rating.component.css',
})
export class StarRatingComponent {
  @Input() rating = 0;
  @Input() maxStars = 5;
  @Input() readOnly = false;
  @Output() ratingChange = new EventEmitter<number>();

  stars: boolean[] = [];
  ratingTouched = false;

  ngOnInit() {
    this.updateStars();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['rating']) {
      this.updateStars();
    }
  }

  private updateStars() {
    this.stars = Array.from(
      { length: this.maxStars },
      (_, i) => i < this.rating
    );
  }

  onStarClick(index: number) {
    if (!this.readOnly) {
      this.rating = index + 1;
      this.updateStars();
      this.ratingTouched = true;
      this.ratingChange.emit(this.rating);
    }
  }

  clearRating() {
    if (!this.readOnly) {
      this.rating = 0;
      this.ratingChange.emit(this.rating);
      this.ratingTouched = false;
      this.updateStars();
    }
  }
}
