import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent} from './components/landing-page/landing-page.component';
import { LoginPageComponent} from './components/login-page/login-page.component';
import { MainviewComponent } from './components/mainview/mainview.component';
import { UserComponent} from './components/user/user.component';

export const routes: Routes = [
  { path: '', component: UserComponent},
  { path: 'landing', component: LandingPageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'main', component: MainviewComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
