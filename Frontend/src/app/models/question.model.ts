export interface Question {
    id:number;
    title: string;
    body: string;
    tags: string[],
    created_at: Date
    answers: []
}

