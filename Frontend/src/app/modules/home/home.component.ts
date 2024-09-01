import {
  Component,
  AfterViewInit,
  OnInit,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import Flickity from 'flickity';
import { StarRatingComponent } from '../../shared/components/star-rating/star-rating.component';
import { SideBarComponent } from '../../shared/components/side-bar/side-bar.component';
import { SearchBarComponent } from '../../shared/components/search-bar/search-bar.component';
import { BookService } from '../../shared/services/book-services/book.service';
import { Book } from '../../shared/interfaces/book';

interface PopularBooks {
  title: string;
  author: string;
  summary: string;
  imageUrl: string;
}

interface Author {
  name: string;
  totalBooksPublished: number;
  averageRating: number;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    StarRatingComponent,
    SideBarComponent,
    SearchBarComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements AfterViewInit, OnInit {
  @ViewChild('flickityContainer', { static: false })
  flickityContainer!: ElementRef;
  books: Book[] = [];

  authors: Author[] = [
    { name: 'Sebastian Jeremy', totalBooksPublished: 12, averageRating: 3.6 },
    { name: 'Jonathan Doe', totalBooksPublished: 12, averageRating: 3.6 },
    { name: 'Angeline Summer', totalBooksPublished: 12, averageRating: 3.6 },
    { name: 'Noah Jones', totalBooksPublished: 12, averageRating: 3.6 },
    { name: 'Tommy Adam', totalBooksPublished: 12, averageRating: 3.6 },
    { name: 'Ian Cassandra', totalBooksPublished: 12, averageRating: 3.6 },
    { name: 'Sebastian Jeremy', totalBooksPublished: 12, averageRating: 3.6 },
    { name: 'Jonathan Doe', totalBooksPublished: 12, averageRating: 3.6 },
    { name: 'Angeline Summer', totalBooksPublished: 12, averageRating: 3.6 },
    { name: 'Noah Jones', totalBooksPublished: 12, averageRating: 3.6 },
    { name: 'Tommy Adam', totalBooksPublished: 12, averageRating: 3.6 },
    { name: 'Ian Cassandra', totalBooksPublished: 12, averageRating: 3.6 },
  ];

  popularBooks: PopularBooks[] = [
    {
      title: 'BIG MAGIC',
      author: 'Elizabeth Gilbert',
      summary:
        'Readers of all ages and walks of life have drawn inspiration and empowerment from Elizabeth Gilbert’s books for years.',
      imageUrl:
        'https://images-na.ssl-images-amazon.com/images/I/81WcnNQ-TBL.jpg',
    },
    {
      title: 'Ten Thousand Skies Above You',
      author: 'Claudia Gray',
      summary:
        "The hunt for each splinter of Paul's soul sends Marguerite racing through a war-torn San Francisco.",
      imageUrl:
        'https://i.pinimg.com/originals/a8/b9/ff/a8b9ff74ed0f3efd97e09a7a0447f892.jpg',
    },
    {
      title: 'The Great Gatsby',
      author: 'F.Scott Fitzgerald',
      summary:
        'The Great Gatsby, F. Scott Fitzgerald’s third book, stands as the supreme achievement of his career.',
      imageUrl:
        'https://m.media-amazon.com/images/I/41NssxNlPlS._SY445_SX342_.jpg',
    },
    {
      title: 'After You',
      author: 'Jojo Moyes',
      summary:
        'Louisa Clark is no longer just an ordinary girl living an ordinary life. After the transformative six months spent.',
      imageUrl:
        'https://images-na.ssl-images-amazon.com/images/I/81UWB7oUZ0L.jpg',
    },
  ];

  constructor(private bookService: BookService) {}

  ngAfterViewInit() {
    new Flickity(this.flickityContainer.nativeElement, {
      wrapAround: true,
    });
  }

  ngOnInit(): void {
    this.fetchAllBooks();
  }

  fetchAllBooks(): void {
    this.bookService.getAllBooks().subscribe({
      next: (response) => (this.books = response),
      error: (error) => console.error('Error fetching books', error),
      complete: () => console.log('Fetching books complete'),
    });
  }
}
