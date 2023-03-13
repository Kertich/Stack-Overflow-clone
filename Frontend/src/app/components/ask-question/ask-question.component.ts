import { Component } from '@angular/core';
import { Question } from 'src/app/models/question.model';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ask-question',
  standalone: true,
  templateUrl: './ask-question.component.html',
  imports: [ ReactiveFormsModule, CommonModule, FormsModule],
  styleUrls: ['./ask-question.component.css']
})
export class AskQuestionComponent {
  title: string = '';
  details: string = '';
  tried: string = '';
  expecting: string = '';
  tags: string = '';
  answers!: []

  onSubmit() {
    const question: Question = {
      id: 1,
      title: this.title,
      body: this.details,
      tags: this.tags.split(','),
      created_at: new Date(),
      answers: this.answers
    };
    
    // TODO: send question to backend API to save in database

    // Reset form fields
    this.title = '';
    this.details = '';
    this.tried = '';
    this.expecting = '';
    this.tags = '';
  }
}



