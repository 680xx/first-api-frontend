import { Component, OnInit } from '@angular/core';
import { CompanyService, Company } from '../../services/company.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-company-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './company-list.html',
  styleUrl: './company-list.css'
})

export class CompanyList implements OnInit {
  companies: Company[] | null = null;

  constructor(private companyService: CompanyService) {}

  ngOnInit(): void {
    this.companyService.getCompanies().subscribe({
      next: (data) => (this.companies = data),
      error: (err) => console.error('Error fetching companies', err)
    });
  }
}
