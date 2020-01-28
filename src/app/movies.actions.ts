import {createAction, props} from '@ngrx/store';
import {SearchMovie} from './models/searchMovie';

export enum MovieSearchActionTypes {
  updateSearch = '[Search Movie Change] Movie Title Change',
  updateYear = '[Search Year Change] Movie Year Change',
  updateResult = '[Search Movie Change] Result Change',
  loadResults = '[Search Movie Change] Load Results',
  loadResultsPage = '[Search Movie Change] Load Results Page',
  updatePage = '[Search Movie Change] Update Selected Page'
}

export const updateSearch = createAction(MovieSearchActionTypes.updateSearch, props<{ searchedMovie: string,  movieLoaded: boolean}>());
export const updateYear = createAction(MovieSearchActionTypes.updateYear, props<{ searchedYear: string,  movieLoaded: boolean}>());
export const updateResult = createAction(MovieSearchActionTypes.updateResult, props<{ result: SearchMovie }>());
export const updatePage = createAction(MovieSearchActionTypes.updatePage, props<{ pageNumber: number, itemsPerPage: number }>());
export const loadResults = createAction(MovieSearchActionTypes.loadResults);
export const loadResultsPage = createAction(MovieSearchActionTypes.loadResultsPage, props<{ pageNumber: string}>());
