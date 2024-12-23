import { Routes } from '@angular/router';
import { HomeComponent } from './modules/home/home.component';
import { LoginComponent } from './modules/auth/login/login.component';
import { ComicDetailsComponent } from './modules/books/comic-details/comic-details.component';
import { DiscussionTabComponent } from './modules/discussions/discussions-tab/discussion-tab/discussion-tab.component';
import { DiscussionDetailsComponent } from './modules/discussions/discussion-details/discussion-details.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'comic-details/:id', component: ComicDetailsComponent },
  { path: 'discussions', component: DiscussionTabComponent },
  { path: 'discussions/:id', component: DiscussionDetailsComponent },
];
