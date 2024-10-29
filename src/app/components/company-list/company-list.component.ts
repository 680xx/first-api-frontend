import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../services/company.service';
import { Company } from '../../models/company';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-company-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.css']
})
export class CompanyListComponent implements OnInit {
  companies: Company[] = [];

  constructor(private companyService: CompanyService) {}

  ngOnInit(): void {
    this.loadCompanies();
  }

  loadCompanies(): void {
    this.companyService.getCompanies().subscribe({
      next: (data) => (this.companies = data),
      error: (error) => console.error('Error fetching companies', error)
    });
  }

  deleteCompany(id: number): void {
    this.companyService.deleteCompany(id).subscribe({
      next: () => this.loadCompanies(),
      error: (error) => console.error('Error deleting company', error)
    });
  }
}