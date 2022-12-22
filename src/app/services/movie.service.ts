import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private baseUrl = 'http://localhost:8080/api/movie';

  constructor(private http:HttpClient) { }
  getMovieList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`+'findAll');
  }

  createMovie(movie: object): Observable<object> {
    return this.http.post(`${this.baseUrl}`+'create', movie);
  }

  getMovie(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  searchMovie(movie: object): Observable<Object> {
    return this.http.get(`${this.baseUrl}`+'search');
  }
}
