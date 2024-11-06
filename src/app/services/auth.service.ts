import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TOKEN_KEY } from './constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) {  }
  baseURL = 'http://localhost:5028/api';

  createUser(formData:any) {
    return this.http.post(this.baseURL+'/signup',formData);
  }

  signin(formData:any) {
    return this.http.post(this.baseURL+'/signin',formData);
  }

  // Returnerar true/false beroende om användaren har en Token eller ej
  isLoggedIn() {
    return localStorage.getItem(TOKEN_KEY) != null ? true : false;
  }

  saveToken(token: string) {
    localStorage.setItem(TOKEN_KEY, token);
  }

  deleteToken() {
    localStorage.removeItem(TOKEN_KEY);
  }
}
