import { Component } from '@angular/core';

interface Question {
  id: number;
  title: string;
}

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  standalone: true,
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent {

  recentQuestions: Question[] = [
    { id: 1, title: 'What is the best way to learn Angular?' },
    { id: 2, title: 'How do I implement pagination in Angular?' },
    { id: 3, title: 'How can I make my Angular app responsive?' }
  ];

  onSubmit(formData: { searchInput: string }) {
    console.log('Form submitted:', formData.searchInput);
  }

}
