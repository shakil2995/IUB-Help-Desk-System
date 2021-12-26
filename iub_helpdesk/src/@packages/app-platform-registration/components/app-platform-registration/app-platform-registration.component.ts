import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { Router } from '@angular/router';
import { AuthenticationService } from '@packages/services/auth/authentication.service';
import { SnackbarService } from '@packages/services/snackbar.service';


@Component({
    selector     : 'app-platform-registration',
    templateUrl  : './app-platform-registration.component.html',
    styleUrls    : ['./app-platform-registration.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class AppPlatformRegistrationComponent implements OnInit, OnDestroy
{
    registerForm: FormGroup;
    registerData: any;
    loader: boolean;
    rolelist:any[] =  [
        {name : 'Student',value : 'student'},
        {name : 'Employee',value : 'employee'},
        {name : 'Admission Officer',value : 'admission_officer'},
        {name : 'Register Officer',value : 'register_officer'}
    ]
    // Private
    private _unsubscribeAll: Subject<any>;

    constructor(
        private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder,
        private authenticationService: AuthenticationService,
        private router: Router,
        private snackbarService: SnackbarService
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

        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    register() {
        this.registerData = {
            name: this.registerForm.value.name,
            email: this.registerForm.value.email,
            mobile          : this.registerForm.value.mobile,
            role            : this.registerForm.value.role,
            terms_condition : this.registerForm.value.terms_condition,
            password       : this.registerForm.value.password,
            confirm_password       : this.registerForm.value.passwordConfirm,
        };

        this.loader = true;
        this.authenticationService.register(this.registerData).subscribe(response => {
            this.router.navigate(['login']);
            this.snackbarService.openSnackBar('Registration successful');
            this.loader = false;
            // this.router.navigateByUrl('/login');
        }, (error) => {
            console.log('err', error);
            this.snackbarService.openSnackBar(error.error.error);
            this.loader = false;
        });
    }
    /**
     * On init
     */
    ngOnInit(): void
    {
        this.registerForm = this._formBuilder.group({
            name           : ['', Validators.required],
            email          : ['', [Validators.required, Validators.email]],
            mobile          : ['', Validators.required],
            role            : ['',Validators.required],
            terms_condition : ['',Validators.required],
            password       : ['', Validators.required],
            passwordConfirm: ['', [Validators.required, confirmPasswordValidator]]
        });

        // Update the validity of the 'passwordConfirm' field
        // when the 'password' field changes
        this.registerForm.get('password').valueChanges
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(() => {
                this.registerForm.get('passwordConfirm').updateValueAndValidity();
            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
}

/**
 * Confirm password validator
 *
 * @param {AbstractControl} control
 * @returns {ValidationErrors | null}
 */
export const confirmPasswordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {

    if ( !control.parent || !control )
    {
        return null;
    }

    const password = control.parent.get('password');
    const passwordConfirm = control.parent.get('passwordConfirm');

    if ( !password || !passwordConfirm )
    {
        return null;
    }

    if ( passwordConfirm.value === '' )
    {
        return null;
    }

    if ( password.value === passwordConfirm.value )
    {
        return null;
    }

    return {passwordsNotMatching: true};
};
