import {Action, createReducer, on} from '@ngrx/store';
import {clearDetailsResult, updateDetailsResult} from './movies.actions';
import {movieDetails} from './models/movieDetails';
import {createEntityAdapter, EntityState} from '@ngrx/entity';

export interface MoviesResultDetails extends  EntityState<movieDetails> {
}

export const adapter = createEntityAdapter<movieDetails>({
  selectId: (movie: movieDetails) => movie.imdbID
});

export const initialMovieDetailsState = adapter.getInitialState();

export const globalMovieDetailsKey = 'movieDetails';

export const movieDetailsReducer = createReducer(
  initialMovieDetailsState,
  on(updateDetailsResult, (state, {detailsResult}) => adapter.addAll(detailsResult, state)),
  on(clearDetailsResult, (state) => adapter.removeAll(state)),
);

export const {
  selectEntities: selectMovieDetailsEntities,
  selectAll: selectAllMovieWithDetails
} = adapter.getSelectors();

export function detailsReducer(state: MoviesResultDetails , action: Action) {
  return movieDetailsReducer(state, action);
}
