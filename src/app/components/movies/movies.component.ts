import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import {
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit, OnDestroy {
  movieTitle = '';
  debounceTime = 400;
  changeValueSubject: Subject<string>;

  // @ViewChild('searchInput', {static: false}) input: ElementRef;

  constructor() {
  }


  ngOnInit() {
    this.changeValueSubject = new Subject<string>();
    this.changeValueSubject
      .pipe(
        debounceTime(this.debounceTime),
        distinctUntilChanged())
      .subscribe((value: string) => {
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
