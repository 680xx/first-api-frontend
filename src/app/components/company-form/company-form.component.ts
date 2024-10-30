import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { CompanyService } from '../../services/company.service';
import { Company } from '../../models/company';

@Component({
  selector: 'app-company-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './company-form.component.html',
  styleUrls: ['./company-form.component.css']
})
export class CompanyFormComponent {
  company: Company = { name: '', organizationNumber: 0, contactPerson: '', phoneNumber: '' };
  loading: boolean = false; // For loading state
  errorMessage: string | null = null; // For error messages

  constructor(private companyService: CompanyService) {}

  saveCompany(): void {
    this.loading = true; // Set loading state
    this.errorMessage = null; // Reset error message

    if (this.company.id) {
      this.companyService.updateCompany(this.company.id, this.company).subscribe({
        next: () => {
          alert('Company updated successfully');
          this.loading = false; // Reset loading state
        },
        error: (error) => {
          this.errorMessage = 'Error updating company, please try again.';
          console.error('Error updating company', error);
          this.loading = false; // Reset loading state
        }
      });
    } else {
      this.companyService.createCompany(this.company).subscribe({
        next: () => {
          alert('Company created successfully');
          this.loading = false; // Reset loading state
        },
        error: (error) => {
          this.errorMessage = 'Error creating company, please try again.';
          console.error('Error creating company', error);
          this.loading = false; // Reset loading state
        }
      });
    }
  }
}