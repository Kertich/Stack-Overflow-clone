// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {

//   constructor() { }
// }
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticated = true;
  isLoggedIn = false;

  login(username: string, password: string): Observable<boolean> {
    // TODO: Implement login logic here
    // For now, we'll just return a successful login
    this.isAuthenticated = true;
    return of(true);
  }

  logout(): void {
    this.isAuthenticated = false;
  }
}
