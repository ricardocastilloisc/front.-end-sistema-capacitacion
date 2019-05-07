import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import {
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivate
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(private router: Router,
    private auth:  AuthService) {}
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean{
    if (this.auth.isAuthenticated()) {
      return true;
    } else {
      this.router.navigateByUrl('/');
      return false;
    }
  }
}