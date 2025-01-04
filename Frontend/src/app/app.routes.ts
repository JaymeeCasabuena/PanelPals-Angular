import { Routes } from '@angular/router';
import { HomeComponent } from './modules/home/home.component';
import { LoginComponent } from './modules/auth/login/login.component';
import { ComicDetailsComponent } from './modules/comics/comic-details/comic-details.component';
import { DiscussionTabComponent } from './modules/discussions/discussions-tab/discussion-tab.component';
import { DiscussionDetailsComponent } from './modules/discussions/discussion-details/discussion-details.component';
import { ExplorePageComponent } from './modules/comics/explore-page/explore-page.component';
import { UserResolver } from './shared/resolvers/user-resolver/user-resolver.service';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    component: HomeComponent,
    resolve: { currentUser: UserResolver },
  },
  { path: 'login', component: LoginComponent },
  {
    path: 'comic-details/:id',
    component: ComicDetailsComponent,
    resolve: { currentUser: UserResolver },
  },
  {
    path: 'discussions',
    component: DiscussionTabComponent,
    resolve: { currentUser: UserResolver },
  },
  {
    path: 'discussions/:id',
    component: DiscussionDetailsComponent,
    resolve: { currentUser: UserResolver },
  },
  {
    path: 'explore',
    component: ExplorePageComponent,
    resolve: { currentUser: UserResolver },
  },
];
