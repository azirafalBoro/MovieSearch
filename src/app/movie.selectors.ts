import { createFeatureSelector, createSelector } from '@ngrx/store';
import {globalSearchFeatureKey, MovieSearchState} from './movies.reducer';
import {globalMovieDetailsKey, MoviesResultDetails } from './movies-details.reducer';
import * as fromMovieDetails from './movies-details.reducer';


export const selectMovieSearchState = createFeatureSelector<MovieSearchState>(globalSearchFeatureKey);

export const selectDetailsMovieState = createFeatureSelector<MoviesResultDetails>(globalMovieDetailsKey);

export const selectSearchedMovieTitle = createSelector(selectMovieSearchState,
  (paramSearch: MovieSearchState)  => paramSearch.filterByName);

export const selectSearchedMovieYear = createSelector(selectMovieSearchState,
  (paramSearch: MovieSearchState)  => paramSearch.filterByYear);

export const selectMovieResult = createSelector( selectMovieSearchState,
  (paramSearch: MovieSearchState)  => paramSearch.result);

export const selectPageRange = createSelector( selectMovieSearchState,
  (paramSearch: MovieSearchState)  => paramSearch.itemsPerPage);

export const selectPageNumber = createSelector( selectMovieSearchState,
  (paramSearch: MovieSearchState)  => paramSearch.pageNumber);

export const areMovieLoaded = createSelector(selectMovieSearchState,
  (paramSearch: MovieSearchState)  => paramSearch.movieLoaded);

export const selectMovieDetailsEntities = createSelector(
  selectDetailsMovieState, fromMovieDetails.selectMovieDetailsEntities);

export const selectAllMovieWithDetails = createSelector(
  selectDetailsMovieState, fromMovieDetails.selectAllMovieWithDetails);

export const getMovieById = (planId: string) => createSelector(
  selectMovieDetailsEntities,
  (articleEntities) => articleEntities[planId]);

