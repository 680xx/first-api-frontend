import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Company } from '../models/company';
import {TOKEN_KEY} from './constants';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private apiUrl = 'http://localhost:5028/api/Company';

  constructor(private http: HttpClient) {}

  private getAuthHeaders() {
    const token = localStorage.getItem(TOKEN_KEY); // eller från sessionStorage eller annan plats
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getCompanies(): Observable<Company[]> {
    return this.http.get<Company[]>(this.apiUrl, { headers: this.getAuthHeaders() });
  }

  getCompanyById(id: number): Observable<Company> {
    return this.http.get<Company>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
  }

  createCompany(company: Company): Observable<Company> {
    return this.http.post<Company>(this.apiUrl, company, { headers: this.getAuthHeaders() });
  }

  updateCompany(id: number, company: Company): Observable<Company> {
    return this.http.put<Company>(`${this.apiUrl}/${id}`, company, { headers: this.getAuthHeaders() });
  }

  deleteCompany(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
  }
}

export type { Company };
