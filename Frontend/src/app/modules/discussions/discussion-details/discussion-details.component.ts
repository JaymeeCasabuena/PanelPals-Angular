import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { DiscussionService } from '../services/discussion-service/discussion.service';
import { CommentService } from '../services/comment-service/comment.service';
import { SideBarComponent } from '../../../shared/components/side-bar/side-bar.component';
import { SearchBarComponent } from '../../../shared/components/search-bar/search-bar.component';
import { AvatarComponent } from '../../../shared/components/avatar/avatar.component';
import { ModalService } from '../../../shared/services/modal-service/modal.service';
import { AlertModalComponent } from '../../../shared/components/alert-modal/alert-modal.component';

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
    AvatarComponent,
  ],
  templateUrl: './discussion-details.component.html',
  styleUrl: './discussion-details.component.css',
})
export class DiscussionDetailsComponent {
  discussion: any;
  comments?: any[] = [];
  commentForm: FormGroup;
  currentUser: any;

  constructor(
    private router: Router,
    private discussionService: DiscussionService,
    private commentService: CommentService,
    private modalService: ModalService,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.commentForm = this.fb.group({
      commentText: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.commentService.comments$.subscribe((data) => {
      this.comments = data;
    });

    this.route.data.subscribe({
      next: (data) => {
        this.currentUser = data['currentUser']['data'];
      },
      error: (error) => console.error('Error resolving current user', error),
    });

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
      commentData.userId = this.currentUser.Id;

      this.commentService.addComment(commentData).subscribe({
        next: () => {
          this.commentForm.reset();
          this.fetchDiscussionById(this.discussion.Id);
        },
        error: (error) => {
          console.error('Error adding comment', error),
            this.openErrorModal(`Error adding comment. ${error.error.error}`);
        },
      });
    } else {
      console.log('Form is invalid');
    }
  }

  deleteComment(commentId: number) {
    const modalRef = this.modalService.openModal(AlertModalComponent);
    modalRef.componentInstance.data = {
      title: 'Delete',
      message: 'Are you sure you want to delete this comment?',
    };
    modalRef.closed.subscribe((result) => {
      if (result === 'confirm') {
        this.commentService
          .deleteComment(commentId, this.currentUser.Id)
          .subscribe({
            next: () => {
              this.fetchDiscussionById(this.discussion.Id);
            },
            error: (error) => {
              console.error('Error deleting comment', error),
                this.openErrorModal(
                  `Error deleting comment. ${error.error.error}`
                );
            },
          });
      }
    });
  }

  deleteDiscussion() {
    const modalRef = this.modalService.openModal(AlertModalComponent);
    modalRef.componentInstance.data = {
      title: 'Delete',
      message: 'Are you sure you want to delete this discussion?',
    };
    modalRef.closed.subscribe((result) => {
      if (result === 'confirm') {
        this.discussionService
          .deleteDiscussion(this.discussion.Id, this.currentUser.Id)
          .subscribe({
            next: () => {
              this.router.navigate(['/discussions']);
            },
            error: (error) => {
              console.error('Error deleting discussion', error),
                this.openErrorModal(
                  `Error deleting discussion. ${error.error.error}`
                );
            },
          });
      }
    });
  }

  openErrorModal(message: string) {
    const modalRef = this.modalService.openModal(AlertModalComponent);
    modalRef.componentInstance.data = {
      title: 'Error',
      message: message,
    };
  }
}
