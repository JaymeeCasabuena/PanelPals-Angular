import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { DiscussionService } from '../services/discussion-service/discussion.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './create-form.component.html',
  styleUrl: './create-form.component.css',
})
export class CreateFormComponent {
  discussionForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private discussionService: DiscussionService
  ) {
    this.discussionForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.discussionForm.valid) {
      const discussionData = this.discussionForm.value;
      discussionData.userId = 1;

      this.discussionService.createDiscussion(discussionData).subscribe({
        next: (response) =>
          console.log('Created new discussion successfully', response),
        error: (error) => console.error('Error creating discussion', error),
      });
    } else {
      console.log('Form is invalid');
    }
  }
}
