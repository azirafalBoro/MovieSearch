import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {MoviesHttpService} from './movies-http.service';
import {concatMap, map, withLatestFrom} from 'rxjs/operators';
import {MovieSearchActionTypes, updateResult} from './movies.actions';
import {Store} from '@ngrx/store';
import {selectSearchedMovieTitle} from './movie.selectors';


@Injectable()
export class MoviesEffects {

  LoadResults$ = createEffect(
    () => this.actions$.pipe(
      ofType(MovieSearchActionTypes.loadResults),
      withLatestFrom(this.store.select(selectSearchedMovieTitle)),
      concatMap(([, title]) => {
        console.log('title', title);

        return this.moviesHttpService.getMoviesByTitle(title);
      }),
      map(movies => updateResult({result: movies}))
    )
  );

  constructor(private  actions$: Actions,
              private readonly store: Store<{}>,
              private moviesHttpService: MoviesHttpService) {
  }

}
