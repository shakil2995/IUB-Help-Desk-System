import {Component, OnInit, Input, Output,EventEmitter} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
@Component({
  selector: 'autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss'],
})
export class AutocompleteComponent implements OnInit {

  @Input() _formControl ? = new FormControl();
  @Input() fieldName: any;
  @Input() datasource:any[]=[];
  @Input() _required ?: boolean;
  @Input()  _key ?: string;
  @Input() _appearance ? : String = "standard";
  @Input()  setValue ? : Number
  @Output() output = new EventEmitter();

  filteredOptions: Observable<any[]>;

  optionSelect(event){
    this.output.emit(event.option.value);
    console.log('optionSelect',event.option.value);
  }

  displayFn(user: any): string {
    return user && user.display_name ? user.display_name : '';
  }

  private _filter(value: any): any[] {
    const filterValue = value.toLowerCase();
    return this.datasource.filter(option =>  {
      return option.display_name.toString().toLowerCase().indexOf(filterValue) !== -1;
    })
    // option.display_name.toLowerCase().indexOf(filterValue) !== -1);
  }
  
  ngOnInit() {
    
    if(this._key){
      let key = this._key;
      this.datasource.map(v=>v.display_name = v[key]);
      console.log('datasource',this.datasource);
      
    }
    if(this.setValue){
     let find = this.datasource.find(item=>item.id === this.setValue)
     console.log('find::',find); 
     this._formControl.setValue(find)
    }  
    this.filteredOptions = this._formControl.valueChanges.pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.display_name),
        map(display_name => display_name ? this._filter(display_name) : this.datasource.slice())
      ); 
  }

 
}
