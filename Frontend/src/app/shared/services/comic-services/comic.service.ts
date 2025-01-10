import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs';
import { Comic } from '../../interfaces/comic';
import { Genre } from '../../interfaces/genre';

@Injectable({
  providedIn: 'root',
})
export class ComicService {
  private apiUrl = environment.apiUrl;

  private comicsSubject = new BehaviorSubject<Comic[]>([]);
  comics$ = this.comicsSubject.asObservable();

  constructor(private http: HttpClient) {}

  addComic(comicData: {
    title: string;
    yearPublished: number;
    genres: [number];
    status: number;
    link: string;
    summary: string;
    authorName: string;
    cover: string;
  }): Observable<Comic> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http
      .post<Comic>(`${this.apiUrl}/comics/`, comicData, {
        headers,
      })
      .pipe(
        tap((newComic) => {
          const currentComics = this.comicsSubject.value;
          this.comicsSubject.next([...currentComics, newComic]);
        })
      );
  }

  getAllComics(): Observable<Comic[]> {
    return this.http
      .get<Comic[]>(`${this.apiUrl}/comics/getAll`)
      .pipe(tap((comics) => this.comicsSubject.next(comics)));
  }

  getPopularComics(): Observable<Comic[]> {
    return this.http.get<Comic[]>(`${this.apiUrl}/comics/getPopular`);
  }

  getAllGenres(): Observable<Genre[]> {
    return this.http.get<Genre[]>(`${this.apiUrl}/comics/genres`);
  }

  getComicById(id: number): Observable<Comic> {
    return this.http.get<Comic>(`${this.apiUrl}/comics/${id}`);
  }

  searchComics(query: string): Observable<Comic[]> {
    return this.http.get<Comic[]>(`${this.apiUrl}/comics/search`, {
      params: { q: query },
    });
  }
}
