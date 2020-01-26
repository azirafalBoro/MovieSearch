import { createFeatureSelector, createSelector } from '@ngrx/store';
import {globalSearchFeatureKey, MovieSearchFilterState} from './movies.reducer';

export const selectGlobalSearchFilter = createFeatureSelector<MovieSearchFilterState>(globalSearchFeatureKey);

export const selectSearchedMovieTitle = createSelector(selectGlobalSearchFilter,
  (paramSearch: MovieSearchFilterState)  => paramSearch.filterByName);

export const selectMovieResult = createSelector(selectGlobalSearchFilter,
  (paramSearch: MovieSearchFilterState)  => paramSearch.result);

export const areMovieLoaded = createSelector(selectGlobalSearchFilter,
  (paramSearch: MovieSearchFilterState)  => paramSearch.movieLoaded);

export const selectMovieTitle = createSelector(
  selectSearchedMovieTitle,
  (parameterRelationErrors): string => {
    return parameterRelationErrors;
  }
);
