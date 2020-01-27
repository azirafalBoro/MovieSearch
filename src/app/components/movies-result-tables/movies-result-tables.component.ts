import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {map, takeUntil} from 'rxjs/operators';

import {MoviesHttpService} from '../../movies-http.service';
import {SearchMovie} from '../../models/searchMovie';
import {Movie} from '../../models/movie';
import { Router } from '@angular/router';
import {loadResults, loadResultsPage, updatePage, updateResult} from '../../movies.actions';
import {select, Store} from '@ngrx/store';
import {selectMovieResult, selectPageRange} from '../../movie.selectors';
import {LazyLoadEvent} from 'primeng/api';

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
  loading: boolean;

  selectedMovie: Movie;
  // @Input() movieTitle: string;
  constructor(private moviesService: MoviesHttpService,
              private router: Router,
              private readonly store: Store<{}>) {
    this.movieResult$ = this.store.pipe(select(selectMovieResult));
    console.log('constructor');
  }

  ngOnInit() {
    console.log('ngOnInit');

    this.movieResult$ = this.store.pipe(select(selectMovieResult));
    this.pageRange$ = this.store.pipe(select(selectPageRange));
    this.cols = [
      { field: 'Poster', header: 'Poster' },
      { field: 'Title', header: 'Title' },
      { field: 'Year', header: 'Year' },
      // { field: 'imdbID', header: 'imdbID' },
      // { field: 'Type', header: 'Type' },
    ];

    this.loading = false;
  }

  // loadMovie(event) {
  //   // event.first = Index of the first record
  //   // event.rows = Number of rows to display in new page
  //   // event.page = Index of the new page
  //   // event.pageCount = Total number of pages
  //   // console.log(event);
  //   // this.loading = true;
  //   // console.log('EVEN LAZY', event.page);
  //   // const page = (event.page + 1);
  //   console.log('event', event);
  //   this.pageNumber = event;
  //   // if (page !== 1) {
  //   this.movieResult$ = this.moviesService.getMoviesByTitleNextPage(this.movieTitle , event.toString())
  //     .pipe(
  //       takeUntil(this.ngUnsubscribe),
  //       map((foundMovie: SearchMovie) => {
  //         this.store.dispatch(updateResult({result: foundMovie}));
  //         // this.loading = false;
  //         // console.log(foundMovie);
  //
  //         return foundMovie;
  //       })
  //     );
  //   // }
  //   // this.loading = false;
  // }

  loadMovie(event) {
    // event.first = Index of the first record
    // event.rows = Number of rows to display in new page
    // event.page = Index of the new page
    // event.pageCount = Total number of pages
    // console.log(event);
    // this.loading = true;
    // console.log('EVEN LAZY', event.page);
    // const page = (event.page + 1);
    console.log('event', event);
    // this.pageNumber = event;
    // const page = (event.first + 10) / 10;
    const page = (event.page + 1).toString();
    this.store.dispatch(updatePage({pageNumber: page, itemsPerPage: event.first}));
    this.store.dispatch(loadResultsPage({pageNumber: page}));
    // if (page !== 1) {
    // this.loading = true;
    // this.movieResult$ = this.moviesService.getMoviesByTitleNextPage(this.movieTitle , page.toString())
    //   .pipe(
    //     takeUntil(this.ngUnsubscribe),
    //     map((foundMovie: SearchMovie) => {
    //       this.store.dispatch(updateResult({result: foundMovie}));
    //       this.loading = false;
    //       // console.log(foundMovie);
    //
    //       return foundMovie;
    //     })
    //   );
    // }
    // this.loading = false;
  }

  loadMovieLazy(event: LazyLoadEvent) {
    // this.loading = true;
    // console.log('EVEN LAZY', event);
    // const page = (event.first + 10) / 10;
    // console.log(page);
    // if (page !== 1) {
    // this.movieResult$ = this.moviesService.getMoviesByTitleNextPage(this.movieTitle , page.toString())
    //   .pipe(
    //     takeUntil(this.ngUnsubscribe),
    //     map((foundMovie: SearchMovie) => {
    //       this.store.dispatch(updateResult({result: foundMovie}));
    //       // this.loading = false;
    //       // console.log(foundMovie);
    //
    //       return foundMovie;
    //     })
    //   );
    // }
    // this.loading = false;
  }

  // ngOnChanges(changes: SimpleChanges): void {
  //   console.log('ngOnChanges');
  //   if (!this.loading) {
  //     this.loading = true;
  //     // this.movieResult$ = this.store.pipe(select(selectMovieResult));
  //     this.movieResult$ = this.moviesService.getMoviesByTitle(this.movieTitle)
  //       .pipe(
  //         takeUntil(this.ngUnsubscribe),
  //         map((foundMovie: SearchMovie) => {
  //           this.store.dispatch(updateResult({result: foundMovie}));
  //           this.loading = false;
  //
  //           return foundMovie;
  //         })
  //       );
  //   }
  //
  // }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  onRowSelect(event) {
    console.log(event.data.imdbID);
    this.router.navigate(['details/' + event.data.imdbID]);
  }

}
