import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent} from './components/user/user.component';
import {RegistrationComponent} from './components/registration/registration.component';
import {LoginComponent} from './components/login/login.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {authGuard} from './services/auth.guard';
import {AdminOnlyComponent} from './authorizeDemo/admin-only/admin-only.component';
import {AdminOrOwnerComponent} from './authorizeDemo/admin-or-owner/admin-or-owner.component';
import {FemaleUsersOnlyComponent} from './authorizeDemo/female-users-only/female-users-only.component';
import {LibraryMembersOnlyComponent} from './authorizeDemo/library-members-only/library-members-only.component';
import {MaleUsersUnderAgeOf10OnlyComponent} from './authorizeDemo/male-users-under-age-of-10-only/male-users-under-age-of-10-only.component';
import {MainLayoutComponent} from './layouts/main-layout/main-layout.component';

export const routes: Routes = [
  { path: '', component: UserComponent,
    children: [
      { path: 'signup', component: RegistrationComponent },
      { path: 'signin', component: LoginComponent }
    ]
  },
  {
    path: '', component: MainLayoutComponent, canActivate: [authGuard],
    children: [
      {path: 'dashboard', component: DashboardComponent},
      {path: 'admin-only', component: AdminOnlyComponent},
      {path: 'admin-or-owner', component: AdminOrOwnerComponent},
      {path: 'female-users-only', component: FemaleUsersOnlyComponent},
      {path: 'library-members', component: LibraryMembersOnlyComponent},
      {path: 'male-users-under-age-of-10-only', component: MaleUsersUnderAgeOf10OnlyComponent}
      // Alternativ för att använda authGuard på enbart 1
      // {path: 'male-users-under-age-of-10-only', component: MaleUsersUnderAgeOf10OnlyComponent, canActivate: [authGuard]}
    ],
  },
  ];

    @NgModule({
      imports: [RouterModule.forRoot(routes)],
      exports: [RouterModule],
    })
    export class AppRoutingModule { }
