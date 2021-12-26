import { Component, OnInit } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { FuseConfigService } from '@fuse/services/config.service';
import { AuthenticationService } from '@packages/services/auth/authentication.service';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
  animations : fuseAnimations
})
export class NotFoundComponent implements OnInit {

  constructor(private _fuseConfigService :  FuseConfigService,private authService : AuthenticationService) {
            // Configure the layout
    if(this.authService.isloggedIn){
      this._fuseConfigService.config = {
        layout: {
            navbar: {
                hidden: false
            },
            toolbar: {
                hidden: false
            },
       
        }
      }
    }else{
      this._fuseConfigService.config = {
        layout: {
            navbar: {
                hidden: true
            },
            toolbar: {
                hidden: true
            },
        }
      }
    }
            
   }

  ngOnInit() {
  }

}
