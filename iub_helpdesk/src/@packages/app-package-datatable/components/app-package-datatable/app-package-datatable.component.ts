import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material';
import { FormGroup, FormBuilder } from '@angular/forms';



@Component({
    selector: 'app-package-datatable',
    templateUrl: './app-package-datatable.component.html',
    styleUrls: ['./app-package-datatable.component.scss']
})
export class AppPackageDatatableComponent implements OnInit {
    tableDataSource: MatTableDataSource<any>;
    @Input() dataTableConfig: any;
    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
    displayedColumns: any;
    columnsDisplayName: any;
    columnsFieldName: any;
    filterdData: any[];
    current_print_time = new Date();
    configData: {PageTitle:any,Subtitle:any}={
        PageTitle : " ",
        Subtitle : " ",
    };
    filterForm:FormGroup;
    constructor(
        private router: Router,
        private fb : FormBuilder
    ) { }

    filterOptions:any=[
        {viewValue : "Filter 1", value : "filter"},
        {viewValue : "Filter 2", value : "filter1"},
        {viewValue : "Filter 3", value : "filter2"},
    ]


    getFilteredDAta(){
        var filteredData = this.tableDataSource.filteredData;
        this.filterdData = filteredData;
    }
    SelectFilter(data:any){
        this.tableDataSource.filter = data.trim();
        this.getFilteredDAta();
        // console.log('value',data);
    }
    applyFilter(filterValue: any) {

        let filteredValue = this.filterForm.get('selectfeild').value + filterValue; 
        console.log('applyfilter',filteredValue);
        this.tableDataSource.filter = filteredValue.trim();
        this.getFilteredDAta();
    }
  

    getDetails(data) {
        console.log('Students Data',data);
    }

    initDataTable() {
        this.tableDataSource = new MatTableDataSource<any>(this.dataTableConfig.data);
        this.tableDataSource.paginator = this.paginator;
        this.columnsDisplayName = this.dataTableConfig.columns.map(item => item.displayName);
        this.columnsFieldName = this.dataTableConfig.columns.map(item => item.fieldName);
        this.configData = this.dataTableConfig.config;
        this.getFilteredDAta();
        this.tableDataSource.filterPredicate = (data: any, filter: any) => {
            return  data.hostel_id == filter || data.NAME == filter || data.gender == filter || data.leave_type == filter || (data.gender + data.leave_type) == filter ||( data.leave_type + data.gender) == filter || data.end_date == filter ;
        };

        console.log('pakeagetable data',this.dataTableConfig.data);
    }

    ngOnInit() {
        this.initDataTable();
        this.filterForm = this.fb.group({
            inputfeild : [''],
            selectfeild : [''],
        })
        
    }

}

