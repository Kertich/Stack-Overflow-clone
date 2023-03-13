import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroupDirective } from '@angular/forms';

import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  imports: [ReactiveFormsModule, CommonModule],
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  public googleImg = "https://img.icons8.com/fluency/1x/google-logo.png"
  public gitImg = "https://img.icons8.com/fluency-systems-regular/1x/github.png"
  public fbImg = "https://img.icons8.com/color/256/facebook.png"

  constructor(private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }
  // login() {
  //   // Navigate to the home page
    
  // }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    // Perform login logic here
    this.router.navigate(['/questionlist']);
  }
}
