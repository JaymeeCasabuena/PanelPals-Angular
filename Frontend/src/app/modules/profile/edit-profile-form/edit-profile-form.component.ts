import { Component, Input } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProfileService } from '../services/profile.service';
import { ModalService } from '../../../shared/services/modal-service/modal.service';
import { AlertModalComponent } from '../../../shared/components/alert-modal/alert-modal.component';

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
    private activeModal: NgbActiveModal,
    private profileService: ProfileService,
    private modalService: ModalService
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
        next: () => this.openSuccessModal(),
        error: (error) => {
          console.error('Error updating profile', error), this.openErrorModal();
        },
      });
    } else {
      console.log('Form is invalid');
    }
  }

  openSuccessModal() {
    this.closeModal();
    const modalRef = this.modalService.openModal(AlertModalComponent);
    modalRef.componentInstance.data = {
      title: 'Success',
      message: 'Your profile has been updated successfully.',
    };
  }

  openErrorModal() {
    this.closeModal();
    const modalRef = this.modalService.openModal(AlertModalComponent);
    modalRef.componentInstance.data = {
      title: 'Error',
      message: 'Error updating profile.',
    };
  }

  closeModal(): void {
    this.activeModal.dismiss();
  }
}
