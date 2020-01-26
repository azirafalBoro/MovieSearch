import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, filter, map} from 'rxjs/operators';
import {SearchMovie} from "./models/searchMovie";

@Injectable({
  providedIn: 'root'
})
export class MoviesHttpService {
  baseUrl = 'http://www.omdbapi.com/?apikey=305ce001&';

  constructor(private http: HttpClient) { }

  // getAlbums() {
  //   return this.http.get<any>('http://www.omdbapi.com/?apikey=305ce001&s=batman')
  //     .subscribe((res) => {
  //       console.log(res);
  //
  //       return res;
  //   });
  // }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }

    return throwError(
      'Something bad happened; please try again later.');
  }

  getMoviesByTitle(title: string): Observable<SearchMovie> {
    return this.http.get<SearchMovie>(this.baseUrl + 's=' + title).pipe(
      catchError(this.handleError)
    );
  }

  getMovieById(id: string) {
    return this.http.get<any>(this.baseUrl + 'i=' + id).pipe(
      catchError(this.handleError)
    );
  }

}
