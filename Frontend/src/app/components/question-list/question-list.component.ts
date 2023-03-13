import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
// import { HighlightDirect } from '../../directives/highlight.directive'

import { CommonModule } from '@angular/common';
import { HighlightDirective } from '../../directives/highlight.directive';

import { deleteQuestion } from 'src/app/store/actions/question.actions';
import { Question } from '../../models/question.model';
import { AppState } from '../../store';



@Component({
  selector: 'app-questions-list',
  templateUrl: './question-list.component.html',
  standalone: true,
  imports: [CommonModule, HighlightDirective],
  styleUrls: ['./question-list.component.css']
})
export class QuestionListComponent implements OnInit {

  questions$!: Observable<Question[]>;

  constructor(private store: Store<AppState>, private router: Router) {}

  ngOnInit() {
    this.questions$ = this.store.select(state => state.questionState.questions);
    this.questions$.subscribe(questions => console.log(questions));
  }

  onDeleteQuestion(id: number) {
    this.store.dispatch(deleteQuestion({ id: id }));
  }
  goToComponent2() {
    this.router.navigate(['/question']);
  }
}
