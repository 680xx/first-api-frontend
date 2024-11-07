import { Component } from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [ RouterOutlet ],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css'
})
export class MainLayoutComponent {

  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UserService) { }

  onLogout() {
    this.authService.deleteToken()
    this.router.navigateByUrl('/signin');
  }

}
