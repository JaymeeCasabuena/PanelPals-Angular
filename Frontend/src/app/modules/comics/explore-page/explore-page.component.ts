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
  ],
  templateUrl: './explore-page.component.html',
  styleUrl: './explore-page.component.css',
})
export class ExplorePageComponent {
  currentUser: any;
  comics: Comic[] = [];
  visibleComics: Comic[] = [];
  first = 0;
  rows = 12;

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
        (this.comics = response), this.updateVisibleComics();
      },
      error: (error) => console.error('Error fetching comics', error),
      complete: () => console.log('Fetching comics complete'),
    });
  }

  updateVisibleComics(): void {
    this.visibleComics = this.comics.slice(this.first, this.first + this.rows);
  }

  navigateToDetails(comicId: number): void {
    this.router.navigate(['/comic-details', comicId]);
  }

  onPageChange(event: any): void {
    this.first = event.first;
    this.updateVisibleComics();
  }
}
