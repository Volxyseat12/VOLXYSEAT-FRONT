import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
} from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private router: Router, private authService: AuthService) {

  }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    return this.checkAuth(route)
  }

  canActivateChild(route: ActivatedRouteSnapshot): boolean {
    return this.checkAuth(route)
  }

  private checkAuth(route: ActivatedRouteSnapshot): boolean {
    const targetUrl = `/${route.url.join('/')}`;

    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login'], { queryParams: { returnUrl: targetUrl } });
      return false;
    }

    if (targetUrl == "/admin"){
      if (this.authService.getUserRoles().includes("admin")){
        return true;
      }
      this.router.navigate(['/']);
      return false;
    }

    return true;
  }

}
