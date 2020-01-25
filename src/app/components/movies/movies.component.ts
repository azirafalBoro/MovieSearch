import {debounceTime, distinctUntilChanged, tap} from 'rxjs/operators';
import {
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Router} from '@angular/router';
import { Store} from '@ngrx/store';
import {updateSearch} from '../../movies.actions';
import {selectGlobalSearchFilterText} from '../../movie.selectors';

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

  // @ViewChild('searchInput', {static: false}) input: ElementRef;

  constructor(
    private readonly store: Store<{}>,
    private readonly router: Router) {
    // this.searchText$ = store.pipe(select('filterByName'));
  }


  ngOnInit() {
    this.searchText$ = this.store.select(selectGlobalSearchFilterText);
    // this.searchingPhrase$ = this.store.pipe(select(selectGlobalSearchFilterText));
    this.changeValueSubject = new Subject<string>();
    this.changeValueSubject
      .pipe(
        debounceTime(this.debounceTime),
        distinctUntilChanged())
      .subscribe((value: string) => {
        this.store.dispatch(updateSearch({searchedMovie: value}));
        this.movieTitle = value;
      });
  }

  onValueChange(event): void {
    this.changeValueSubject.next(event.target.value);
  }

  ngOnDestroy(): void {
    this.changeValueSubject.complete();
  }

  // ngAfterViewInit(): void {
  //   fromEvent<any>(this.input.nativeElement, 'keyup')
  //     .pipe(
  //       map(event => event.target.value),
  //       debounceTime(this.debounceTime),
  //       distinctUntilChanged()
  //     ).subscribe((value: string) => {
  //     this.movieTitle = value;
  //   });
  // }

}
