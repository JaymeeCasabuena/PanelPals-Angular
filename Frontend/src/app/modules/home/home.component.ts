import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SideBarComponent } from '../../shared/components/side-bar/side-bar.component';
import { SearchBarComponent } from '../../shared/components/search-bar/search-bar.component';
import { ComicService } from '../../shared/services/comic-services/comic.service';
import { DiscussionService } from '../discussions/services/discussion-service/discussion.service';
import { UserService } from '../auth/services/user.service';
import { Comic } from '../../shared/interfaces/comic';
import { Discussion } from '../discussions/interfaces/discussion';
import { AddNewFormComponent } from '../books/add-new-book/add-new-form/add-new-form.component';
import { MatTabsModule } from '@angular/material/tabs';
import { Carousel } from 'primeng/carousel';
import { TabsModule } from 'primeng/tabs';
import { Avatar } from 'primeng/avatar';

interface PopularBooks {
  title: string;
  author: string;
  summary: string;
  imageUrl: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    SideBarComponent,
    SearchBarComponent,
    AddNewFormComponent,
    MatTabsModule,
    Carousel,
    TabsModule,
    Avatar,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  comics: Comic[] = [];
  comic: any;
  currentUser: any;
  newDiscussions: any;
  trendingDiscussions: any;

  constructor(
    private comicService: ComicService,
    private userService: UserService,
    private discussionService: DiscussionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchAllComics();
    this.getCurrentUser();
    this.fetchNewDiscussions();
    this.fetchTrendingDiscussions();
  }

  getCurrentUser(): void {
    this.userService.getCurrentUser().subscribe({
      next: (response) => {
        this.currentUser = response.data;
      },
      error: (error) => {
        console.error('Error fetching current user', error);
      },
    });
  }

  fetchAllComics(): void {
    this.comicService.getAllComics().subscribe({
      next: (response) => (this.comics = response),
      error: (error) => console.error('Error fetching comics', error),
      complete: () => console.log('Fetching comics complete'),
    });
  }

  fetchTrendingDiscussions(): void {
    this.discussionService.getTrendingDiscussions().subscribe({
      next: (response) => (this.trendingDiscussions = response),
      error: (error) =>
        console.error('Error fetching trending discussions', error),
      complete: () => console.log('Fetching trending discussions complete'),
    });
  }

  fetchNewDiscussions(): void {
    this.discussionService.getRecentDiscussions().subscribe({
      next: (response) => (this.newDiscussions = response),
      error: (error) => console.error('Error fetching new discussions', error),
      complete: () => console.log('Fetching new discussions complete'),
    });
  }

  navigateToDetails(comicId: number): void {
    this.router.navigate(['/comic-details', comicId]);
  }

  openDiscussion(id: number): void {
    this.router.navigate(['/discussions', id]);
  }
}
