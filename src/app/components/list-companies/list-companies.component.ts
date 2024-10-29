import { Component, OnInit } from '@angular/core';
import { CompanyService, Company } from '../../services/company.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-companies',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-companies.component.html',
  styleUrl: './list-companies.component.css'
})

export class ListCompaniesComponent implements OnInit {
  companies: Company[] | null = null;

  constructor(private companyService: CompanyService) {}

  ngOnInit(): void {
    this.companyService.getCompanies().subscribe({
      next: (data) => (this.companies = data),
      error: (err) => console.error('Error fetching companies', err)
    });
  }
}
