import { HttpInterceptor, HttpRequest, HttpHandler, HttpUserEvent, HttpEvent, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private router: Router,private snackbar :MatSnackBar) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (req.headers.get('No-Auth') === 'True') {
            return next.handle(req.clone());
        }

        if (localStorage.getItem('token') != null) {
            const clonedreq = req.clone({
                headers: req.headers.set('Authorization', 'Bearer ' + localStorage.getItem('token'))
            });
            const started = Date.now();
            return next.handle(clonedreq).pipe(
                tap(event => {
                  if (event instanceof HttpResponse) {
                    const elapsed = Date.now() - started;
                    console.log(`Request for ${req.urlWithParams} took ${elapsed} ms.`);
                  }
                }, error => {
                  console.error('NICE ERROR', error);
                  if (error.status === 401) {
                    this.snackbar.open('Unauthorised access! your login token is expired','ok',{duration : 5000,verticalPosition: 'top',horizontalPosition:'center'})
                        this.router.navigateByUrl('/login');
                        
                  }
                })
            );
        }else{
            this.snackbar.open('Unauthorised access! You have not given the login token','ok',{duration : 5000,verticalPosition: 'top',horizontalPosition:'center'})
            this.router.navigateByUrl('/login'); 
            
        }
    }
}
