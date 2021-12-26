import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { TicketCreateComponent } from '../ticket-create/ticket-create.component';

@Component({
  selector: 'app-ticket-dialog',
  templateUrl: './ticket-dialog.component.html',
  styleUrls: ['./ticket-dialog.component.scss']
})
export class TicketDialogComponent implements OnInit {

  constructor(private router :  Router,private dialog:MatDialog) { }

  ngOnInit() {

      const resdialog_ref = this.dialog.open(TicketCreateComponent,{
        panelClass : 'custom_dialog_css',
        data: []
      })
      resdialog_ref.afterClosed().subscribe(res=>{

          this.router.navigate(['ticket','ticket-list'])
      
        console.log('afterclosed',res);
      })
    
  }

}
