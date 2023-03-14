import { Component } from '@angular/core';
import { RowData } from '../../models/rowdata.model';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

@Component({
  selector: 'app-admin-users-details',
  templateUrl: './admin-users-details.component.html',
  standalone: true,
  imports:[CommonModule],
  styleUrls: ['./admin-users-details.component.css']
})
export class AdminUsersDetailsComponent {

  rows: RowData[] = [
    { id: 1, name: 'John', numQuestions: 5, numAnswers: 10 },
    { id: 2, name: 'Jane', numQuestions: 7, numAnswers: 14 },
    { id: 3, name: 'Bob', numQuestions: 3, numAnswers: 6 },
  ];

  deleteRow(id: number) {
    // Remove the row with the specified ID from the rows array
    this.rows = this.rows.filter(row => row.id !== id);
  }

}
