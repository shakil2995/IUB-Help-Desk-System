import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root'
})
export class SnackbarService {

    constructor(private snackbar: MatSnackBar) { }

    openSnackBar(message: string,time?:number,action?:string,) {
        if(time){
            this.snackbar.open(message, null, {
                duration: time,
                verticalPosition: 'bottom',
                horizontalPosition: 'right',
               
            }); 
        }
        else if(action){
        this.snackbar.open(message, action,{});
        }
        else {
            this.snackbar.open(message, null, {
                duration: 2000,
                verticalPosition: 'bottom',
                horizontalPosition: 'right',
               
            });
        }
    }
}
