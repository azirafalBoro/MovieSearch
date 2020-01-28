import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subject} from 'rxjs';

import {MoviesHttpService} from '../../movies-http.service';
import {SearchMovie} from '../../models/searchMovie';
import {Movie} from '../../models/movie';
import { Router } from '@angular/router';
import { loadResultsPage, updatePage } from '../../movies.actions';
import {select, Store} from '@ngrx/store';
import {selectMovieResult, selectPageRange} from '../../movie.selectors';

@Component({
  selector: 'app-movies-result-tables',
  templateUrl: './movies-result-tables.component.html',
  styleUrls: ['./movies-result-tables.component.scss']
})
export class MoviesResultTablesComponent implements OnInit, OnDestroy {
  private readonly ngUnsubscribe: Subject<void> = new Subject<void>();
  private movieResult$: Observable<SearchMovie>;
  private pageRange$: Observable<number>;
  cols: any[];

  selectedMovie: Movie;
  constructor(private moviesService: MoviesHttpService,
              private router: Router,
              private readonly store: Store<{}>) {
    this.movieResult$ = this.store.pipe(select(selectMovieResult));
  }

  ngOnInit() {
    this.movieResult$ = this.store.pipe(select(selectMovieResult));
    this.pageRange$ = this.store.pipe(select(selectPageRange));
    this.cols = [
      { field: 'Poster', header: 'Poster' },
      { field: 'Title', header: 'Title' },
      { field: 'Year', header: 'Year' },
      // { field: 'imdbID', header: 'imdbID' },
      // { field: 'Type', header: 'Type' },
    ];

  }

  loadMovie(event) {
    const page = (event.page + 1).toString();
    this.store.dispatch(updatePage({pageNumber: page, itemsPerPage: event.first}));
    this.store.dispatch(loadResultsPage({pageNumber: page}));
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  onRowSelect(event) {
    this.router.navigate(['details/' + event.data.imdbID]);
  }

}
