import { Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2 } from '@angular/core';
import { UntypedFormControl, Validators } from '@angular/forms';
import { BaseWidget } from '../base-widget/base-widget';

@Component({
  selector: 'm-time',
  templateUrl: './m-time.component.html',
  styleUrls: ['./m-time.component.scss']
})
export class MTimeComponent extends BaseWidget implements OnInit {
  bindingModel:Date = new Date()
  label:string =''
  model:string;
  helpText:string=''
  invalidText:string = ''
  inputForm =new UntypedFormControl(null,[Validators.required])
  isRequired:boolean = false
  constructor( el: ElementRef, renderer:Renderer2){
    super(el,renderer)
  }
  @Input()
  set setLabel(label:string){
    this.label = label
  }
  @Input()
  set setModel(model:string){
    if(model){
      let dt = new Date("1990-01-01 "+model);
      dt = new Date(new Date().toISOString().slice(0,10) + " " + model);
      this.bindingModel = dt
      this.model = model
    }else{
      let dt = new Date();
      this.bindingModel = dt
      this.model = `${this.bindingModel.getHours()}:${this.bindingModel.getMinutes()}`
    }

  }
  get setModel():string{
   return this.model 
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
  @Output() setModelChange = new EventEmitter<string>();
  ngOnInit(): void {
  }
  onInputChange(e:Date){  
    this.model = `${e.getHours()}:${e.getMinutes()}`
    

    this.setModelChange.emit(this.model)
  }
}
