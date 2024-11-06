import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent implements OnInit {
  constructor(
    public formBuilder: FormBuilder,
    private service: AuthService,
    private router: Router) { }
  isSubmitted:boolean = false;



  form!: FormGroup;



  passwordMatchValidator: ValidatorFn = (control:AbstractControl):null => {
    const password = control.get('password')
    const confirmPassword = control.get('confirmPassword')

    if (password && confirmPassword && password.value != confirmPassword.value)
      confirmPassword?.setErrors({passwordMismatch:true})
    else
      confirmPassword?.setErrors(null)

    return null;
  }

  ngOnInit() {
    if(this.service.isLoggedIn())
      this.router.navigateByUrl('/dashboard')
    this.form = this.formBuilder.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.pattern(/(?=.*[^a-zA-Z0-9 ])/)]],
      confirmPassword: [''],
    }, {validators: this.passwordMatchValidator})
  }

  onSubmit() {
    this.isSubmitted = true;
    if(this.form.valid) {
      this.service.createUser(this.form.value)
        .subscribe({
          next: (res: any)=> {
            if (res.succeeded) {
            this.form.reset();
            this.isSubmitted = false;
          }
            else
              console.log('response:', res);

          },
          error:err => console.log('error', err)
        });
    }
  }

}
