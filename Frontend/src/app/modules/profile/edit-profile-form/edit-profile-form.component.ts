import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-edit-profile-form',
  standalone: true,
  imports: [ReactiveFormsModule, NgbModule],
  templateUrl: './edit-profile-form.component.html',
  styleUrls: ['./edit-profile-form.component.css'],
})
export class EditProfileFormComponent {
  editProfileForm: FormGroup;

  constructor(private fb: FormBuilder, public activeModal: NgbActiveModal) {
    this.editProfileForm = this.fb.group({
      userName: ['', Validators.required],
      avatar: ['', Validators.required],
    });
  }

  onSubmit(): void {}

  closeModal(): void {
    this.activeModal.dismiss();
  }
}
