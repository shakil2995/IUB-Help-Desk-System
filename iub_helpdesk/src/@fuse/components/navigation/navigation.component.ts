import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { merge, Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { FuseNavigationService } from '@fuse/components/navigation/navigation.service';
import { navigation } from 'app/navigation/navigation';
import { FuseProgressBarComponent } from '../progress-bar/progress-bar.component';
import { FuseProgressBarService } from '../progress-bar/progress-bar.service';
import { MatSnackBar } from '@angular/material';
import { SnackbarService } from '@packages/services/snackbar.service';
import { EventEmitService } from '@packages/services/event-emit.service';
import jwt_decode from "jwt-decode";
import { fuseAnimations } from '@fuse/animations';
import { FuseNavigation } from '@fuse/types';
import { isBoolean } from 'lodash';
@Component({
    selector       : 'fuse-navigation',
    templateUrl    : './navigation.component.html',
    styleUrls      : ['./navigation.component.scss'],
    animations : fuseAnimations,
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FuseNavigationComponent implements OnInit
{
    @Input()
    layout = 'vertical';

    @Input()
    navigation: any[]=[];
    waiting:boolean;
    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     *
     * @param {ChangeDetectorRef} _changeDetectorRef
     * @param {FuseNavigationService} _fuseNavigationService
     */
    snackbarStatus :any
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _fuseNavigationService: FuseNavigationService,
        private progressbar : FuseProgressBarService,
        private snackbar : MatSnackBar,
        private _eventService :EventEmitService,
    )
    {
        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * producePermittedNavigationArray
     *
     * @param UserPermissionArray
     * @param SystemCurrentFullNavigationArray
     * @modified UserPermissionArray in according to permissions
     */
    producePermittedNavigationArr(arr1:any,arr2:any){
        arr1.find((v,i,arr)=>{
            arr2.find(fv=>{          
                if(fv.id  === v.id){
                    if(fv.children && v.children){
                        if ((fv.children !== undefined && v.children !== undefined) || (fv.children.length != 0 && v.children.length != 0)) {
                            this.producePermittedNavigationArr(v.children,fv.children); 
                        }
                        arr[i].title=fv.title;
                        arr[i].type=fv.type;   
                        arr[i].icon=fv.icon; 
                    }else{
                        arr[i]=fv;
                    } 
                }
            })
            
        })    
    } 
  setNavitaionPermissionWise(token){
        let decodedToken = jwt_decode(token);
        console.log('decodedToken',decodedToken);
        
         this._fuseNavigationService.unregister('main');
         this.progressbar.show();
        let status =  this.snackbar.open('Waiting for data loading','ok');
        // Register the navigation to the service
            const UserPermissionsArr = [
                {
                    id       : 'dashboard', 
                },
                {
                    id       : 'users',
                    children : [
                        {
                            id     : 'client',
                            children : [
                                {
                                    id : 'client_list',
                                },
                                {
                                  id  : 'add_new_client',
                                }  
                            ]
                        },
                        {
                            id       : 'employees',
                            children : [
                                {
                                    id       : 'add_new_employee',
                                },
                                {
                                    id       : 'employee_list',
                                },  
                            ]
                      
                        }
                    ]
                },
                {
                    id       : 'projects',
                    children : [
                        {
                            id       : 'task',
                            children : [
                                {
                                    id       : 'create_tasks',
                                },
                                {
                                    id       : 'tasks_list',   
                                },  
                            ]
                      
                        },
                        {
                            id       : 'project',
                            children : [
                                {
                                    id       : 'add_new_client',
                                },
                                {
                                    id       : 'projects_list',
                                },  
                            ]
                      
                        },  
                    ]
                },
                {
                            id       : 'configuration',
                },
            ];

           let SystemFullNavigationArr = JSON.parse(JSON.stringify(navigation));
           this.producePermittedNavigationArr(UserPermissionsArr,SystemFullNavigationArr);
           console.log('SystemFullNavigationArr',SystemFullNavigationArr);
           console.log('userNav',UserPermissionsArr);
          
           
        //    let user_permission =  JSON.parse(JSON.stringify(UserPermissionsArr));
            // Register the new navigation
            this._fuseNavigationService.register('user-nav',UserPermissionsArr);

            // Set the current navigation
            this._fuseNavigationService.setCurrentNavigation('user-nav'); 
            this.progressbar.hide();
            status.dismiss();
       
  
    }


    /**
     * On init
     */
    ngOnInit(): void
    {   
        // var token = localStorage.getItem('token')
        // if(token){
        //     this.setNavitaionPermissionWise(token);
        // }
        
        // Load the navigation either from the input or from the service
        this.navigation = this.navigation || this._fuseNavigationService.getCurrentNavigation();

        // Subscribe to the current navigation changes
        this._fuseNavigationService.onNavigationChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(() => {

                // Load the navigation
                this.navigation = this._fuseNavigationService.getCurrentNavigation();

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });

        // Subscribe to navigation item
        merge(
            this._fuseNavigationService.onNavigationItemAdded,
            this._fuseNavigationService.onNavigationItemUpdated,
            this._fuseNavigationService.onNavigationItemRemoved
        ).pipe(takeUntil(this._unsubscribeAll))
         .subscribe(() => {

             // Mark for check
             this._changeDetectorRef.markForCheck();
         });

        
    }
}
