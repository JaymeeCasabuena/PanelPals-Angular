import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ModalService } from '../../../shared/services/modal-service/modal.service';
import { AlertModalComponent } from '../../../shared/components/alert-modal/alert-modal.component';

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
  isSubmitted: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private modalService: ModalService
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
    this.isSubmitted = true;
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.loginUser(email, password).subscribe({
        next: () => this.router.navigate(['home']),
        error: (error) => {
          console.error('Login failed', error),
            this.openErrorModal(`Login Failed. ${error.error.error}`);
          console.log(error);
        },
        complete: () => console.log('Login request complete'),
      });
    }
  }

  onSubmit(): void {
    this.isSubmitted = true;
    if (this.signUpForm.valid) {
      const { userName, regEmail, regPassword } = this.signUpForm.value;
      this.authService.registerUser(userName, regEmail, regPassword).subscribe({
        next: () => this.toggleForm(),
        error: (error) => {
          console.error('Registration failed', error),
            this.openErrorModal(`Registration failed. ${error.error.error}`);
        },
        complete: () => console.log('Registration request complete'),
      });
    }
  }

  toggleForm(): void {
    this.isSignUpActive = !this.isSignUpActive;
  }

  resetSubmitFlag() {
    this.isSubmitted = false;
  }

  openErrorModal(message: string) {
    const modalRef = this.modalService.openModal(AlertModalComponent);
    modalRef.componentInstance.data = {
      title: 'Error',
      message: message,
    };
  }
}
