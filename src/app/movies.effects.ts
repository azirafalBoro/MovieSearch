import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {MoviesHttpService} from './movies-http.service';
import {concatMap, map, withLatestFrom} from 'rxjs/operators';
import {MovieSearchActionTypes, updateResult} from './movies.actions';
import {Store} from '@ngrx/store';
import {selectPageNumber, selectSearchedMovieTitle, selectSearchedMovieYear} from './movie.selectors';


@Injectable()
export class MoviesEffects {

  LoadResults$ = createEffect(
    () => this.actions$.pipe(
      ofType(MovieSearchActionTypes.loadResults),
      withLatestFrom(
        this.store.select(selectSearchedMovieTitle),
        this.store.select(selectSearchedMovieYear)
      ),
      concatMap(([, title, year]) => {
        console.log('title', title, 'year', year);

        if (year === '') {
          return this.moviesHttpService.getMoviesByTitle(title);
        } else {
          return this.moviesHttpService.getMoviesByTitleAndYear(title, year);
        }
      }),
      map(movies => updateResult({result: movies}))
    )
  );

  LoadResultsPage$ = createEffect(
    () => this.actions$.pipe(
      ofType(MovieSearchActionTypes.loadResultsPage),
      withLatestFrom(
        this.store.select(selectPageNumber),
        this.store.select(selectSearchedMovieTitle),
        this.store.select(selectSearchedMovieYear)
      ),
      concatMap(([, page, title, year]) => {
        console.log('title', title, 'year', year, 'page', page);

        if (year === '') {
          return this.moviesHttpService.getMoviesByTitleNextPage(title, page.toString());
        } else {
          return this.moviesHttpService.getMoviesByTitleAndYearNextPage(title, year, page.toString());
        }

      }),
      map(movies => updateResult({result: movies}))
    )
  );

  constructor(private  actions$: Actions,
              private readonly store: Store<{}>,
              private moviesHttpService: MoviesHttpService) {
  }

}
