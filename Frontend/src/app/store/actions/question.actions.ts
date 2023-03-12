import { createAction, props } from '@ngrx/store';
import { Question } from '../../models/question.model';

export const addQuestion = createAction(
  '[Question] Add Question',
  props<{ question: Question }>()
);

export const deleteQuestion = createAction(
  '[Question] Delete Question',
  props<{ id: number }>()
);
