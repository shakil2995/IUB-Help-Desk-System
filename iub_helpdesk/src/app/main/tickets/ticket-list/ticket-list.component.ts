import { formatDate } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MatPaginator, MatSnackBar, MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { Animate, animateStagger, detailExpand, fadeInOut} from '@fuse/animations';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { ApiService } from '@packages/services/api.service';
import { DataSharingService } from '@packages/services/data-sharing.service';
import { xlsx } from '@packages/services/xlsx';
import { lorem } from 'faker';
import { TicketCreateComponent } from '../ticket-create/ticket-create.component';


@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss'],
  animations : [fadeInOut,detailExpand,Animate,animateStagger]
})
export class TicketListComponent implements OnInit {

  user_type:string
  user_id: number
  
  employeeList:any[] = []
  assigned_person:any
  table_material_data :  MatTableDataSource<any>;
  task :boolean = false;
  data:any[]=[];
  list_mode :boolean = true;
  
  displayedColumns: any = [
    { display: 'Ticket ID', field: 'ticket_id' },
    { display: 'Updated', field: 'updated_date' },
    { display: 'Request Type', field: 'request_type'},
    { display: 'Request Summary', field: 'title' },
    { display: 'Priority', field: 'priority' },
    { display: 'Assigned Person', field: 'assigne_name'},
    { display: 'Request Client', field: 'initiator_name'},
    { display: 'Resolve Status', field: 'resolve_status'},
];
columnsDefinations: any[]=[];
  @ViewChild(MatPaginator, {static: true} as any) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true} as any) sort: MatSort;
  constructor(private service : ApiService,private router : Router,
    private snackbar :  MatSnackBar,private progressbar : FuseProgressBarService,private dialog : MatDialog,
    private dialog2 : MatDialog,
    private dialog3 : MatDialog,
    private dialog4 : MatDialog,
    public datashare: DataSharingService,
) { }
    excelExport(){
      xlsx.exportToExcel('excel_sheet','ticket_list')
    }

  // for customize filtering
  search:FormControl = new FormControl();
  filter=[
    {view : 'All',val : ''},
    {view : 'Request Type',val : 'request_type'},
    {view : 'Priority',val : 'priority'},
    {view : 'Resolve Status',val : 'resolve_status'},
  ]
  filterselect:any='';
  applyFilter(event:any) { 
    this.table_material_data.filterPredicate = (data,filter)=>{
      if(this.filterselect){ 
        return data[this.filterselect].toLowerCase() === filter;
      }else{
        return Object.values(data).toString().trim().toLowerCase().indexOf(filter) !== -1
      }
    }
    this.table_material_data.filter = event.toString().trim().toLowerCase();
  }
  filterCriteriaChange(){
    this.search.setValue('')
  }
//customize filtering end

  create_new(){
    // this.router.navigate(['projects','create-projects']);
    const resdialog_ref = this.dialog3.open(TicketCreateComponent,{
      panelClass : 'custom_dialog_css',
      data: {}
    })
    resdialog_ref.afterClosed().subscribe(res=>{
      if(res == "reload"){
        this.getAllTicketList();
      }else if(res=='navigate'){
        this.router.navigate(['projects','all_invoiced_list'])
      }
      console.log('afterclosed',res);
    })
  }
  update(row) {
    const resdialog_ref = this.dialog3.open(TicketCreateComponent,{
      panelClass : 'custom_dialog_css',
      data: row
    })
    resdialog_ref.afterClosed().subscribe(res=>{
      if(res == "reload"){
        this.getAllTicketList();
      }else if(res=='navigate'){
        this.router.navigate(['projects','all_invoiced_list'])
      }
      console.log('afterclosed',res);
    })
  }

  update_status(status, row) {
    if (!this.changePermission) {
      this.snackbar.open('You are not permitted to change this status','ok',{
        verticalPosition: 'bottom',
        horizontalPosition : 'center'
      })
      return false
    }
    let payload = {
      resolve_status :  status
    }
    this.service.ticket_update(payload,row.id).subscribe(res=>{
      console.log('result',res);
      this.snackbar.open(res.msg,'ok',{duration:2000});
      this.getAllTicketList()
    },err=>{
      this.snackbar.open(err.error.msg ? err.error.msg  : err.error,'ok',{duration:6000})
    })
    
  }
  assinedto_update(person,row) {
    console.log('person_id', person,'row',row);
    if (!this.changePermission) {
      this.snackbar.open('You are not permitted to change this status','ok',{
        verticalPosition: 'bottom',
        horizontalPosition : 'center'
      })
      return false
    }
    let payload = {
      assigne_id :  person.id
    }
    this.service.ticket_update(payload,row.id).subscribe(res=>{
      console.log('result',res);
      this.snackbar.open(res.msg,'ok',{duration:2000});
      this.getAllTicketList()
    },err=>{
      this.snackbar.open(err.error.msg ? err.error.msg  : err.error,'ok',{duration:6000})
    })
    
  }
  getEmployeeList() {
    this.progressbar.show();
    this.service.getAllemployee().subscribe(res => {
      this.employeeList = res;
      console.log('getEmployeeList::',this.employeeList);
      
    }, err => {
      this.snackbar.open(err.error.message ? err.error.message : JSON.stringify(err.error),'ok',{duration:6000});
    })
  }

  



  

  getAllTicketList(){
      this.progressbar.show();
        this.service.getAllTicket().subscribe(res=>{
          this.data = res;
          if (this.user_type == 'student') {
            this.data = this.data.filter(item=>item.initiator_id =  this.user_id)
          }
          this.data.map(item => {
            item.ticket_id =  'TKT' + ('0000'+item.id).slice(-4)
            item.updated_date = new Date(item.updated_date).toLocaleString('en-BD', { timeZone: 'UTC'})

           return item
          })
          console.log('Ticket list info',this.data);
          this.table_material_data = new MatTableDataSource<any>(this.data);
          this.table_material_data.paginator = this.paginator;
           this.table_material_data.sort = this.sort;
          this.progressbar.hide();
          
          if (this.searchStirng) {
            this.search.setValue(this.searchStirng)
          }
          

        },err=>{
          this.errmsg(err);
        })  
  }
  

  errmsg(err){
    this.snackbar.open(err.error.message ? err.error.message : JSON.stringify(err.error),'ok',{duration:6000});
  }
  get changePermission() {
    if (['employee','admin'].includes(this.user_type)) {
      return true
    } else {
      return false
    }
  }

  searchStirng:string = ''
  ngOnInit() {
        this.columnsDefinations = this.displayedColumns.map(item => item.field);
        // this.columnsDefinations.unshift('avatar')
        // this.columnsDefinations.push('status'); 
        this.columnsDefinations.push('details');
        this.getAllTicketList();
        this.search.valueChanges.subscribe(res=>{
          this.applyFilter(res);
        })
    this.getEmployeeList()
    this.user_type = localStorage.getItem('user_type')
    this.user_id = parseInt(localStorage.getItem('user_id'))
    
    // for internal data sharing
    const rcv = this.datashare.DeliveryData.subscribe(res => {
      let supply:any = res
      if (res.hasOwnProperty('dashboard_ticket_number')) {
          this.searchStirng = supply.dashboard_ticket_number
        }
    })
    rcv.unsubscribe()
    this.datashare.supplyData({})


  }

}
