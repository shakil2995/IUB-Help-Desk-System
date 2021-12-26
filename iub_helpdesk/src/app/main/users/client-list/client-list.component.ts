import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MatPaginator, MatSnackBar, MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { ApiService } from '@packages/services/api.service';
import { xlsx } from '@packages/services/xlsx';
import { data } from '../users_data';


@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss'],
  animations : fuseAnimations
})
export class ClientListComponent implements OnInit {
  table_material_data :  MatTableDataSource<any>;
  columnsDefinations: any[]=[];
  data:any[]=[];
  list_mode :boolean = true;
  displayedColumns: any = [
    { display: 'Name', field: 'name' },
    { display: 'Email', field: 'email' },
    { display: 'Mobile', field: 'mobile' },
    { display: 'Last Login', field: 'last_login' }
  ];
  @ViewChild(MatPaginator, {static: true} as any) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true} as any) sort: MatSort;
  constructor(private service : ApiService,private router : Router,
              private snackbar :  MatSnackBar,
              private progressbar : FuseProgressBarService,
              private dialog : MatDialog) { }
  excelExport(){
    xlsx.exportToExcel('excel_sheet','client_list_sheets');
  }
  //========= filtering section =========
  filter=[
    {view : 'All',val : ''},
    {view : 'Email',val : 'email'},
    {view : 'Mobile',val : 'mobile'},
    {view : 'Active Status',val : 'is_active'},
  ]
filterselect:any='';
search:FormControl = new FormControl();
applyFilter(event:any) {  
    this.table_material_data.filterPredicate = (data,filter)=>{
      if(this.filterselect){
        return data[this.filterselect].toString().toLowerCase() === filter;
      }else{
        return Object.values(data).toString().toLowerCase().indexOf(filter) !== -1
      }
    }
    this.table_material_data.filter = event.toString().trim().toLowerCase();
  }
  filterCriteriaChange(){
    this.search.setValue('')
  }

  // === CRUD operation
  create_new(){
    this.router.navigate(['users','client-entry']);
  }
  delete(data,index){
  console.log('data',data,'index',index);
  this.progressbar.show();
  this.service.client_delete(data.id).subscribe(res=>{
    this.snackbar.open(res.message,'ok',{duration:2000});
    this.progressbar.hide();
    this.getUserdata();
  },err=>{
    this.progressbar.hide();
    this.snackbar.open(err.error.message ? err.error.message : JSON.stringify(err.error),'ok',{duration:6000});
    this.getUserdata();
  })

  }
  edit(data){
    console.log('update-client-id',data.id);
    this.router.navigate(['users','client-update',data.id])
    
  }
  getUserdata(){
      this.progressbar.show();
        this.service.getAllClient().subscribe(res=>{
          this.data = res;
          console.log('getAllClinet',res);
          this.table_material_data = new MatTableDataSource<any>(this.data);
          this.table_material_data.paginator = this.paginator;
           this.table_material_data.sort = this.sort;
           this.progressbar.hide();
        },err=>{
           this.snackbar.open(err.error.message ? err.error.message : JSON.stringify(err.error),'ok',{duration:6000});
          
        })  
  }
  ngOnInit() {
        this.columnsDefinations = this.displayedColumns.map(item => item.field);
        this.columnsDefinations.unshift('avatar')
        this.columnsDefinations.push('status'); 
        this.columnsDefinations.push('details');
        this.getUserdata();
        this.search.valueChanges.subscribe(res=>{
          this.applyFilter(res);
        })
  }

}

// dummydatas = [
//   { id : 1,
//     f_name : 'dammyData',
//     l_name : 'dammyData',
//     contact_no_home : 'dammyData',
//     contact_no_office : 'dammyData',
//     email : 'dammyData',
//     mailing_address : 'dammyData',
//     nid : 'dammyData',
//     picture : '',
//     auth_dealing_person : 'dammyData',
//     status : 'dammyData',
//     bank_acc : 'dammyData',
//     bank_branch : 'dammyData',
//     bank_name : 'dammyData',
//     job_description : 'dammyData',
//     job_designation : 'dammyData',
//     job_companyName : 'dammyData',
//     job_status : 'dammyData'
//   }]