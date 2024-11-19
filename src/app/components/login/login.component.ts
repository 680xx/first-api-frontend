import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators, FormGroup } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isSubmitted: boolean = false;
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private service:AuthService,
    private router:Router ) {
    this.form = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    if(this.service.isLoggedIn())
      this.router.navigateByUrl('/dashboard')
  }

  onSubmit() {
    this.isSubmitted = true;
    if(this.form.valid) {
      this.service.signin(this.form.value).subscribe({
        next: (res:any) => {
          this.service.saveToken(res.token);
          this.router.navigateByUrl('/dashboard');
        },
        error:err=> {
          if(err.status==400)
            console.log('Incorrect email or password');
          else
            console.log('error during login:\n', err);
        }
      })
    }
  }
}
