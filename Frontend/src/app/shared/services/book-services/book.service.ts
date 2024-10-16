import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../../interfaces/book';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  addBook(bookData: {
    title: string;
    isbn: string;
    yearPublished: number;
    genre: string;
    summary: string;
    authorId: number;
    bookImg: string;
  }): Observable<Book[]> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Book[]>(`${this.apiUrl}/addBook`, bookData, {
      headers,
    });
  }

  getAllBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.apiUrl}/books/getAllBooks`);
  }
}
