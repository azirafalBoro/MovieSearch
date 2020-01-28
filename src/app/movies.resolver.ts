import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {filter, finalize, first, tap} from 'rxjs/operators';
import {loadResults} from './movies.actions';
import {areMovieLoaded} from './movie.selectors';

@Injectable()
export class MoviesResolver implements Resolve<any> {

  loading = false;

  constructor(private store: Store<{}>) {}

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<any> {
    return this.store
      .pipe(
        select(areMovieLoaded),
        tap(movieLoaded => {
          if (!this.loading && !movieLoaded) {
            this.loading = true;
            this.store.dispatch(loadResults());
          }
        }),
        filter(movieLoaded => movieLoaded),
        first(),
        finalize(() => this.loading = false)
      );

  }
}
