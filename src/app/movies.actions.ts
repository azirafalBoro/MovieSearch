import {createAction, props} from '@ngrx/store';
import {SearchMovie} from './models/searchMovie';

export enum MovieSearchActionTypes {
  updateSearch = '[Search Movie Change] Movie Title Change',
  updateResult = '[Search Movie Change] Result Change',
  loadResults = '[Search Movie Change] Load Results'
}

export const updateSearch = createAction(MovieSearchActionTypes.updateSearch, props<{ searchedMovie: string,  movieLoaded: boolean}>());
export const updateResult = createAction(MovieSearchActionTypes.updateResult, props<{ result: SearchMovie }>());
export const loadResults = createAction(MovieSearchActionTypes.loadResults);
