import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormControl, Validators } from '@angular/forms';

@Component({
  selector: 'm-multi-select',
  templateUrl: './m-multi-select.component.html',
  styleUrls: ['./m-multi-select.component.scss']
})
export class MMultiSelectComponent implements OnInit {
  cities: City[];
  label:string =''
  model:boolean;
  helpText:string=''
  invalidText:string = ''
  id:string=''
  inputForm =new UntypedFormControl(null,[Validators.required])
  isRequired:boolean = false
  selectedCities: City[] = [];
  constructor() {
    this.cities = [
      {name: 'New York', code: 'NY'},
      {name: 'Rome', code: 'RM'},
      {name: 'London', code: 'LDN'},
      {name: 'Istanbul', code: 'IST'},
      {name: 'Paris', code: 'PRS'}
  ];
   }


   @Input()
   set setLabel(label:string){
     this.label = label
   }
   @Input()
   set setModel(model:boolean){
     this.model = model
   }
   @Input()
   set setHelpText(helpText:string){
     this.helpText = helpText
   }
   @Input()
   set setInvalidText(invalidText:string){
     this.invalidText = invalidText
   }
   @Input()
   set setId(id:string){
     this.id=id
   }
   ngOnInit(): void {
   }
}
interface City {
  name: string,
  code: string
}
