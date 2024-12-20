import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SideBarComponent } from '../../shared/components/side-bar/side-bar.component';
import { SearchBarComponent } from '../../shared/components/search-bar/search-bar.component';
import { ComicService } from '../../shared/services/comic-services/comic.service';
import { UserService } from '../auth/services/user.service';
import { Comic } from '../../shared/interfaces/comic';
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

  constructor(
    private comicService: ComicService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchAllComics();
    this.getCurrentUser();
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

  navigateToDetails(comicId: number): void {
    this.router.navigate(['/comic-details', comicId]);
  }

  newDiscussions = [
    {
      id: 1,
      title: 'Recommend me a good Rofan?',
      responses: 5,
    },
    {
      id: 2,
      title: 'When is the next update of Operation: True Love',
      responses: 10,
    },
  ];

  trendingDiscussions = [
    {
      id: 3,
      title: 'Placeholder',
      responses: 20,
    },
    {
      id: 4,
      title: 'Placeholder',
      responses: 15,
    },
  ];

  openDiscussion(id: number): void {}
}
