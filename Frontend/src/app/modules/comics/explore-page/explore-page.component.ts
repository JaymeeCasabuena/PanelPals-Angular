import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { SearchBarComponent } from '../../../shared/components/search-bar/search-bar.component';
import { SideBarComponent } from '../../../shared/components/side-bar/side-bar.component';
import { AvatarComponent } from '../../../shared/components/avatar/avatar.component';
import { ComicService } from '../../../shared/services/comic-services/comic.service';
import { Comic } from '../../../shared/interfaces/comic';
import { PaginatorModule } from 'primeng/paginator';
import { MatPaginatorModule } from '@angular/material/paginator';
import { StarRatingComponent } from '../../../shared/components/star-rating/star-rating.component';
import { PaginatorComponent } from '../../../shared/components/paginator/paginator.component';
import { AddNewFormComponent } from '../add-new-comic/add-new-form/add-new-form.component';

@Component({
  selector: 'app-explore-page',
  standalone: true,
  imports: [
    CommonModule,
    AvatarComponent,
    SearchBarComponent,
    SideBarComponent,
    PaginatorModule,
    MatPaginatorModule,
    StarRatingComponent,
    PaginatorComponent,
    AddNewFormComponent,
  ],
  templateUrl: './explore-page.component.html',
  styleUrl: './explore-page.component.css',
})
export class ExplorePageComponent {
  currentUser: any;
  comics: Comic[] = [];
  visibleComics: Comic[] = [];
  first = 0;
  rows = 8;

  constructor(
    private comicService: ComicService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe({
      next: (data) => {
        this.currentUser = data['currentUser']['data'];
      },
      error: (error) => console.error('Error resolving current user', error),
    });
    this.fetchAllComics();
  }

  fetchAllComics(): void {
    this.comicService.getAllComics().subscribe({
      next: (response) => {
        (this.comics = response),
          this.updateVisibleComics(this.comics.slice(0, this.rows));
      },
      error: (error) => console.error('Error fetching comics', error),
      complete: () => console.log('Fetching comics complete'),
    });
  }

  updateVisibleComics(visible: Comic[]): void {
    this.visibleComics = visible;
  }

  navigateToDetails(comicId: number): void {
    this.router.navigate(['/comic-details', comicId]);
  }
}
