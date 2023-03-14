import { Component } from '@angular/core';
import { FooterComponent } from './components/footer/footer.component';
import { RouterModule } from '@angular/router';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import {bootstrapApplication} from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [FooterComponent,  NavBarComponent, RouterModule],
  
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'StackOverflow-clone';
}
