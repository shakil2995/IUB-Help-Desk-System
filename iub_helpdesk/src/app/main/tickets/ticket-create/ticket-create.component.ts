import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MatPaginator, MatSnackBar, MatTableDataSource, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { ApiService } from '@packages/services/api.service';
import { DataSharingService } from '@packages/services/data-sharing.service';

@Component({
  selector: 'app-ticket-create',
  templateUrl: './ticket-create.component.html',
  styleUrls: ['./ticket-create.component.scss'],
  animations : fuseAnimations
})
export class TicketCreateComponent implements OnInit {

  helprequestForm : FormGroup;
  request_typeList = [
    {veiw : 'IT-SERVICE', value : 'it_service_related'},
    {veiw : 'Admission related', value : 'admission_related'},
    {veiw : 'Examination related', value : 'examination_related'},
    {veiw : 'Accounts related', value : 'accounts_related'},
  ]
  priority_List = [
    {veiw : 'Low', value : 'low'},
    {veiw : 'Medium', value : 'medium'},
    {veiw : 'High', value : 'high'},
  ]
  update_flag: boolean;
  constructor(public dialo_ref: MatDialogRef<TicketCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public progressbar : FuseProgressBarService,
    public api_service : ApiService,
    public dialog : MatDialog,
    public snakbar:MatSnackBar,
    public datashare: DataSharingService,
    public fb:FormBuilder) {
      
     }
     
  close(){
    this.dialo_ref.close('');
    
  }

  resetForm(){
      this.helprequestForm.reset()
  }
  submit(){
    this.api_service.ticket_create(this.helprequestForm.value).subscribe(res=>{
      console.log('result',res);
      this.snakbar.open(res.message,'ok',{duration:2000});
      this.dialo_ref.close('reload');
    },err=>{
      this.snakbar.open(err.error.msg ? err.error.msg  : err.error,'ok',{duration:6000})
    })
  }
  update() {
    this.api_service.ticket_update(this.helprequestForm.value,this.data.id).subscribe(res=>{
      console.log('result',res);
      this.snakbar.open(res.msg,'ok',{duration:2000});
      this.dialo_ref.close('reload');
    },err=>{
      this.snakbar.open(err.error.msg ? err.error.msg  : err.error,'ok',{duration:6000})
    })
  }
  
  ngOnInit() {
    
    this.helprequestForm = this.fb.group({
      request_type : ['',Validators.required],
      title : ['',Validators.required],
      description : ['',Validators.required],
      priority : ['',Validators.required]
    });
    if (this.data.id) {
      this.helprequestForm.patchValue(this.data)
      console.log('update data', this.data);
      this.update_flag =  true
    } else {
      this.update_flag =  false
    }

  }
}
