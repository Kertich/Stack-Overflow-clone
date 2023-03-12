import { Component, OnInit } from '@angular/core';
import { Answer} from '../../models/answerdetail.model';
import { Question } from '../../models/question.model';
import { ANSWERS } from '../../store/state/answer.state';
import { QuestionState } from '../../store/state/question.state';
import { initialQuestionState } from '../../store/state/question.state';

@Component({
  selector: 'app-question-detail',
  templateUrl: './question-detail.component.html',
  styleUrls: ['./question-detail.component.css']
})



export class QuestionDetailComponent implements OnInit {
ANSWERS!: Answer[];
Questions!: Question[];
SingleAnswers!:[]

ngOnInit() {
  console.log(ANSWERS);
  
console.log(initialQuestionState.questions);
  this.Questions=initialQuestionState.questions
  this.ANSWERS=ANSWERS
}



  
}
