import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {AuthService} from './auth.service';

export interface User {
  id?: number;
  email: string;
  password?: string;
  fullName: string;
  role: string;
  gender: string;
  age: number;
  libraryID?: number;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:5028';

  constructor(private http: HttpClient, private authService: AuthService) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/users`);
  }

  createUser(user: User): Observable<any> {
    return this.http.post(`${this.baseUrl}/signup`, user);
  }

  updateUser(userId: string, user: Partial<User>): Observable<any> {
    return this.http.put(`${this.baseUrl}/updateuser/${userId}`, user);
  }

  deleteUser(userId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/deleteuser/${userId}`);
  }

  signIn(email: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/signin`, { email, password });
  }

/*  getUserProfile(): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/Userprofile`);
  }*/

    getUserProfile(): Observable<any> {
    const token = this.authService.getToken(); // Assuming you have a method to get the auth token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`  // Add the token to the Authorization header
    });
    return this.http.get(`${this.baseUrl}/api/Userprofile`, { headers });
  }
}
