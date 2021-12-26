import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild} from '@angular/router';
import { SnackbarService } from '../snackbar.service';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router,private authenticationService: AuthenticationService,private snackbar : MatSnackBar) {
  
      let token = localStorage.getItem('token');
      if (token) {
        this.authenticationService.isloggedIn = true;
        // console.log('authorised',token);
      }else{
          this.authenticationService.isloggedIn = false; 
          // console.log('Unauauthorised',token);
      }
    
  }

  canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot): boolean {
    // console.log('state url',state.url); 
    // console.log('route',route); 
      if (!this.authenticationService.isloggedIn) {
        
        
        if(state.url != '/dashboard'){ 
             this.snackbar.open('Unauthorised access! You are not allowed to view this page. please login first','ok',{duration : 5000,verticalPosition: 'top',horizontalPosition:'center'})
        }
       
        this.authenticationService.redirectUrl = state.url;
        this.router.navigate(["login"],{ queryParams: { retUrl: state.url} });
        return false;
      } 
     return true;
  }
  // canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
  //   return this.canActivate(route, state);
  // }

 // canActivate(
  //   route: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): boolean {
  //   const url: string = state.url;
  //   return this.checkLogin(url);
  // }
  // checkLogin(url: string) {
  //   if (this.authenticationService.isUserLoggedIn()) {
  //     return true;
  //   }

  //   this.authenticationService.redirectUrl = url;

  //   this.router.navigate(['/login'], {queryParams: { returnUrl: url }} );
  // }
}
