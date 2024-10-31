import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../services/company.service';
import { Company } from '../../models/company';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-mainview',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './mainview.component.html',
  styleUrl: './mainview.component.css'
})
export class MainviewComponent implements OnInit {
  companies: Company[] = [];
  selectedCompany?: Company;

  constructor(private companyService: CompanyService) {}

  ngOnInit(): void {
    this.loadCompanies();
  }

  loadCompanies(): void {
    this.companyService.getCompanies().subscribe({
      next: (data) => {
        this.companies = data.sort((a, b) => (a.id ?? 0) - (b.id ?? 0));
        },
      error: (error) => console.error('Error fetching companies', error)
    });
  }

  deleteCompany(id: number): void {
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

  /*updateSelectedCompany(): void {
    if (this.selectedCompany && this.selectedCompany.id !== undefined) {
      this.companyService.updateCompany(this.selectedCompany.id, this.selectedCompany).subscribe({
        next: () => {
          console.log('Company updated successfully');
          this.loadCompanies(); // Uppdatera listan med företag efter uppdatering
        },
        error: (error) => console.error('Error updating company', error)
      });
    }
  }*/

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
}
