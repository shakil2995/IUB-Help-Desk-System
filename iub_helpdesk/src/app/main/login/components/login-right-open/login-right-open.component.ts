import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseConfigService } from '@fuse/services/config.service';
import { AuthenticationService } from '@packages/services/auth/authentication.service';
import { SharedDataService } from '@packages/services/shared-data.service';
import { SnackbarService } from '@packages/services/snackbar.service';

@Component({
  selector: 'login-right-open',
  templateUrl: './login-right-open.component.html',
  styleUrls: ['./login-right-open.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations   : fuseAnimations
})
export class LoginRightOpenComponent implements OnInit {
    SignUp:boolean
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
    private snackbar : MatSnackBar
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

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */


  login() {
    this.loginData = {
        email: this.loginform.value.email,
        password: this.loginform.value.password
    };
   
    this.authenticationService.login(this.loginData).subscribe(response => {
      
        console.log('lodin Data',response);
        localStorage.setItem('token', response['token']);
        this.snackbar.open(response.message,'ok',{duration:2000,verticalPosition : 'bottom',horizontalPosition : 'center'});
        // this.snackbarService.openSnackBar(response.message,2000,'ok');
        this.authenticationService.isloggedIn = true;
        if(this.authenticationService.redirectUrl !=null){
            this.router.navigateByUrl(this.authenticationService.redirectUrl);
        }else{
            this.router.navigate(['dashboard']);
        }
    }, err => {
        console.log('login err', err);
        this.snackbar.open(err.error.message?err.error.message: JSON.stringify(err.error),'ok',{duration:6000,verticalPosition : 'bottom',horizontalPosition : 'center'});
        // this.snackbarService.openSnackBar(err.error.message?err.error.message: JSON.stringify(err.error),5000,'ok');
   
        // this.authenticationService.isloggedIn = false;
    });
}
  ngOnInit(): void
  { 
    this.loginform = this.fb.group({
        pf_no: ['', Validators.required],
        email : ['',[Validators.required, Validators.email]],
        remember : [''],
        password: ['', Validators.required]
      });
      this.registrationForm = this.fb.group({
        company_name : [''],
        name : [''],
        email : [''],
        username : [''],
        terms : [''],
      })
     
  }

}
