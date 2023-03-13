import { Component, OnInit } from '@angular/core';
import { Answer} from '../../models/answerdetail.model';
import { Question } from '../../models/question.model';
import { ANSWERS } from '../../store/state/answer.state';
import { QuestionState } from '../../store/state/question.state';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { initialQuestionState } from '../../store/state/question.state';
import { Router } from '@angular/router';

@Component({
  selector: 'app-question-detail',
  templateUrl: './question-detail.component.html',
  standalone: true,
  imports: [FormsModule, CommonModule],
  styleUrls: ['./question-detail.component.css']
})



export class QuestionDetailComponent implements OnInit {
ANSWERS!: Answer[];
Questions!: Question[];
SingleAnswers!:[]

constructor(private router: Router) {}

ngOnInit() {
  console.log(ANSWERS);
  
console.log(initialQuestionState.questions);
  this.Questions=initialQuestionState.questions
  this.ANSWERS=ANSWERS
}




  
}
