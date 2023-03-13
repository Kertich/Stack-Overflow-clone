import { Component } from '@angular/core';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  standalone: true,
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {


  loggedIn: boolean = false;

  logout(): void {
    // Handle logout logic
    this.loggedIn = false;
  }

}
