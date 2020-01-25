import {Action, createReducer, on} from '@ngrx/store';
import {updateResult, updateSearch} from './movies.actions';
import {SearchMovie} from './models/searchMovie';

export interface MovieSearchFilterState {
  // pageNumber: number;
  // itemsPerPage: number;
  // sortedBy: ParameterSearchSorting
  // sortOrder: 'desc' | 'asc'
  filterByName: string;
  result: SearchMovie;
  // items: SearchParameterResult[]
  // total: number;
}

export const initialState: MovieSearchFilterState = {
  // pageNumber: 1,
  // itemsPerPage: 17,
  // sortedBy: 'parameterFullName',
  // sortOrder: 'asc',
  filterByName: '',
  result: undefined
  // items: [],
  // total: 0,
};

export const globalSearchFeatureKey = 'searchedMovie';

export const movieReducer = createReducer(
  initialState,
  // on(updateSearch, (state: MovieSearchFilterState, {searchedMovie}): MovieSearchFilterState => {
  //   return {...state, filterByName: searchedMovie};
  // }),
  on(updateSearch, (state: MovieSearchFilterState, action): MovieSearchFilterState => ({
    ...state, filterByName: action.searchedMovie
  })),
  // on(updateResult, (state: MovieSearchFilterState, {searchedMovie}): MovieSearchFilterState => {
  //   return {...state, result: searchedMovie};
  // }),
  on(updateResult, (state: MovieSearchFilterState, action): MovieSearchFilterState => ({
    ...state, result: action.result
  }))
);

export function reducer(state: MovieSearchFilterState , action: Action) {
  return movieReducer(state, action);
}
