import {Action, createReducer, on} from '@ngrx/store';
import {updatePage, updateResult, updateSearch, updateYear} from './movies.actions';
import {SearchMovie} from './models/searchMovie';

export interface MovieSearchState {
  pageNumber: number;
  itemsPerPage: number;
  movieLoaded: boolean;
  filterByName: string;
  filterByYear: string;
  result: SearchMovie;
}

export const initialState: MovieSearchState = {
  pageNumber: 1,
  itemsPerPage: 0,
  movieLoaded: false,
  filterByName: '',
  filterByYear: '',
  result: undefined
};

export const globalSearchFeatureKey = 'searchedMovie';

export const movieReducer = createReducer(
  initialState,
  on(updateSearch, (state: MovieSearchState, action): MovieSearchState => ({
    ...state, filterByName: action.searchedMovie, movieLoaded: action.movieLoaded
  })),
  on(updateYear, (state: MovieSearchState, action): MovieSearchState => ({
    ...state, filterByYear: action.searchedYear, movieLoaded: action.movieLoaded
  })),
  on(updateResult, (state: MovieSearchState, action): MovieSearchState => ({
    ...state, result: action.result, movieLoaded: true
  })),
  on(updatePage, (state: MovieSearchState, action): MovieSearchState => ({
    ...state, pageNumber: action.pageNumber, itemsPerPage: action.itemsPerPage
  }))
);

export function reducer(state: MovieSearchState , action: Action) {
  return movieReducer(state, action);
}
