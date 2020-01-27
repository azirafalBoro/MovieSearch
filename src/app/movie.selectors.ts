import { createFeatureSelector, createSelector } from '@ngrx/store';
import {globalSearchFeatureKey, MovieSearchFilterState} from './movies.reducer';

export const selectGlobalSearchFilter = createFeatureSelector<MovieSearchFilterState>(globalSearchFeatureKey);

export const selectSearchedMovieTitle = createSelector(selectGlobalSearchFilter,
  (paramSearch: MovieSearchFilterState)  => paramSearch.filterByName);

// export const selectMovieTitle = createSelector(
//   selectSearchedMovieTitle,
//   (parameterRelationErrors): string => {
//     return parameterRelationErrors;
//   }
// );

export const selectMovieResult = createSelector( selectGlobalSearchFilter,
  (paramSearch: MovieSearchFilterState)  => paramSearch.result);

export const selectPageRange = createSelector( selectGlobalSearchFilter,
  (paramSearch: MovieSearchFilterState)  => paramSearch.itemsPerPage);

export const selectPageNumber = createSelector( selectGlobalSearchFilter,
  (paramSearch: MovieSearchFilterState)  => paramSearch.pageNumber);

export const areMovieLoaded = createSelector(selectGlobalSearchFilter,
  (paramSearch: MovieSearchFilterState)  => paramSearch.movieLoaded);
