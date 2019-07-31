import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TestStartedGuard implements CanActivate {

  constructor(private router: Router) { }  

  // testStartedMessage: string = '';

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    // return true;
    if (!sessionStorage.getItem('refreshVar')){
      return true
    } else {
      // this.testStartedMessage = 'Please complete the test first';
      // alert("Please complete the test first.")
      this.router.navigate(['/test']);
      return false;
    }
  }
}
