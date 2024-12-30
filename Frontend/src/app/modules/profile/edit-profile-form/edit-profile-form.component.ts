import { Component, Input } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-edit-profile-form',
  standalone: true,
  imports: [ReactiveFormsModule, NgbModule],
  templateUrl: './edit-profile-form.component.html',
  styleUrls: ['./edit-profile-form.component.css'],
})
export class EditProfileFormComponent {
  @Input() currentUser: any;
  editProfileForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public activeModal: NgbActiveModal,
    private profileService: ProfileService
  ) {
    this.editProfileForm = this.fb.group({
      username: ['', Validators.required],
      avatar: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    if (this.currentUser) {
      this.editProfileForm.patchValue({
        username: this.currentUser.Username,
        avatar: this.currentUser.Avatar,
      });
    }
  }
  onSubmit(): void {
    if (this.editProfileForm.valid) {
      const profileData = this.editProfileForm.value;
      profileData.userId = this.currentUser.Id;

      this.profileService.editProfile(profileData).subscribe({
        next: (response) =>
          console.log('Profile updated successfully', response),
        error: (error) => console.error('Error updating profile', error),
      });
    } else {
      console.log('Form is invalid');
    }
  }

  closeModal(): void {
    this.activeModal.dismiss();
  }
}
