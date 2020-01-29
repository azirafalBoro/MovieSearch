import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {MoviesHttpService} from './movies-http.service';
import {concatMap, filter, map, withLatestFrom} from 'rxjs/operators';
import {clearDetailsResult, MovieSearchActionTypes, updateDetailsResult, updateResult} from './movies.actions';
import {Store} from '@ngrx/store';
import {
  selectMovieResult,
  selectPageNumber,
  selectSearchedMovieTitle,
  selectSearchedMovieYear
} from './movie.selectors';
import {forkJoin} from 'rxjs';


@Injectable()
export class MoviesEffects {

  LoadResultsPage$ = createEffect(
    () => this.actions$.pipe(
      ofType(MovieSearchActionTypes.loadResultsPage),
      withLatestFrom(
        this.store.select(selectPageNumber),
        this.store.select(selectSearchedMovieTitle),
        this.store.select(selectSearchedMovieYear)
      ),
      concatMap(([, page, title, year]) => {
        if (year === '') {
          return this.moviesHttpService.getMoviesByTitleNextPage(title, page.toString());
        } else {
          return this.moviesHttpService.getMoviesByTitleAndYearNextPage(title, year, page.toString());
        }

      }),
      map(response => updateResult({result: response})),

    )
  );

  LoadResults$ = createEffect(
    () => this.actions$.pipe(
      ofType(MovieSearchActionTypes.loadResults),
      withLatestFrom(
        this.store.select(selectSearchedMovieTitle),
        this.store.select(selectSearchedMovieYear)
      ),
      concatMap(([, title, year]) => {
        if (year === '') {
          return this.moviesHttpService.getMoviesByTitle(title);
        } else {
          return this.moviesHttpService.getMoviesByTitleAndYear(title, year);
        }
      }),
      map(movies => updateResult({result: movies}))
    )
  );

  ClearDetailsResults$ = createEffect(
    () => this.actions$.pipe(
      ofType(MovieSearchActionTypes.updateResult),
      map(clearDetailsResult)
    )
  );

  LoadDetailsResults$ = createEffect(
    () => this.actions$.pipe(
      ofType(MovieSearchActionTypes.clearDetailsResult),
      withLatestFrom(
        this.store.select(selectMovieResult),
      ),
      filter(([, result]) => result.Search && result.Search.length > 0),
      concatMap(([, result]) =>
          forkJoin(result.Search.map(movie =>
          this.moviesHttpService.getMovieById(movie.imdbID)
        ))
      ),
      map(movies => updateDetailsResult({detailsResult: movies}))
    )
  );

  constructor(private  actions$: Actions,
              private readonly store: Store<{}>,
              private moviesHttpService: MoviesHttpService) {
  }

}
