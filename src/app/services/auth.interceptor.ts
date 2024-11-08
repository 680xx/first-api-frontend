import { HttpInterceptorFn } from '@angular/common/http';
import {AuthService} from './auth.service';
import {inject} from '@angular/core';
import {Router} from '@angular/router';
import {tap} from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService)
  const router = inject(Router)

  if (authService.isLoggedIn()) {
    const clonedReq = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + authService.getToken())
    })
    return next(clonedReq).pipe(
      tap({
        error:(err:any) => {
          if(err.status == 401) { // don't have a valid token
            authService.deleteToken()
            router.navigateByUrl('/signin').then(r => false)
          }
        }
      })
    );
  }
  else
  return next(req);
};
