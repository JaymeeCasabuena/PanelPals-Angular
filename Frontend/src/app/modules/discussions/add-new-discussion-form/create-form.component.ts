import { Component, Input } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { DiscussionService } from '../services/discussion-service/discussion.service';
import { CommonModule } from '@angular/common';
import { ModalService } from '../../../shared/services/modal-service/modal.service';
import { AlertModalComponent } from '../../../shared/components/alert-modal/alert-modal.component';

@Component({
  selector: 'app-create-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './create-form.component.html',
  styleUrl: './create-form.component.css',
})
export class CreateFormComponent {
  @Input() currentUser: any;
  discussionForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private discussionService: DiscussionService,
    private modalService: ModalService
  ) {
    this.discussionForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.discussionForm.valid) {
      const discussionData = this.discussionForm.value;
      discussionData.userId = this.currentUser.Id;

      this.discussionService.createDiscussion(discussionData).subscribe({
        next: () => {
          this.discussionForm.reset(), this.openSuccessModal();
        },
        error: (error) => {
          console.error('Error creating discussion', error),
            this.openErrorModal();
        },
      });
    } else {
      console.log('Form is invalid', this.discussionForm);
      this.discussionForm.markAllAsTouched();
    }
  }

  openSuccessModal() {
    const modalRef = this.modalService.openModal(AlertModalComponent);
    modalRef.componentInstance.data = {
      title: 'Success',
      message: 'New discussion created successfully.',
    };
  }

  openErrorModal() {
    const modalRef = this.modalService.openModal(AlertModalComponent);
    modalRef.componentInstance.data = {
      title: 'Error',
      message: 'Error creating discussion.',
    };
  }
}
