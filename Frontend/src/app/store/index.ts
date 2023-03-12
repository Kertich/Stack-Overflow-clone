import { ActionReducerMap } from '@ngrx/store';
import { questionReducer } from './reducers/question.reducer';
import { QuestionState } from './state/question.state';


export interface AppState {
  questionState: QuestionState;
}

export const reducers: ActionReducerMap<AppState> = {
  questionState: questionReducer
};
