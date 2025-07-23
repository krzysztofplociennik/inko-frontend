export interface SearchFilter {
  searchPhrase?: string;
  type?: string;
  tags?: string[];
  creationDateFrom?: Date;
  creationDateTo?: Date;
}