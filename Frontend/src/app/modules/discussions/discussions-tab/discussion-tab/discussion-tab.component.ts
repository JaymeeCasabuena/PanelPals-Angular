import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DiscussionService } from '../../services/discussion.service';
import { SideBarComponent } from '../../../../shared/components/side-bar/side-bar.component';
import { SearchBarComponent } from '../../../../shared/components/search-bar/search-bar.component';
import { CreateFormComponent } from '../../add-new-discussion-form/create-form/create-form.component';
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
  ],
  templateUrl: './discussion-tab.component.html',
  styleUrl: './discussion-tab.component.css',
})
export class DiscussionTabComponent {
  discussions: any;

  constructor(private discussionService: DiscussionService) {}

  ngOnInit(): void {
    this.fetchAllDiscussions();
  }

  fetchAllDiscussions(): void {
    this.discussionService.getAllDiscussions().subscribe({
      next: (response) => (this.discussions = response),
      error: (error) => console.error('Error fetching discussions', error),
      complete: () => console.log('Fetching discussions complete'),
    });
  }

  onPageChange(event: any) {
    console.log('Page changed:', event);
  }
}
