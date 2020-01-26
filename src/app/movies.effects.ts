import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {MoviesHttpService} from './movies-http.service';
import {concatMap, map, mergeMap, tap} from 'rxjs/operators';
import {SearchMovie} from './models/searchMovie';
import {loadResults, MovieSearchActionTypes, updateResult} from './movies.actions';
import {Store} from '@ngrx/store';
import {selectGlobalSearchFilterText} from './movie.selectors';

@Injectable()
export class MoviesEffects {

  LoadResults$ = createEffect(
    () => this.actions$.pipe(
        ofType(MovieSearchActionTypes.loadResults),
      tap( () => this.store.select(selectGlobalSearchFilterText)),
      concatMap((title) => this.moviesHttpService.getMoviesByTitle(title)),
      map(movies => updateResult({result: movies}))
      )
  );
  // LoadMoviesRequest$ = createEffect( () =>
  // this.actions$.pipe(
  //   ofType(loadResults),
  //   mergeMap(() => this.moviesHttpService.getMoviesByTitle('Batman')
  //     .pipe(
  //       map( movies => ({type: '[Movies API] Movies Loaded Success', result: movies })))
  //     )
  // ));

  constructor(private  actions$: Actions,
              private readonly store: Store<{}>,
              private moviesHttpService: MoviesHttpService) {
  }

}
