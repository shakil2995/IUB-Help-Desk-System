import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator, MatSnackBar, MatTableDataSource } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { ApiService } from '@packages/services/api.service';
import { navigation } from 'app/navigation/navigation';
import { xlsx } from '@packages/services/xlsx';
import { formatDate } from '@angular/common';

export interface Task {
  name: string;
  completed: boolean;
  color: any;
  subtasks?: Task[];
}

@Component({
  selector: 'app-role-management',
  templateUrl: './role-management.component.html',
  styleUrls: ['./role-management.component.scss'],
  animations: fuseAnimations
})
export class RoleManagementComponent implements OnInit {
  PageTitle = "Role Management"
  role_form: FormGroup;
  Features_list = JSON.parse(JSON.stringify(navigation));
  // new added
  resourcedata : any =[];
  table_material_data:MatTableDataSource<any>;
  tabIndex:number;
  displayedColumns:any=[];
  GrandTotal:any =0;
  columnsDefinations:any= [{display : 'Role Name',field: 'role_name'},{display : 'Permitted Modules',field: 'permissions'}];
  @ViewChild(MatPaginator, {static: true} as any) paginator: MatPaginator;
  updateStatus: boolean;
  updatable_row_id: any;
  constructor(private fb: FormBuilder, private router: Router,
    private progressbar: FuseProgressBarService,
    private api_service: ApiService,
    private snakbar: MatSnackBar,
    private ActivateRoute: ActivatedRoute,
  ) { }
  //new added
  getAllMaterials(){
    this.progressbar.show();
    setTimeout(()=>{
      this.progressbar.hide();
      
    },1500)
    // this.progressbar.show();
    // this.api_service.getInventoryMaterials().subscribe(res=>{
    //   this.resourcedata = res;
    //   console.log('response',this.resourcedata);
    //   this.table_material_data = new MatTableDataSource<any>(this.resourcedata);
    //   this.table_material_data.paginator = this.paginator;
    //   this.progressbar.hide();
    //   this.GrandTotal = this.table_material_data.filteredData.reduce((acc,cur) => acc + cur.total_amount, 0);
    // },err=>{
    //   this.snakbar.open(err.message ? err.message : err.error,'ok',{duration:6000})
    //   this.progressbar.hide(); 
    // })
  }
  FormSubmit(){
    this.progressbar.show();
    let payload;
    payload = this.role_form.value;
    if(!this.updateStatus){
      payload.created_at = formatDate(new Date(),'yyyy-MM-dd hh:mm:ss','en','+006');
      // this.api_service.InventoryMaterialsEntry(payload).subscribe(res=>{
      //     this.snakbar.open(res.message,'ok',{duration:2000});
      //     this.getAllMaterials();
      //     this.progressbar.hide();
      //     this.tabIndex = 0;
      //     this.role_form.reset();
      // },err=>{
      //   this.snakbar.open(err.message ? err.message : err.error,'ok',{duration:6000});
      //   this.progressbar.hide();
      // })
    }else{
        payload.updated_at = formatDate(new Date(),'yyyy-MM-dd hh:mm:ss','en','+006');
        // this.api_service.InventoryMaterialsUpdate(payload,this.updatable_row_id).subscribe(res=>{
        //   this.snakbar.open(res.message,'ok',{duration:2000});
        //   this.getAllMaterials();
        //   this.progressbar.hide();
        //   this.tabIndex = 0;
        //   this.role_form.reset();
        // },err=>{
        //   this.snakbar.open(err.message ? err.message : err.error,'ok',{duration:6000});
        //   this.progressbar.hide();
        // })
        this.updateStatus = false;
        this.role_form.reset();
    }
    
  }
  excelExport(){
    xlsx.exportToExcel('excel_sheet',this.PageTitle);
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
    this.role_form.patchValue(row);
    this.updateStatus = true;
  }
  deleteData(row){
    // this.api_service.InventoryMaterialsDelete(row.id).subscribe(res=>{
    //   this.snakbar.open(res.message,'ok',{duration:2000});
    //   this.getAllMaterials();
    //   this.progressbar.hide();
    // },err=>{
    //   this.snakbar.open(err.message ? err.message : err.error,'ok',{duration:6000});
    //   this.progressbar.hide();
    // })
  }
  // updateAllComplete(item) {
  //   item.getAll = item.children != null && item.children.every(t => t.permission);
  //   console.group("update All complete")
  //   console.log('item',item);
  //   console.groupEnd(); 
  // }
  someComplete(item): boolean {
    if (item.children == null) {
      return false;
    }
    return item.children.filter(t => t.permission).length > 0 && !item.getAll;
  }

  checkSet(arr,chkOrUnChk) {
    arr.forEach(t => {
      t.permission = chkOrUnChk;
      if (t.children !== undefined && t.children.length != 0) {
        this.checkSet(t.children,chkOrUnChk);
      }
    });
  }
  setAll(item, chkOrUnChk: boolean) {
    if (item.children == null) {
      return;
    } else {

      
      
      this.checkSet(item.children,chkOrUnChk);

    }
    console.group("Selected Item");
    console.log("item:", this.Features_list);
    console.log("chkOrUnChk:", chkOrUnChk);
    console.groupEnd();
  }


  // checkbox section end

  onFormSubmit() {
    // this.progressbar.show();
    const payload = this.role_form.value;
    payload.permission = this.Features_list; 
    console.group('value');
    console.log('payload', payload);
    console.groupEnd();
    // if(!this.edit_role){
    //   this.api_service.create_role(payload).subscribe(res=>{
    //     console.log('payload',payload);
    //     console.log('response',res);
    //     this.snakbar.open(res.message,'ok',{duration : 2000});
    //     this.progressbar.hide();
    //     this.router.navigate(['administration','role_list']);
    //   },err=>{
    //     this.snakbar.open(err.error.message ? err.error.message : JSON.parse(err.error),'ok',{duration : 7000});
    //     this.progressbar.hide(); 
    //   })
    // }else{
    //   this.api_service.update_task(this.role_id,payload).subscribe(res=>{
    //     this.snakbar.open(res.message,'ok',{duration : 2000});
    //     this.progressbar.hide();
    //     this.router.navigate(['administration','role_list']);
    //   },err=>{
    //     this.snakbar.open(err.error.message ? err.error.message : JSON.parse(err.error),'ok',{duration : 7000});
    //     this.progressbar.hide(); 
    //   })
    // }

  }
  role_getById(id) {
    this.progressbar.show();
    this.api_service.role_getById(id).subscribe(res => {
      console.log('role_getById (' + id + ')', res);
      this.role_form.patchValue(res[0]);
      this.progressbar.hide();
    }, err => {
      this.snakbar.open(err.error.message ? err.error.message : JSON.stringify(err.error), 'ok', { duration: 5000 });
      this.progressbar.hide();
    })
  }

  rearrangePermissionData(arr) {
    arr.forEach(item => {
      delete item.type;
      if (item.icon)
        delete item.icon;
      if (item.url)
        delete item.url;
      item.permission = true;
      item.color = "warn";
      if (item.children) {
        item.color = "primary";
        this.rearrangePermissionData(item.children)
      }

    });

  }
  ngOnInit() {
    this.role_form = this.fb.group({
      role_name: ['', Validators.required],
    })
    this.rearrangePermissionData(this.Features_list);
    console.log('Features_list', this.Features_list);
    // console.log('new Array',...this.Features_list);
    this.displayedColumns  = this.columnsDefinations.map(item => item.field);
    this.displayedColumns.unshift('si')
    this.displayedColumns.push('action');
    
    this.search.valueChanges.subscribe(res=>{
      this.applyFilter(res);

    })
    this.getAllMaterials();

    
  }

}
