import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../services/company.service';
import { Company } from '../../models/company';
import { CommonModule } from '@angular/common';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-mainview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mainview.component.html',
  styleUrl: './mainview.component.css'
})
export class MainviewComponent implements OnInit {
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

  viewCompany(id: number): void {
    this.companyService.getCompanyById(id).subscribe({

    }); // Assuming you have a route defined for viewing a company
  }

  deleteCompany(id: number): void {
    this.companyService.deleteCompany(id).subscribe({
      next: () => this.loadCompanies(),
      error: (error) => console.error('Error deleting company', error)
    });
  }

}
