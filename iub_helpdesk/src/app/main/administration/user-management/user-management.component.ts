import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator, MatSnackBar, MatTableDataSource } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { animateStagger, fadeInOut, fuseAnimations } from '@fuse/animations';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { ApiService } from '@packages/services/api.service';
import { navigation } from 'app/navigation/navigation';
import { xlsx } from '@packages/services/xlsx';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss'],
  animations : fuseAnimations
})
export class UserManagementComponent implements OnInit {

  user_form: FormGroup;
  Features_list = JSON.parse(JSON.stringify(navigation));
  // new added
  table_material_data:MatTableDataSource<any>;
  tabIndex:number;
  displayedColumns:any=[];
  GrandTotal:any =0;
  progressbars:boolean = false;
  columnsDefinations:any= [
    {display : 'Employee Id',field: 'ref_no'},
    {display : 'First Name',field: 'f_name'},
    {display : 'Last Name',field: 'l_name'},
    {display : 'Designation',field: 'designation'},
    {display : 'Permitted Group',field: 'role_name'},
  ];
  @ViewChild(MatPaginator, {static: true} as any) paginator: MatPaginator;
  updateStatus: boolean;
  updatable_row_id: any;
  constructor(private fb: FormBuilder, private router: Router,
    private progressbar: FuseProgressBarService,
    private api_service: ApiService,
    private snakbar: MatSnackBar,
  ) { }
  

//fake database
// dummybranch = [
//     {branchName :  'PRP',branch_id : 1},
//     {branchName :  'PBD',branch_id : 2},
//     {branchName :  'PBC',branch_id : 3},
//     {branchName :  'MKH',branch_id : 4},
//     {branchName :  'KRL',branch_id : 5},
//     {branchName :  'KRL',branch_id : 6}
// ]
Roles = [
    {RoleName :  'Super Admin',role_id : 1},
    {RoleName :  'Admin',role_id : 2},
    {RoleName :  'Accounts',role_id : 3},
    {RoleName :  'Accounts clark',role_id : 4},
    {RoleName :  'Accounts VAT',role_id : 5},
    

]
resourcedata : any[] =[{
  id : 1,
  branch_id: 2,
  created_at: "2021-07-01 11:20:43",
  designation: "FAVP",
  email: "niloy@green-delta.com",
  f_name: "Niloy Shah ",
  l_name: "Sagore",
  permission: [
    {branch: 3, role_id: 1},
    {branch: 2, role_id: 5},
    {branch: 2, role_id: 4}
  ],
  employee_id: "1830"
}];

  //new added
  getInitialData(){
    this.progressbar.show();
    console.log('list',this.resourcedata);
    setTimeout(()=>{
      this.progressbar.hide();
        this.table_material_data = new MatTableDataSource<any>(this.resourcedata);
      this.table_material_data.paginator = this.paginator;
    },1000)
  }
  onFormSubmit(){
    
    if(this.user_form.invalid || this.PermissionControl.invalid){
      this.snakbar.open('Please input all required field','ok',{duration:2000, panelClass : 'custom_snackbar_bottom'});
      return
    }
    this.progressbar.show();
    let payload;
    payload = this.user_form.value;
    if(!this.updateStatus){
      payload.created_at = formatDate(new Date(),'yyyy-MM-dd hh:mm:ss','en','+006');
      console.log('payload',payload);
      
      this.resourcedata.push(payload);
      setTimeout(() => {
        this.progressbar.hide();
        this.tabIndex = 0;
        this.formReset();
        this.getInitialData();
      }, 1000);
      
    }else{
        payload.updated_at = formatDate(new Date(),'yyyy-MM-dd hh:mm:ss','en','+006');
        console.log('updated data payload',payload);
        
        let row_index = this.resourcedata.findIndex(v=>{
          return v.id == this.updatable_row_id
        });
        console.log('select_row',row_index);
        this.resourcedata.splice(row_index,1,payload);
        
        this.tabIndex = 0;
        this.getInitialData();

        this.updateStatus = false;
        this.formReset();
        setTimeout(() => {
          this.progressbar.hide();
        }, 1000);
    }
    
  }
  excelExport(){
    xlsx.exportToExcel('excel_sheet','users_list');
  }

  formReset(){
    this.user_form.reset();
    this.PermissionControl.clear();
    this.PermissionControl.push(this.permission())
  }
  //filtering 
  filter=[
    {view : 'All',val : ''},
    {view : 'Description',val : 'material_description'},
    {view : 'Material Name',val : 'material_name'},
    {view : 'Accounts Head',val : 'accounts_head_name'},
    {view : 'Per Rate',val : 'rate'},
    
  ]
  filterselect:any='';
  search:FormControl = new FormControl();

  applyFilter(event:any) {  
  this.table_material_data.filterPredicate = (data,filter)=>{
    if(this.filterselect == 'rate'){
      return data.rate == filter;
    }
    if(this.filterselect){
      return data[this.filterselect].toLowerCase().indexOf(filter) !== -1;
    }else{
      return data.material_description.toLowerCase().indexOf(filter) !== -1 || data.material_name.toLowerCase().indexOf(filter) !== -1 || data.accounts_head_name.toLowerCase().indexOf(filter) !== -1 || data.rate == filter ;
    }
  }
  this.table_material_data.filter = event.toString().trim().toLowerCase();
  this.GrandTotal = this.table_material_data.filteredData.reduce((acc,cur) => acc + cur.total_amount, 0);
  }

  filterCriteriaChange(){
  this.search.setValue('')
  }
  tabchange(index){
    //something do on tab change every time

  }
  updateData(row){
    this.tabIndex=1;
    this.updatable_row_id = row.id;
    this.user_form.patchValue(row);
    console.log('updated data',row);
    this.PermissionControl.removeAt(0);
    if(row.permission.length){
      row.permission.forEach(item => {
           const some  = this.fb.group({
            // branch: [item.branch,Validators.required],
            role_id : [item.role_id,Validators.required],
          });
          this.PermissionControl.push(some)
      });
    }
    this.updateStatus = true;
  }
  deleteData(row,index){
    this.resourcedata.splice(index,1);
  }


  
  //form array  related
  permission() : FormGroup {
    return this.fb.group({
      branch: ['',Validators.required],
      role_id : ['',Validators.required],
    });
  }
  get PermissionControl () {
    return this.user_form.get('permission') as FormArray  ;
  }
  addpermission() {
    this.PermissionControl.push(this.permission())
  }
  deletepermission(index) {
    this.PermissionControl.removeAt(index);
  }
  get datalenth(){
    return this.resourcedata.length +1
  }
  ngOnInit() {
    this.user_form = this.fb.group({
      id :[this.datalenth],
      f_name: ['', Validators.required],
      l_name: [''],
      employee_id: ['',Validators.required],
      branch_id : ['',Validators.required],
      designation : ['',Validators.required],
      email: ['',Validators.required],
      permission: this.fb.array([this.permission()]),
    })
    // console.log('new Array',...this.Features_list);
    this.displayedColumns  = this.columnsDefinations.map(item => item.field);
    this.displayedColumns.unshift('si');
    this.displayedColumns.push('status');
    this.displayedColumns.push('action');
    
    this.search.valueChanges.subscribe(res=>{
      this.applyFilter(res);

    })
    this.getInitialData();

    
  }

}
