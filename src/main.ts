import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { CompanyListComponent } from './app/components/company-list/company-list.component';
import { CompanyFormComponent } from './app/components/company-form/company-form.component';
import { ListCompaniesComponent } from './app/components/list-companies/list-companies.component';
import { AppComponent } from './app/app.component';
import { MainviewComponent } from './app/components/mainview/mainview.component';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideRouter([
      { path: '', component: MainviewComponent}
/*      { path: '', component: CompanyListComponent },
      { path: 'create', component: CompanyFormComponent },
      { path: 'list', component: ListCompaniesComponent} */
    ])
  ]
}).catch(err => console.error(err));