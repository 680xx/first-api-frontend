import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { claimReq } from '../../utils/claimReq-utils';
import { HideIfClaimsNotMetDirective} from '../../directives/hide-if-claims-not-met.directive';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [ RouterOutlet, RouterLink, HideIfClaimsNotMetDirective],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css'
})
export class MainLayoutComponent {

  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UserService) { }

  claimReq = claimReq;

  onLogout() {
    this.authService.deleteToken()
    this.router.navigateByUrl('/signin');
  }

}
