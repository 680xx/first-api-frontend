import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {UserService} from '../../services/user.service';
import {HideIfClaimsNotMetDirective} from '../../directives/hide-if-claims-not-met.directive';
import {claimReq} from '../../utils/claimReq-utils';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [HideIfClaimsNotMetDirective],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  constructor(

    private router: Router,
    private authService: AuthService,
    private userService: UserService) { }
  fullName: string = ''
  claimReq = claimReq


  ngOnInit(): void {
        this.userService.getUserProfile().subscribe({
          next: (res: any) => {
            console.log(res.fullName);
            this.fullName = res.fullName},
          error: (err: any) => console.log('error while retrieving user profile:\n', err)
        })
    }



}
