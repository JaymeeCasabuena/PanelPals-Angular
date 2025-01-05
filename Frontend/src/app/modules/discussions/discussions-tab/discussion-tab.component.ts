import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { DiscussionService } from '../services/discussion-service/discussion.service';
import { SideBarComponent } from '../../../shared/components/side-bar/side-bar.component';
import { SearchBarComponent } from '../../../shared/components/search-bar/search-bar.component';
import { CreateFormComponent } from '../add-new-discussion-form/create-form.component';
import { AvatarComponent } from '../../../shared/components/avatar/avatar.component';
import { Avatar } from 'primeng/avatar';
import { Fieldset } from 'primeng/fieldset';
import { PaginatorModule } from 'primeng/paginator';

@Component({
  selector: 'app-discussion-tab',
  standalone: true,
  imports: [
    SideBarComponent,
    SearchBarComponent,
    Avatar,
    Fieldset,
    PaginatorModule,
    CreateFormComponent,
    CommonModule,
    AvatarComponent,
  ],
  templateUrl: './discussion-tab.component.html',
  styleUrl: './discussion-tab.component.css',
})
export class DiscussionTabComponent {
  discussions: any;
  currentUser: any;
  visibleDiscussions: any[] = [];
  first = 0;
  items = 5;

  constructor(
    private discussionService: DiscussionService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe({
      next: (data) => {
        this.currentUser = data['currentUser']['data'];
      },
      error: (error) => console.error('Error resolving current user', error),
    });

    this.fetchAllDiscussions();
  }

  fetchAllDiscussions(): void {
    this.discussionService.getAllDiscussions().subscribe({
      next: (response) => {
        this.discussions = response;
        this.updateVisibleDiscussions();
      },
      error: (error) => console.error('Error fetching discussions', error),
      complete: () => console.log('Fetching discussions complete'),
    });
  }

  updateVisibleDiscussions(): void {
    this.visibleDiscussions = this.discussions.slice(
      this.first,
      this.first + this.items
    );
  }

  onPageChange(event: any): void {
    this.first = event.first;
    this.updateVisibleDiscussions();
  }

  navigateToDetails(discussionId: number): void {
    this.router.navigate(['/discussions', discussionId]);
  }
}
