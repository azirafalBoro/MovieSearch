import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {map, takeUntil} from 'rxjs/operators';

import {MoviesHttpService} from '../../movies-http.service';
import {SearchMovie} from '../../models/searchMovie';
import {Movie} from '../../models/movie';
import { Router } from '@angular/router';
import {updateResult} from '../../movies.actions';
import {select, Store} from '@ngrx/store';
import {selectMovieResult} from '../../movie.selectors';

@Component({
  selector: 'app-movies-result-tables',
  templateUrl: './movies-result-tables.component.html',
  styleUrls: ['./movies-result-tables.component.scss']
})
export class MoviesResultTablesComponent implements OnInit, OnChanges, OnDestroy {
  private readonly ngUnsubscribe: Subject<void> = new Subject<void>();
  private movieResult$: Observable<SearchMovie>;
  cols: any[];
  selectedMovie: Movie;
  @Input() movieTitle: string;
  constructor(private moviesService: MoviesHttpService,
              private router: Router,
              private readonly store: Store<{}>) {
    this.movieResult$ = this.store.pipe(select(selectMovieResult));
    console.log('constructor');
  }

  ngOnInit() {
    console.log('ngOnInit');
    this.movieResult$ = this.store.pipe(select(selectMovieResult));

    this.cols = [
      { field: 'Poster', header: 'Poster' },
      { field: 'Title', header: 'Title' },
      { field: 'Year', header: 'Year' },
      // { field: 'imdbID', header: 'imdbID' },
      // { field: 'Type', header: 'Type' },
    ];
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('ngOnChanges');
    this.movieResult$ = this.store.pipe(select(selectMovieResult));
    this.movieResult$ = this.moviesService.getMoviesByTitle(this.movieTitle)
      .pipe(
        takeUntil(this.ngUnsubscribe),
        map((foundMovie: SearchMovie) => {
          this.store.dispatch(updateResult({result: foundMovie}));
          return foundMovie;
        })
      );
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
