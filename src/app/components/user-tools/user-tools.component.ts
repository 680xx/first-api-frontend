import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import { NgFor } from '@angular/common';
import {User} from '../../services/user.service';

@Component({
  selector: 'app-user-tools',
  standalone: true,
  templateUrl: './user-tools.component.html',
  styleUrls: ['./user-tools.component.css'],
  imports: [NgFor, ReactiveFormsModule],
})
export class UserToolsComponent implements OnInit {
  userForm: FormGroup;
  users: any[] = [];
  apiUrl = 'http://localhost:5028'; // Anpassa URL till din backend

  constructor(private http: HttpClient, private fb: FormBuilder) {
    this.userForm = this.fb.group({
      email: [''],
      password: [''],
      fullName: [''],
      role: [''],
      gender: [''],
      age: [null],
      libraryID: [null],
    });
  }

  ngOnInit() {
    this.getAllUsers();
  }

  // CRUD-metoder
  createUser() {
    this.http.post(`${this.apiUrl}/api/signup`, this.userForm.value).subscribe({
      next: (res) => {
        alert('User created successfully');
        this.getAllUsers();
        this.userForm.reset();
      },
      error: (err) => alert('Error creating user: ' + err.message),
    });
  }

  getAllUsers() {
    this.http.get(`${this.apiUrl}/api/users`).subscribe({
      next: (res: any) => (this.users = res),
      error: (err) => alert('Error fetching users: ' + err.message),
    });
  }

  updateUser(userId: string) {
    this.http.put(`${this.apiUrl}/api/updateuser/${userId}`, this.userForm.value).subscribe({
      next: (res) => {
        alert('User updated successfully');
        this.getAllUsers();
      },
      error: (err) => alert('Error updating user: ' + err.message),
    });
  }

  deleteUser(userId: string) {
    this.http.delete(`${this.apiUrl}/api/deleteuser/${userId}`).subscribe({
      next: (res) => {
        alert('User deleted successfully');
        this.getAllUsers();
      },
      error: (err) => alert('Error deleting user: ' + err.message),
    });
  }

  fillForm(user: User) {
    this.userForm.patchValue({
      email: user.email,
      password: '', // Håll lösenordet tomt för säkerhet
      fullName: user.fullName,
      role: user.role,
      gender: user.gender,
      age: user.age,
      libraryID: user.libraryID,
    });
  }
}
