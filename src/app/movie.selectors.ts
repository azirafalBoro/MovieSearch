import { createFeatureSelector, createSelector } from '@ngrx/store';
import {globalSearchFeatureKey, MovieSearchFilterState} from './movies.reducer';

export const selectGlobalSearchFilter = createFeatureSelector<MovieSearchFilterState>(globalSearchFeatureKey);

export const selectGlobalSearchFilterText = createSelector(selectGlobalSearchFilter,
  (paramSearch: MovieSearchFilterState)  => paramSearch.filterByName);

export const selectMovieResult = createSelector(selectGlobalSearchFilter,
  (paramSearch: MovieSearchFilterState)  => paramSearch.result);

export const areMovieLoaded = createSelector(selectGlobalSearchFilter,
  (paramSearch: MovieSearchFilterState)  => paramSearch.movieLoaded);
