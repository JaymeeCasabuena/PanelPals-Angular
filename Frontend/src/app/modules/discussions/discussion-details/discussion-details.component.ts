import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { DiscussionService } from '../services/discussion-service/discussion.service';
import { CommentService } from '../services/comment-service/comment.service';
import { SideBarComponent } from '../../../shared/components/side-bar/side-bar.component';
import { SearchBarComponent } from '../../../shared/components/search-bar/search-bar.component';
import {
  FormBuilder,
  Validators,
  ReactiveFormsModule,
  FormGroup,
} from '@angular/forms';
import { Avatar } from 'primeng/avatar';
import { Fieldset } from 'primeng/fieldset';

@Component({
  selector: 'app-discussion-details',
  standalone: true,
  imports: [
    SideBarComponent,
    SearchBarComponent,
    Avatar,
    Fieldset,
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './discussion-details.component.html',
  styleUrl: './discussion-details.component.css',
})
export class DiscussionDetailsComponent {
  discussion: any;
  comments: any[] = [];
  commentForm: FormGroup;

  constructor(
    private discussionService: DiscussionService,
    private commentService: CommentService,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.commentForm = this.fb.group({
      commentText: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    const discussionId = this.route.snapshot.paramMap.get('id');
    if (discussionId) {
      this.fetchDiscussionById(Number(discussionId));
    }
  }

  fetchDiscussionById(id: number): void {
    this.discussionService.getDiscussionById(id).subscribe({
      next: (response) => {
        this.discussion = response.discussion;
        this.comments = response.comments;
      },
      error: (error) => console.error('Error fetching comic', error),
      complete: () => console.log('Fetching comic complete'),
    });
  }

  onSubmit(): void {
    if (this.commentForm.valid) {
      const commentData = this.commentForm.value;
      commentData.discussionId = this.discussion.Id;
      commentData.userId = 1;

      this.commentService.addComment(commentData).subscribe({
        next: (response) =>
          console.log('Added new comment successfully', response),
        error: (error) => console.error('Error adding comment', error),
      });
    } else {
      console.log('Form is invalid');
    }
  }
}
