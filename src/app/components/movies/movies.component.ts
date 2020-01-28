import {debounceTime, distinctUntilChanged } from 'rxjs/operators';
import {
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import { Store} from '@ngrx/store';
import {loadResults, updateSearch, updateYear} from '../../movies.actions';
import {selectSearchedMovieTitle, selectSearchedMovieYear} from '../../movie.selectors';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit, OnDestroy {
  searchText$: Observable<string>;
  searchYear$: Observable<string>;
  debounceTime = 400;
  changeValueSubject: Subject<[string, string]>;

  constructor(private readonly store: Store<{}>) {
  }


  ngOnInit() {
    this.searchText$ = this.store.select(selectSearchedMovieTitle);
    this.searchYear$ = this.store.select(selectSearchedMovieYear);
    this.changeValueSubject = new Subject<[string, string]>();
    this.changeValueSubject
      .pipe(
        debounceTime(this.debounceTime),
        distinctUntilChanged())
      .subscribe((data: any) => {
        if (data[0] === 'title') {
          this.store.dispatch(updateSearch({searchedMovie: data[1] , movieLoaded: false}));
        } else {
          this.store.dispatch(updateYear({searchedYear: data[1] , movieLoaded: false}));
        }
        this.store.dispatch(loadResults());
      });
  }

  onTitleValueChange(event): void {
    this.changeValueSubject.next(['title', event.target.value]);
  }

  onYearValueChange(event): void {
    this.changeValueSubject.next(['year', event.target.value]);
  }

  ngOnDestroy(): void {
    this.changeValueSubject.complete();
  }

}
