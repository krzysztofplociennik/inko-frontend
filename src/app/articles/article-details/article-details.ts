export interface ArticleDetails {
    id: string;
    title: string;
    content: string;
    type: string;
    tags: string[];
    creationDate: Date; 
    modificationDate: Date; 
}