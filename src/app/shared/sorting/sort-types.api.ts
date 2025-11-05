export enum SortField {
  TITLE = 'Title',
  TYPE = 'Type',
  CREATED = 'Created',
  UPDATED = 'Updated'
}

export enum SortType {
  ASCENDING = 'Ascending',
  DESCENDING = 'Descending'
}

export interface ArticleSort {
  sortField: SortField,
  sortType: SortType
}