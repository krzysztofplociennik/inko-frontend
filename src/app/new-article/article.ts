export interface ArticleCreate {
    title: string;
    content: string;
    type: string;
    tags: string[];
}

export interface ArticleType {
    name: string;
}
  
  