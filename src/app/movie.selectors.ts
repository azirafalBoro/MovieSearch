import { createFeatureSelector, createSelector } from '@ngrx/store';
import {globalSearchFeatureKey, MovieSearchState} from './movies.reducer';

export const selectMovieSearch = createFeatureSelector<MovieSearchState>(globalSearchFeatureKey);

export const selectSearchedMovieTitle = createSelector(selectMovieSearch,
  (paramSearch: MovieSearchState)  => paramSearch.filterByName);

export const selectSearchedMovieYear = createSelector(selectMovieSearch,
  (paramSearch: MovieSearchState)  => paramSearch.filterByYear);

export const selectMovieResult = createSelector( selectMovieSearch,
  (paramSearch: MovieSearchState)  => paramSearch.result);

export const selectPageRange = createSelector( selectMovieSearch,
  (paramSearch: MovieSearchState)  => paramSearch.itemsPerPage);

export const selectPageNumber = createSelector( selectMovieSearch,
  (paramSearch: MovieSearchState)  => paramSearch.pageNumber);

export const areMovieLoaded = createSelector(selectMovieSearch,
  (paramSearch: MovieSearchState)  => paramSearch.movieLoaded);
