import { createFeatureSelector, createSelector } from '@ngrx/store';
import {globalSearchFeatureKey, MovieSearchFilterState} from './movies.reducer';

export const selectGlobalSearchFilter = createFeatureSelector<MovieSearchFilterState>(globalSearchFeatureKey);

// export const selectGlobalSearchFilteredItems = createSelector(selectGlobalSearchFilter,
//   (paramSearch: GlobalSearchFilterState) => paramSearch.items);
// export const selectGlobalSearchSortOrder = createSelector(selectGlobalSearchFilter,
//   (paramSearch: GlobalSearchFilterState) => paramSearch.sortOrder);
// export const selectGlobalSearchTotal = createSelector(selectGlobalSearchFilter,
//   (paramSearch: GlobalSearchFilterState) => paramSearch.total);
// export const selectGlobalSearchItemsPerPage = createSelector(selectGlobalSearchFilter,
//   (paramSearch: GlobalSearchFilterState) => paramSearch.itemsPerPage);
// export const selectGlobalSearchPageNumber = createSelector(selectGlobalSearchFilter,
//   (paramSearch: GlobalSearchFilterState) => paramSearch.pageNumber);
// export const selectGlobalSearchFilteringData = createSelector(selectGlobalSearchFilter,
//   (paramSearch: GlobalSearchFilterState) => {
//     return { sortedBy: paramSearch.sortedBy, sortOrder: paramSearch.sortOrder};
//   });
export const selectGlobalSearchFilterText = createSelector(selectGlobalSearchFilter,
  (paramSearch: MovieSearchFilterState)  => paramSearch.filterByName);

export const selectMovieResult = createSelector(selectGlobalSearchFilter,
  (paramSearch: MovieSearchFilterState)  => paramSearch.result);
// export const selectGlobalItems = createSelector(selectGlobalSearchFilter,
//   (paramSearch: GlobalSearchFilterState) => paramSearch.items);

