import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  isSignUpActive: boolean = false;
  loginForm: FormGroup;
  signUpForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });

    this.signUpForm = this.fb.group({
      regEmail: ['', [Validators.required, Validators.email]],
      regPassword: ['', [Validators.required, Validators.minLength(8)]],
      userName: [
        '',
        [
          Validators.required,
          Validators.maxLength(15),
          Validators.pattern('^[a-zA-Z0-9_]+$'),
        ],
      ],
    });
  }

  onLogIn(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.loginUser(email, password).subscribe({
        next: () => this.router.navigate(['home']),
        error: (error) => console.error('Login failed', error),
        complete: () => console.log('Login request complete'),
      });
    }
  }

  onSubmit(): void {
    if (this.signUpForm.valid) {
      const { userName, regEmail, regPassword } = this.signUpForm.value;
      this.authService.registerUser(userName, regEmail, regPassword).subscribe({
        next: () => this.toggleSignup(),
        error: (error) => console.error('Registration failed', error),
        complete: () => console.log('Registration request complete'),
      });
    }
  }

  toggleSignup() {
    const container = document.querySelector('.cont');
    container?.classList.toggle('s--signup');
  }
}
