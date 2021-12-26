import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthenticationService } from '@packages/services/auth/authentication.service';
import { SharedDataService } from '@packages/services/shared-data.service';
import { SnackbarService } from '@packages/services/snackbar.service';

@Component({
    selector: 'app-platform-login',
    templateUrl: './app-platform-login.component.html',
    styleUrls: ['./app-platform-login.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})

export class AppPlatformLoginComponent implements OnInit {
    public loginForm: FormGroup;
    public loginData: any;
    public loader: boolean;
    isStudent: boolean;
    userType: any = 'admin';

    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder,
        private authenticationService: AuthenticationService,
        private router: Router,
        private snackbarService: SnackbarService,
        private sharedData : SharedDataService,
        private snackbar : MatSnackBar
    ) {
        // Configure the layout
        this._fuseConfigService.config = {
            layout: {
                navbar: {
                    hidden: true
                },
                toolbar: {
                    hidden: true
                },
                // footer: {
                //     hidden: true
                // },
                // sidepanel: {
                //     hidden: true
                // }
            }
        };
        
    }


    login() {

        if (this.loginForm.invalid) {
            this.snackbar.open('Required field missing!', 'ok',
                { duration: 2000, verticalPosition: 'bottom', horizontalPosition: 'center' });
            return false
            
        }
        this.loginData = {
            email: this.loginForm.value.email,
            password: this.loginForm.value.password
        };
        this.loader = true;
        this.authenticationService.login(this.loginData).subscribe(response => {
            this.loader = false;
            console.log('lodin Data',response);
            localStorage.setItem('token', response['access_token']);
            localStorage.setItem('user_type', response['user_type']);
            localStorage.setItem('user_id', response['user_id']);
            this.snackbar.open('Login sucessfull!','ok',{duration:2000,verticalPosition : 'bottom',horizontalPosition : 'center'});
            // this.snackbarService.openSnackBar(response.msg,2000,'ok');
            this.authenticationService.isloggedIn = true;
            if(this.authenticationService.redirectUrl !=null){
                this.router.navigateByUrl(this.authenticationService.redirectUrl);
            }else{
                this.router.navigate(['dashboard']);
            }
        }, err => {
            console.log('login err', err);
            this.snackbar.open(err.error.error?err.error.error: JSON.stringify(err.error),'ok',{duration:6000,verticalPosition : 'bottom',horizontalPosition : 'center'});
            // this.snackbarService.openSnackBar(err.error.msg?err.error.msg: JSON.stringify(err.error),5000,'ok');
            this.loader = false;
            // this.authenticationService.isloggedIn = false;
        });
    }

    
    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.loginForm = this._formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        });
    }
}

export interface ILoginData {
    email: string;
    password: string;
}
