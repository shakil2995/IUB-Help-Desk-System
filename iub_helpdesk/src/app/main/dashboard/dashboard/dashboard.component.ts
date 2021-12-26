import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { ApiService } from '@packages/services/api.service';
import { DataSharingService } from '@packages/services/data-sharing.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  data: any[] = []
  user_type:string
  user_id: number
  get changePermission() {
    if (['employee','admin'].includes(this.user_type)) {
      return true
    } else {
      return false
    }
  }
  open_ticket = []
  done_ticket = []
  in_progress_ticket = []
  review_ticket = []
  cancelled = []
  constructor(private api_service : ApiService,
    private progress : FuseProgressBarService,
    private router : Router,
    private snackbar : MatSnackBar,
    public dataShare : DataSharingService,
    public dialog: MatDialog) { }
  pieChart = {
    title : 'Ticket Frequency',
    type: 'PieChart',
    columnNames : ['Task', 'Hours per Day'],
    data : [
      ['Open', 1],
      ['Done',      1],
      ['In-progress',  1],
      ['Review', 1],
      ['Cancelled',    1]
    ],
    options: {
      is3D : true
      
    }
  }
  
  getData(){
    this.progress.show();
    this.api_service.getDashboarddata().subscribe(res=>{
      this.data = res;
      console.log('dashboard data',this.data);
      
      this.progress.hide();
    },err=>{
      this.snackbar.open(err.nessage ?  err.message : err.error.message,'ok',{duration:5000})
    })
  }
 
  getAllTicketList(){
    this.progress.show();
      this.api_service.getAllTicket().subscribe(res=>{
        this.data = res;
        if (this.user_type == 'student') {
          this.data = this.data.filter(item=>item.initiator_id =  this.user_id)
        }
        this.data.map(item => {
          item.ticket_id =  'TKT' + ('0000'+item.id).slice(-4)
          // item.updated_date = new Date(item.updated_date).toLocaleString('en-BD', { timeZone: 'UTC'})
         return item
        })
        this.open_ticket = this.data.filter(item=>item.resolve_status == 'open')
        this.in_progress_ticket = this.data.filter(item=>item.resolve_status == 'done')
        this.done_ticket = this.data.filter(item=>item.resolve_status == 'in_progress')
        this.review_ticket = this.data.filter(item=>item.resolve_status == 'review')
        this.cancelled = this.data.filter(item=>item.resolve_status == 'cancelled')
        console.log('Ticket list info', this.data);
        this.pieChart.data = [
          ['Open', this.open_ticket.length],
          ['Done',  this.in_progress_ticket.length],
          ['In-progress',  this.done_ticket.length],
          ['Review', this.review_ticket.length],
          ['Cancelled',   this.cancelled.length]
        ]
         this.progress.hide(); 
      },err=>{
        console.log('something went wrong');
        
      })  
  }
  navigateTo(item) {
    this.dataShare.supplyData({'dashboard_ticket_number' : item.ticket_id})
    this.router.navigate(['ticket', 'ticket-list']);

  }

  ngOnInit() {
    this.getData();
    this.getAllTicketList()
    this.user_type = localStorage.getItem('user_type')
    this.user_id = parseInt(localStorage.getItem('user_id'))
  }

}
