import {Action, createReducer, on} from '@ngrx/store';
import {updateSearch} from './movies.actions';

// export const initialState = '';

export interface MovieSearchFilterState {
  // pageNumber: number;
  // itemsPerPage: number;
  // sortedBy: ParameterSearchSorting
  // sortOrder: 'desc' | 'asc'
  filterByName: string;
  // items: SearchParameterResult[]
  // total: number;
}

export const initialState: MovieSearchFilterState = {
  // pageNumber: 1,
  // itemsPerPage: 17,
  // sortedBy: 'parameterFullName',
  // sortOrder: 'asc',
  filterByName: '',
  // items: [],
  // total: 0,
};

export const movieReducer = createReducer(
  initialState,
  on(updateSearch, (state: MovieSearchFilterState, {filter}): MovieSearchFilterState => {
    return {...state, filterByName: filter};
  })
);

export function reducer(state: MovieSearchFilterState , action: Action) {
  return movieReducer(state, action);
}
