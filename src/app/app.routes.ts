import { TechnologyComponent } from './technology/technology.component';
import { ReposComponent } from './repos/repos.component';
import { UsersComponent } from './users/users.component';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'technologies', pathMatch: 'full' },
  { path: 'technologies', component: TechnologyComponent },
  { path: 'repos/:name', component: ReposComponent },
  { path: 'users/:name', component: UsersComponent },
  { path: '**', redirectTo: 'technologies' }
];
export const routing = RouterModule.forRoot(routes);
