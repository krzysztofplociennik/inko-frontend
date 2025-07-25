import { ArticleSearch } from "./article-result";

export interface SearchResult {
  articles: ArticleSearch[];
  totalElements: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
  hasNext: boolean;
  hasPrevious: boolean;
}