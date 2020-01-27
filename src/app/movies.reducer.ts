import {Action, createReducer, on} from '@ngrx/store';
import {updatePage, updateResult, updateSearch} from './movies.actions';
import {SearchMovie} from './models/searchMovie';

export interface MovieSearchFilterState {
  pageNumber: number;
  itemsPerPage: number;
  // sortedBy: ParameterSearchSorting
  // sortOrder: 'desc' | 'asc'
  movieLoaded: boolean;
  filterByName: string;
  result: SearchMovie;
  // items: SearchParameterResult[]
  // total: number;
}

export const initialState: MovieSearchFilterState = {
  pageNumber: 1,
  itemsPerPage: 0,
  // sortedBy: 'parameterFullName',
  // sortOrder: 'asc',
  movieLoaded: false,
  filterByName: '',
  result: undefined
  // items: [],
  // total: 0,
};

export const globalSearchFeatureKey = 'searchedMovie';

export const movieReducer = createReducer(
  initialState,
  on(updateSearch, (state: MovieSearchFilterState, action): MovieSearchFilterState => ({
    ...state, filterByName: action.searchedMovie, movieLoaded: action.movieLoaded
  })),
  on(updateResult, (state: MovieSearchFilterState, action): MovieSearchFilterState => ({
    ...state, result: action.result, movieLoaded: true
  })),
  on(updatePage, (state: MovieSearchFilterState, action): MovieSearchFilterState => ({
    ...state, pageNumber: action.pageNumber, itemsPerPage: action.itemsPerPage
  }))
);

export function reducer(state: MovieSearchFilterState , action: Action) {
  return movieReducer(state, action);
}
