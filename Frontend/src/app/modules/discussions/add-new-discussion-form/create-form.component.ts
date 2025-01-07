import { Component, Input, Output, EventEmitter } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DiscussionService } from '../services/discussion-service/discussion.service';
import { CommonModule } from '@angular/common';
import { ModalService } from '../../../shared/services/modal-service/modal.service';
import { AlertModalComponent } from '../../../shared/components/alert-modal/alert-modal.component';

@Component({
  selector: 'app-create-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NgbModule],
  templateUrl: './create-form.component.html',
  styleUrl: './create-form.component.css',
})
export class CreateFormComponent {
  @Input() currentUser: any;
  @Output() modalClosed = new EventEmitter<void>();
  discussionForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private discussionService: DiscussionService,
    private modalService: ModalService,
    private activeModal: NgbActiveModal
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
    this.closeModal();
    const modalRef = this.modalService.openModal(AlertModalComponent);
    modalRef.componentInstance.data = {
      title: 'Success',
      message: 'New discussion created successfully.',
    };
  }

  openErrorModal() {
    this.closeModal();
    const modalRef = this.modalService.openModal(AlertModalComponent);
    modalRef.componentInstance.data = {
      title: 'Error',
      message: 'Error creating discussion.',
    };
  }

  closeModal(): void {
    this.activeModal.dismiss();
    this.modalClosed.emit();
  }
}
