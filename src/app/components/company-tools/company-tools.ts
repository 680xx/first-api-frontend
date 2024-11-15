import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../services/company.service';
import { Company } from '../../models/company';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {claimReq} from '../../utils/claimReq-utils';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-company-tools',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './company-tools.html',
  styleUrl: './company-tools.css'
})
export class CompanyTools implements OnInit {
  companies: Company[] = [];
  allCompanies: Company[] = [];
  selectedCompany: Company = { id: undefined, name: '' } as Company;
  isAdmin: boolean = false;
  searchTerm: string = '';

  // Pagination properties
  currentPage: number = 1;
  itemsPerPage: number = 5;
  pageSizeOptions: number[] = [5, 10, 20, 50]; // Options for items per page

  constructor(
    private companyService: CompanyService,
    private authService: AuthService) {

  }

    ngOnInit(): void {
    this.loadCompanies();
    const claims = this.authService.getClaims();
    this.isAdmin = claimReq.adminOnly(claims);
  }

  loadCompanies(): void {
    this.companyService.getCompanies().subscribe({
      next: (data) => {
        this.companies = data.sort((a, b) => (a.id ?? 0) - (b.id ?? 0));
        this.allCompanies = [...this.companies];
        },
      error: (error) => console.error('Error fetching companies', error)
    });
  }

  filterCompanies(): void {
    const filtered = this.allCompanies.filter(company =>
      company.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    this.companies = filtered;
    this.currentPage = 1; // Reset to the first page after filtering
  }

  // Pagination methods
  get paginatedCompanies(): Company[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.companies.slice(startIndex, endIndex);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  get totalPages(): number {
    return Math.ceil(this.companies.length / this.itemsPerPage);
  }

  onItemsPerPageChange(newItemsPerPage: number): void {
    this.itemsPerPage = newItemsPerPage;
    this.currentPage = 1; // Reset to the first page
  }

  deleteCompany(id: number): void {
    const confirmed = window.confirm('Are you sure you want to delete this company?');
    if (confirmed)
    this.companyService.deleteCompany(id).subscribe({
      next: () => this.loadCompanies(),
      error: (error) => console.error('Error deleting company', error)
    });
  }

  viewCompany(id: number): void {
    this.companyService.getCompanyById(id).subscribe({
      next: (data) => (this.selectedCompany = data),
      error: (error) => console.error('Error fetching company details', error)
    });
  }

  updateSelectedCompany(): void {
    if (this.selectedCompany) {
      // Kontrollera om företaget finns i listan
      const existingCompany = this.companies.find(company => company.id === this.selectedCompany?.id);

      if (!existingCompany) {
        // Skapa nytt företag om det inte finns i listan eller om `id` saknas
        this.companyService.createCompany(this.selectedCompany).subscribe({
          next: (newCompany) => {
            console.log('Company created successfully');
            this.companies.push(newCompany); // Lägg till det nya företaget i listan
            this.loadCompanies(); // Uppdatera listan för att säkerställa att den är sorterad
            this.selectedCompany = { id: undefined, name: '' } as Company;
          },
          error: (error) => console.error('Error creating company', error)
        });
      } else {
        // Uppdatera företag om det finns i listan och `id` existerar
        if (this.selectedCompany.id !== undefined) { // Extra kontroll för säkerhet
          this.companyService.updateCompany(this.selectedCompany.id!, this.selectedCompany).subscribe({
            next: () => {
              console.log('Company updated successfully');
              this.loadCompanies(); // Uppdatera listan efter uppdatering
            },
            error: (error) => console.error('Error updating company', error)
          });
        }
      }
    }
  }

  protected readonly claimReq = claimReq;
}
