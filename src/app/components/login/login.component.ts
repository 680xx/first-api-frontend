import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators, FormGroup } from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  isSubmitted: boolean = false;
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private service:AuthService,
    private router:Router ) {
    // private toastr: ToastrService
    this.form = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }



onSubmit() {
    this.isSubmitted = true;
    if(this.form.valid) {
      this.service.signin(this.form.value).subscribe({
        next: (res:any) => {
          localStorage.setItem('token', res.token);
          this.router.navigateByUrl('/dashboard');
        },
        error:err=> {
          if(err.status==400)
            console.log('Incorrect email or password');
            // this.toastr.error('Incorrect email or password.', 'Login failed')
          else
            console.log('error during login:\n', err);
        }
      })
    }
}
}


/*import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(public formBuilder:FormBuilder) { }


  form = this.formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required]

  })
}*/

