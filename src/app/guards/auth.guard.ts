import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../load-service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router,private auth: AuthService){}
  canActivate(): boolean {
    const sessionToken = localStorage.getItem('session_token');

    if (this.auth.isloggedin()) {
      return true;
    } else {
      this.auth.logout()
      return false
    }
  }
}