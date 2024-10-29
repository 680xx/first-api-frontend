import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { CompanyListComponent } from './app/components/company-list/company-list.component';
import { CompanyFormComponent } from './app/components/company-form/company-form.component';

bootstrapApplication(CompanyListComponent, {
  providers: [
    provideHttpClient(), // Updated to use provideHttpClient
    provideRouter([
      { path: '', component: CompanyListComponent },
      { path: 'create', component: CompanyFormComponent }
    ])
  ]
}).catch(err => console.error(err));