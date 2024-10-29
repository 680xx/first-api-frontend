import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CompanyService } from '../../services/company.service';
import { Company } from '../../models/company';

@Component({
  selector: 'app-company-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './company-form.component.html',
  styleUrls: ['./company-form.component.css']
})
export class CompanyFormComponent {
  company: Company = { name: '', organizationNumber: 0, contactPerson: '', phoneNumber: '' };

  constructor(private companyService: CompanyService) {}

  async saveCompany(): Promise<void> {
    try {
      if (this.company.id) {
        await this.companyService.updateCompany(this.company.id, this.company);
        alert('Company updated successfully');
      } else {
        await this.companyService.createCompany(this.company);
        alert('Company created successfully');
      }
    } catch (error) {
      console.error('Error saving company', error);
    }
  }
}