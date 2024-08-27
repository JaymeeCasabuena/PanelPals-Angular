import { Component, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  isSignUpActive: boolean = false;

  constructor(private renderer: Renderer2) {}

  toggleSignup() {
    const container = document.querySelector('.cont');
    const signInForm = document.querySelector('.sign-in');
    const signUpForm = document.querySelector('.sign-up');
    
    this.isSignUpActive = !this.isSignUpActive;
    container?.classList.toggle('s--signup', this.isSignUpActive);

    if (this.isSignUpActive) {
      this.renderer.addClass(signInForm, 'hidden');
      this.renderer.removeClass(signUpForm, 'hidden');
    } else {
      this.renderer.removeClass(signInForm, 'hidden');
      this.renderer.addClass(signUpForm, 'hidden');
    }
  }
}
