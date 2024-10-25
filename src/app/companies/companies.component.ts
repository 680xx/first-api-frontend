import { Component, OnInit } from '@angular/core';
import { CompanyService, Company } from '../services/company.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-companies',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h1>Companies</h1>
    <ul *ngIf="companies">
      <li *ngFor="let company of companies">
        <h3>{{ company.name }}</h3>
        <p>Org Number: {{ company.organizationNumber }}</p>
        <p>Contact: {{ company.contactPerson }}</p>
        <p>Phone: {{ company.phoneNumber }}</p>
      </li>
    </ul>
    <p *ngIf="!companies">No companies found.</p>
  `,
  styles: [`
    h1 { color: #2c3e50; }
    ul { list-style-type: none; padding: 0; }
    li { border: 1px solid #ddd; padding: 10px; margin: 10px 0; }
  `]
})
export class CompaniesComponent implements OnInit {
  companies: Company[] | null = null;

  constructor(private companyService: CompanyService) {}

  ngOnInit(): void {
    this.companyService.getCompanies().subscribe({
      next: (data) => (this.companies = data),
      error: (err) => console.error('Error fetching companies', err)
    });
  }
}