export interface SearchFilter {
  page: number;
  size: number;
  searchPhrase: string;
  
  type?: string;
  tags?: string[];
  creationDateFrom?: Date;
  creationDateTo?: Date;
}