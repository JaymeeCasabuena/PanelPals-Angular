import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comic } from '../../interfaces/comic';
import { Genre } from '../../interfaces/genre';

@Injectable({
  providedIn: 'root',
})
export class ComicService {
  private apiUrl = environment.apiUrl;

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
  }): Observable<Comic[]> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Comic[]>(`${this.apiUrl}/comics/`, comicData, {
      headers,
    });
  }

  getAllComics(): Observable<Comic[]> {
    return this.http.get<Comic[]>(`${this.apiUrl}/comics/getAll`);
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
}
