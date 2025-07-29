export interface SearchFilter {
  searchPhrase?: string;
  type?: string;
  tags?: string[];
  creationDateFrom?: Date;
  creationDateTo?: Date; 
}

export function createEmptySearchFilter(): SearchFilter {
  return {
    searchPhrase: undefined,
    type: undefined,
    tags: undefined,
    creationDateFrom: undefined,
    creationDateTo: undefined,
  };
}