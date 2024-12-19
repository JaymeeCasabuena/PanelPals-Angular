import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comic } from '../../interfaces/comic';

@Injectable({
  providedIn: 'root',
})
export class ComicService {
  private apiUrl = 'http://localhost:3000';

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
    return this.http.post<Comic[]>(
      `${this.apiUrl}/comics/addComic`,
      comicData,
      {
        headers,
      }
    );
  }

  getAllComics(): Observable<Comic[]> {
    return this.http.get<Comic[]>(`${this.apiUrl}/comics/getAllComics`);
  }

  getComicById(id: number): Observable<Comic> {
    return this.http.get<Comic>(`${this.apiUrl}/comics/getComicById/${id}`);
  }
}
