import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TOKEN_KEY } from './constants';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) {  }

  createUser(formData:any) {
    // Hårdkodade värden för nya användare.
    formData.role = "User"
    formData.gender = "Male"
    formData.age = "35"
    return this.http.post(environment.apiBaseUrl + '/signup',formData);
  }

  signin(formData:any) {
    return this.http.post(environment.apiBaseUrl + '/signin',formData);
  }

  // Returnerar true/false beroende om användaren har en Token eller ej
  isLoggedIn() {
    return this.getToken() != null ? true : false;
  }

  saveToken(token: string) {
    localStorage.setItem(TOKEN_KEY, token);
  }

/*  getToken() {
    return localStorage.getItem(TOKEN_KEY);
  }*/

  getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(TOKEN_KEY);
    }
    return null;
  }

  deleteToken() {
    localStorage.removeItem(TOKEN_KEY);
  }

  getClaims() {
    return JSON.parse(window.atob(this.getToken()!.split('.')[1]))
  }
}
