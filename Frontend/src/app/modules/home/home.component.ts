import {
  Component,
  AfterViewInit,
  OnInit,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import Flickity from 'flickity';
import { SideBarComponent } from '../../shared/components/side-bar/side-bar.component';
import { SearchBarComponent } from '../../shared/components/search-bar/search-bar.component';
import { BookService } from '../../shared/services/book-services/book.service';
import { Book } from '../../shared/interfaces/book';
import { AddNewFormComponent } from '../books/add-new-book/add-new-form/add-new-form.component';

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
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements AfterViewInit, OnInit {
  @ViewChild('flickityContainer', { static: false })
  flickityContainer!: ElementRef;
  books: Book[] = [];
  book: any;

  constructor(private bookService: BookService, private router: Router) {}

  ngAfterViewInit() {
    setTimeout(() => {
      const flickity = new Flickity(this.flickityContainer.nativeElement, {
        wrapAround: true,
        groupCells: 3, // Groups three cells per slide
        cellAlign: 'left', // Align items horizontally
        contain: true, // Prevent overflowing cells
      });

      this.bookService.getAllBooks().subscribe(() => {
        flickity.reloadCells();
      });
    });
  }

  ngOnInit(): void {
    this.fetchAllBooks();
  }

  fetchAllBooks(): void {
    this.bookService.getAllBooks().subscribe({
      next: (response) => (this.books = response.slice(0, 5)),
      error: (error) => console.error('Error fetching books', error),
      complete: () => console.log('Fetching books complete'),
    });
  }


  navigateToDetails(bookId: number): void {
    this.router.navigate(['/book-details', bookId]);
  }
}
