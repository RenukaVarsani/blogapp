import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot,
  CanActivate, RouterStateSnapshot, Router, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './../../services/auth.service';
@Injectable({
  providedIn: 'root'
})
export class AuthguardGuard implements CanActivate {
  constructor(private authservice:AuthService , private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
       const isAuth = this.authservice.isAdmin1;
    if (!isAuth) {
      this.router.navigate(['/login']);
    }
    return isAuth;

  }

}
