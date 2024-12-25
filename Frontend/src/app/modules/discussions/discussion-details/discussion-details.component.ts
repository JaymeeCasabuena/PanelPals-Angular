import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { DiscussionService } from '../services/discussion.service';
import { SideBarComponent } from '../../../shared/components/side-bar/side-bar.component';
import { SearchBarComponent } from '../../../shared/components/search-bar/search-bar.component';
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
  ],
  templateUrl: './discussion-details.component.html',
  styleUrl: './discussion-details.component.css',
})
export class DiscussionDetailsComponent {
  discussion: any;
  comments: any[] = [];

  constructor(
    private discussionService: DiscussionService,
    private route: ActivatedRoute
  ) {}

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
        console.log(this.discussion, this.comments);
      },
      error: (error) => console.error('Error fetching comic', error),
      complete: () => console.log('Fetching comic complete'),
    });
  }
}
