import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  Observable,
  Subject,
  catchError,
  debounceTime,
  distinctUntilChanged,
  of,
  switchMap,
} from 'rxjs';
import { Router } from '@angular/router';
import { ComicService } from '../../services/comic-services/comic.service';
import { Comic } from '../../interfaces/comic';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css',
})
export class SearchBarComponent {
  searchTerm = new Subject<string>();
  searchResults$: Observable<Comic[]> = this.searchTerm.pipe(
    debounceTime(300),
    distinctUntilChanged(),
    switchMap((searchTerm) => {
      if (!searchTerm.trim()) {
        return of([]);
      }
      return this.comicService.searchComics(searchTerm).pipe(
        catchError((error) => {
          if (error.status === 404) {
            console.error('No results found for search term.');
            return of([]);
          }
          return of([]);
        })
      );
    })
  );

  constructor(private comicService: ComicService, private router: Router) {}

  onInputChange(e: any): void {
    this.searchTerm.next(e.target.value);
  }

  navigateToDetails(comicId: number): void {
    this.router.navigate(['/comic-details', comicId]);
  }

}
