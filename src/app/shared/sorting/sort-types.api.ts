export enum SortField {
  TITLE = 'title',
  TYPE = 'type',
  CREATED = 'date of creation',
  UPDATED = 'date of modification'
}

export enum SortType {
  ASCENDING = 'ascending',
  DESCENDING = 'descending'
}

export interface ArticleSort {
  sortField: SortField,
  sortType: SortType
}