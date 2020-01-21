import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {map, takeUntil} from 'rxjs/operators';

import {MoviesService} from '../../movies.service';
import {SearchMovie} from '../../models/searchMovie';
import {Movie} from '../../models/movie';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movies-result-tables',
  templateUrl: './movies-result-tables.component.html',
  styleUrls: ['./movies-result-tables.component.scss']
})
export class MoviesResultTablesComponent implements OnInit, OnChanges, OnDestroy {
  private readonly ngUnsubscribe: Subject<void> = new Subject<void>();
  private moviesObservable$: Observable<Movie[]> ;
  // private moviesObservable$: Observable<SearchMovie> ;
  cols: any[];
  selectedMovie: Movie;
  @Input() movieTitle: string;
  constructor(private moviesService: MoviesService,
              private router: Router) { }

  ngOnInit() {
    // this.moviesObservable$ = this.moviesService.getMoviesByTitle(this.movieTitle)
    //   .pipe(
    //     takeUntil(this.ngUnsubscribe),
    //     map((foundMovie: SearchMovie) => foundMovie.Search)
    //   );

    this.cols = [
      { field: 'Poster', header: 'Poster' },
      { field: 'Title', header: 'Title' },
      { field: 'Year', header: 'Year' },
      // { field: 'imdbID', header: 'imdbID' },
      // { field: 'Type', header: 'Type' },
    ];
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.movieTitle !== '') {
      this.moviesObservable$ = this.moviesService.getMoviesByTitle(this.movieTitle)
        .pipe(
          takeUntil(this.ngUnsubscribe),
          map((foundMovie: SearchMovie) => foundMovie.Search)
        );
    }
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  onRowSelect(event) {
    console.log(event.data.imdbID);
    this.router.navigate(['details/' + event.data.imdbID]);
  }

}
