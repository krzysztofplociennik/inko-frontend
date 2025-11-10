import { ArticleSort, SortField, SortType } from "src/app/shared/sorting/sort-types.api";

export interface SearchFilter {
  searchPhrase?: string;
  type?: string;
  tags?: string[];
  creationDateFrom?: Date;
  creationDateTo?: Date; 
  sort: ArticleSort;
}


export function createEmptySearchFilter(): SearchFilter {
  return {
    searchPhrase: undefined,
    type: undefined,
    tags: undefined,
    creationDateFrom: undefined,
    creationDateTo: undefined,
    sort: {
      sortField: SortField.TITLE,
      sortType: SortType.ASCENDING
    }
  };
}