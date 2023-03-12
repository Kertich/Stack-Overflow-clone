import { createReducer, on } from '@ngrx/store';
import { addQuestion, deleteQuestion } from '../actions/question.actions';
import { QuestionState, initialQuestionState } from '../state/question.state';

export const questionReducer = createReducer(
  initialQuestionState,
  on(addQuestion, (state, { question }) => ({
    ...state,
    questions: [...state.questions, question]
  })),
  on(deleteQuestion, (state, { id }) => ({
    ...state,
    questions: state.questions.filter(q => q.id !== id)
  }))
);
