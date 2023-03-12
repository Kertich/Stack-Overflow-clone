import { Question } from '../../models/question.model'

export interface QuestionState {
    questions: Question[];
}

export const initialQuestionState: QuestionState = {
    questions: [
    { id: 1, title: 'What is Angular?', body: 'Lorem ipsum dolor sit amet', tags: ['Angular', 'Software'], created_at:new Date(), answers:[]},
    { id: 2, title: 'How to use NgFor?', body: 'Lorem ipsum dolor sit amet', tags: ['Angular', 'Software'], created_at:new Date(), answers:[] },
    { id: 3, title: 'What is RxJS?', body: 'Lorem ipsum dolor sit amet', tags: ['Angular', 'Software'], created_at:new Date(), answers:[] },
    { id: 4, title: 'What is a service?', body: 'Lorem ipsum dolor sit amet', tags: ['Angular', 'Software'], created_at:new Date(), answers:[] }
    ]
}
