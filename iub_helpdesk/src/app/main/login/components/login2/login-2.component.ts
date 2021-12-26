import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { AuthenticationService } from '@packages/services/auth/authentication.service';
import { Router } from '@angular/router';
import { SnackbarService } from '@packages/services/snackbar.service';
import { SharedDataService } from '@packages/services/shared-data.service';
import { MatSnackBar } from '@angular/material';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';

@Component({
    selector     : 'login-2',
    templateUrl  : './login-2.component.html',
    styleUrls    : ['./login-2.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class Login2Component implements OnInit
{
    loginform: FormGroup;
    registrationForm: FormGroup;
    public loginData: any;
  /**
   * Constructor
   *
   * @param {FuseConfigService} _fuseConfigService
   * @param {FormBuilder} _formBuilder
   */
  constructor(
      private _fuseConfigService: FuseConfigService,
      private fb: FormBuilder,
      private authenticationService: AuthenticationService,
    private router: Router,
    private snackbarService: SnackbarService,
    private sharedData : SharedDataService,
    private snackbar : MatSnackBar,
    public progressbar : FuseProgressBarService
  )
    {
        // Configure the layout
        this._fuseConfigService.config = {
            layout: {
                navbar   : {
                    hidden: true
                },
                toolbar  : {
                    hidden: true
                },
                footer   : {
                    hidden: true
                },
                sidepanel: {
                    hidden: true
                }
            }
        };
    }
    login() {
        this.progressbar.show();
        this.loginData = {
            email: this.loginform.value.email,
            password: this.loginform.value.password
        };
       
        this.authenticationService.login(this.loginData).subscribe(response => {
          
            console.log('lodin Data',response);
            localStorage.setItem('token', response['token']);

            if(response.status == true){
                this.snackbar.open(response.message,'ok',{duration:2000,verticalPosition : 'bottom',horizontalPosition : 'center'});
                this.authenticationService.isloggedIn = true;
                if(this.authenticationService.redirectUrl !=null){
                    this.router.navigateByUrl(this.authenticationService.redirectUrl);
                }else{
                    this.router.navigate(['dashboard']);
                }
            }else{
                this.snackbar.open(response.message,'ok',{duration:6000,verticalPosition : 'top',horizontalPosition : 'right',panelClass : 'custom_snackbar'});
            }
            
            this.progressbar.hide();
        }, err => {
            console.log('login err', err);
            this.snackbar.open("Internal Server Error. Login failed!",'ok',{duration:6000,verticalPosition : 'top',horizontalPosition : 'right',panelClass : 'custom_snackbar'});
            // this.snackbarService.openSnackBar(err.error.message?err.error.message: JSON.stringify(err.error),5000,'ok');
       
            // this.authenticationService.isloggedIn = false;
            this.progressbar.hide();
        });
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        this.loginform = this.fb.group({
            email   : ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        });
    }
}
