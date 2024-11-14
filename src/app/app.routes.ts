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
import {ForbiddenComponent} from './components/forbidden/forbidden.component';
import {claimReq} from './utils/claimReq-utils';
import {LandingComponent} from './components/landing/landing.component';
import {CompanyTools} from './components/company-tools/company-tools';
import {CompanyList} from './components/company-list/company-list';

export const routes: Routes = [
  { path: '', component: LandingComponent
  },
  { path: '', component: UserComponent,
    children: [
      { path: 'signup', component: RegistrationComponent },
      { path: 'signin', component: LoginComponent }
    ]
  },
  {
    path: '', component: MainLayoutComponent, canActivate: [authGuard],
    canActivateChild: [authGuard],
    children: [
      {
        path: 'dashboard', component: DashboardComponent
      },
      {
        path: 'company-list', component: CompanyList
      },
      {
        path: 'company-tools', component: CompanyTools,
        data: { claimReq: claimReq.adminOrOwner }
      },
      {
        path: 'admin-only', component: AdminOnlyComponent,
        data: { claimReq: claimReq.adminOnly }
      },
      {
        path: 'admin-or-owner', component: AdminOrOwnerComponent,
        data: { claimReq: claimReq.adminOrOwner }
      },
      {
        path: 'female-users-only', component: FemaleUsersOnlyComponent,
        data: { claimReq: claimReq.femaleUsers }
      },
      {
        path: 'library-members-only', component: LibraryMembersOnlyComponent,
        data: { claimReq: claimReq.hasLibraryId }
      },
      {
        path: 'male-users-under-age-of-10-only', component: MaleUsersUnderAgeOf10OnlyComponent,
        data: { claimReq: claimReq.maleUsersUnderAgeOf10 }
      },
      {
        path: 'forbidden', component: ForbiddenComponent
      }
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
