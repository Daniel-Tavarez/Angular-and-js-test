import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie, MovieResponse } from '../models/movie.model';

@Injectable({
  providedIn: 'root',
})

export class MovieService {
  private baseUrl = 'https://api.themoviedb.org/3/movie/top_rated?api_key=bf091621962bdf5c30339e874a2a0c1a&language=en-US&page=1';
  private getByIdUrl = 'https://api.themoviedb.org/3/movie'
  private apiKey = "bf091621962bdf5c30339e874a2a0c1a";

  constructor(private http: HttpClient) {}

  getAll(): Observable<MovieResponse> {
    return this.http.get<MovieResponse>(this.baseUrl);
  }

  getById(id: number): Observable<Movie> {
    const url = `${this.getByIdUrl}/${id}?api_key=${this.apiKey}`;
    return this.http.get<Movie>(url);
  }

  create(movie: MovieResponse): Observable<MovieResponse> {
    return this.http.post<MovieResponse>(this.baseUrl, movie);
  }
}