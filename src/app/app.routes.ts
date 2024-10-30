import { ListCompaniesComponent } from './components/list-companies/list-companies.component';
import { CompanyListComponent } from './components/company-list/company-list.component';
import { CompanyFormComponent } from './components/company-form/company-form.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainviewComponent } from './components/mainview/mainview.component';

export const routes: Routes = [
  { path: '', component: MainviewComponent}
/*  { path: '', component: CompanyListComponent },
  { path: 'create', component: CompanyFormComponent },
  { path: 'list', component: ListCompaniesComponent} */
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }