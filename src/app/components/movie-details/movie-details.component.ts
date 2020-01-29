import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {Observable, Subscription} from 'rxjs';

import { MoviesHttpService } from '../../movies-http.service';
import { movieDetails } from '../../models/movieDetails';
import { Store} from '@ngrx/store';
import {getMovieById} from '../../movie.selectors';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit, OnDestroy {
  selectedMovie: {id: string};
  paramSubscription: Subscription;
  actorLimit: number;

  constructor(private moviesService: MoviesHttpService,
              private route: ActivatedRoute,
              private store: Store<{}>) {
    this.responsiveOptions = [
      {
        breakpoint: '1460px',
        numVisible: 10,
        numScroll: 10
      },
      {
        breakpoint: '1350px',
        numVisible: 9,
        numScroll: 9
      },
      {
        breakpoint: '1240px',
        numVisible: 8,
        numScroll: 8
      },
      {
        breakpoint: '1130px',
        numVisible: 7,
        numScroll: 7
      },
      {
        breakpoint: '1020px',
        numVisible: 6,
        numScroll: 6
      },
      {
        breakpoint: '910px',
        numVisible: 5,
        numScroll: 5
      },
      {
        breakpoint: '800px',
        numVisible: 4,
        numScroll: 4
      },
      {
        breakpoint: '574px',
        numVisible: 3,
        numScroll: 3
      }
    ];
  }

  movieIinformation = [
    'Year',
    'Rated',
    'Released',
    'Runtime',
    'Genre',
    'Language',
    'Country',
    'Awards',
    'Type',
    'DVD',
    'BoxOffice',
    'Production',
    'Website',
  ];

  private movieObservable$: Observable<movieDetails>;
  @Input() movieId: string;
  responsiveOptions;


  ngOnInit() {
    this.actorLimit = 12;
    this.selectedMovie = {
      id: this.route.snapshot.params.id
    };
    this.paramSubscription = this.route.params.subscribe(
      (params: Params) => {
        this.selectedMovie.id = params.id;
      }
    );
    this.movieObservable$ = this.store.select(getMovieById(this.selectedMovie.id));
  }

  ngOnDestroy(): void {
    // No needed but why not
    this.paramSubscription.unsubscribe();
  }

  private getRate(detail: movieDetails, source: string): string {
    if (typeof detail.Ratings !== 'undefined' && detail.Ratings.length > 0) {
      const rate = detail.Ratings.find(rating => rating.Source === source);
      if (!rate) { return '0'; }

      const separator = rate.Value.includes('/') ? '/' : '%';
      return rate.Value.split(separator)[0];
    }

    return '0';
  }



}
