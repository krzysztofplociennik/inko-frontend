export interface PostCreate {
    title: string;
    content: string;
}

export interface PostRead {
    id: number;
    title: string;
    content: string;
}