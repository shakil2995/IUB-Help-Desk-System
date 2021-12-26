import { Component, OnInit, Input } from '@angular/core';
import { ColumnMode } from '@swimlane/ngx-datatable';


@Component({
    selector: 'app-package-table',
    templateUrl: './app-package-table.component.html',
    styleUrls: ['./app-package-table.component.scss'],
    
})
export class AppPackageTableComponent implements OnInit {
    @Input() rows: any;
    @Input() columns: any;
    @Input() dataTableConfig: any;
    ColumnMode = ColumnMode;
    
    constructor() { }

    ngOnInit() {
    }

}
