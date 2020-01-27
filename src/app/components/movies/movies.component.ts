import {debounceTime, distinctUntilChanged, tap} from 'rxjs/operators';
import {
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import { Store} from '@ngrx/store';
import {loadResults, updateSearch} from '../../movies.actions';
import {selectSearchedMovieTitle} from '../../movie.selectors';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit, OnDestroy {
  searchText$: Observable<string>;
  movieTitle = '';
  debounceTime = 400;
  changeValueSubject: Subject<string>;

  constructor(private readonly store: Store<{}>) {
  }


  ngOnInit() {
    this.searchText$ = this.store.select(selectSearchedMovieTitle);
    this.changeValueSubject = new Subject<string>();
    this.changeValueSubject
      .pipe(
        debounceTime(this.debounceTime),
        distinctUntilChanged())
      .subscribe((value: string) => {
        this.store.dispatch(updateSearch({searchedMovie: value , movieLoaded: false}));
        this.store.dispatch(loadResults());
        // this.movieTitle = value;
      });
  }

  onValueChange(event): void {
    this.changeValueSubject.next(event.target.value);
  }

  ngOnDestroy(): void {
    this.changeValueSubject.complete();
  }

}
