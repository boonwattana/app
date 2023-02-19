import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormControl, Validators } from '@angular/forms';

@Component({
  selector: 'm-map',
  templateUrl: './m-map.component.html',
  styleUrls: ['./m-map.component.scss']
})
export class MMapComponent implements OnInit {
  options: any;
  label:string =''
  model:string =''
  helpText:string=''
  invalidText:string = ''
  id:string=''
  overlays: any[] =[];
  inputForm =new UntypedFormControl(null,[Validators.required,Validators.email])
  isRequired:boolean = false
  constructor() { }

  ngOnInit(): void {
    this.options = {
      center: {lat: 36.890257, lng: 30.707417},
      zoom: 12
  };
  }

  @Input()
  set setLabel(label:string){
    this.label = label
  }
  @Input()
  set setModel(model:string){
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

}
