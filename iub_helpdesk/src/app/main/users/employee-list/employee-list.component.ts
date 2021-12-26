import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MatPaginator, MatSnackBar, MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { ApiService } from '@packages/services/api.service';
import { xlsx } from '@packages/services/xlsx';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss'],
  animations : fuseAnimations
})
export class EmployeeListComponent implements OnInit {
  data:any[]=[];
  list_mode:boolean = true;
  table_material_data :  MatTableDataSource<any>;
  columnsDefinations: any[] = [];

  displayedColumns: any = [
    { display: 'Name', field: 'name' },
    { display: 'Email', field: 'email' },
    { display: 'Mobile', field: 'mobile' },
    { display: 'Active', field: 'is_active' },
    { display: 'Last Login', field: 'last_login' }
  ];
  // @ViewChild('TableTwoPaginator', {static: true} as any) tableTwoPaginator: MatPaginator;
  // @ViewChild('TableTwoSort', {static: true} as any) tableTwoSort: MatSort;

  @ViewChild(MatPaginator, {static: true} as any) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true} as any) sort: MatSort;
  constructor(private progressbar:FuseProgressBarService,public api_service: ApiService,public snakbar : MatSnackBar,
    private service : ApiService,private router : Router,private dialog : MatDialog) { }
  // ==========excell export ===========

   excelExport(){
    xlsx.exportToExcel('excel_sheet','employee_list_sheets');
  }
  //========= filtering section =========

  filter=[
    {view : 'All',val : ''},
    {view : 'Email',val : 'email'},
    {view : 'Mobile',val : 'mobile'}
  ]
  filterselect:any='';
  search:FormControl = new FormControl();

  applyFilter(event:any) {  
      this.table_material_data.filterPredicate = (data,filter)=>{
        if(this.filterselect){ 
          return data[this.filterselect].toLowerCase() === filter;
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
    this.router.navigate(['users','employee-entry']);
  }
  employee_delete(data,index){
    console.log('data',data,'index',index);
    this.progressbar.show();
    this.service.employee_delete(data.id).subscribe(res=>{
      this.snakbar.open(res.message,'ok',{duration:2000});
      this.progressbar.hide();
      this.getEmployeeList();
    },err=>{
      this.progressbar.hide();
      this.snakbar.open(err.error.message ? err.error.message : JSON.stringify(err.error),'ok',{duration:6000});
      this.getEmployeeList();
    })

  }
  edit(data){
    console.log('update-client-id',data.id);
    this.router.navigate(['users','employee-entry',data.id])
  }

  getEmployeeList() {
    this.progressbar.show();
    this.api_service.getAllemployee().subscribe(res => {
      this.data = res;
      console.log('getEmployeeList::', this.data);
      this.data.map(item => {
        item.last_login = new Date(item.last_login).toLocaleString('en-BD')
        return item
      })
      
      this.table_material_data = new MatTableDataSource<any>(this.data);
      this.table_material_data.paginator = this.paginator;
      this.table_material_data.sort = this.sort;
      this.progressbar.hide();
      
    }, err => {
      this.snakbar.open(err.error.message ? err.error.message : JSON.stringify(err.error),'ok',{duration:6000});
    })
  }

  ngOnInit() {
        this.columnsDefinations = this.displayedColumns.map(item => item.field);
        this.columnsDefinations.unshift('avatar')
        this.columnsDefinations.push('status'); 
        this.columnsDefinations.push('details');
        this.getEmployeeList();
        this.search.valueChanges.subscribe(res=>{
          this.applyFilter(res);
        })
  }

}
