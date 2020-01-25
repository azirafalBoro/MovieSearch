import {createAction, props} from '@ngrx/store';
import {SearchMovie} from './models/searchMovie';

export enum MovieSearchActionTypes {
  updateSearch = '[Search Movie Change] Change',
  updateResult = '[Search Movie Change] Change'
}

export const updateSearch = createAction(MovieSearchActionTypes.updateSearch, props<{ searchedMovie: string }>());
export const updateResult = createAction(MovieSearchActionTypes.updateResult, props<{ result: SearchMovie }>());
