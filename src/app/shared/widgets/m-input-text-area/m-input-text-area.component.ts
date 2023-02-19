import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormControl, Validators } from '@angular/forms';

@Component({
  selector: 'm-input-text-area',
  templateUrl: './m-input-text-area.component.html',
  styleUrls: ['./m-input-text-area.component.scss']
})
export class MInputTextAreaComponent implements OnInit {
  label:string =''
  model:string =''
  helpText:string=''
  invalidText:string = ''
  id:string=''
  inputForm =new UntypedFormControl(this.model,[Validators.required ])
  isRequired:boolean = false
  constructor() { }
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
  ngOnInit(): void {
  }
  @Output() setModelChange = new EventEmitter<string>();

}
