import {createAction, props} from '@ngrx/store';

export enum MovieSearchActionTypes {
  updateSearch = '[Search Movie Change] Change',
}

// export const updateSearch = createAction('[Search Movie Change] Change');
export const updateSearch = createAction(MovieSearchActionTypes.updateSearch, props<{ filter: string }>());
// export const decrement = createAction('[Counter Component] Decrement');
// export const reset = createAction('[Counter Component] Reset');
