import { Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2 } from '@angular/core';
import { ValidateClass } from '../../constants/enum-system';
import { BaseWidget } from '../base-widget/base-widget';

@Component({
  selector: 'm-switch',
  templateUrl: './m-switch.component.html',
  styleUrls: ['./m-switch.component.scss']
})
export class MSwitchComponent  extends BaseWidget implements OnInit  {
  checked: boolean = false;

  label:string =''
  model:boolean;
  helpText:string=''
  invalidText:string = ''
  isRequired:boolean = false
  disable:boolean = false
  constructor( el: ElementRef, renderer:Renderer2){
    super(el,renderer)

  }
  @Input()
  set setRequired(param:boolean){
    if(param != false){      
      this.addClass(ValidateClass.REQUIRED)
    }else{
      this.removeClass(ValidateClass.REQUIRED)
    }

  }
  @Input()
  set setReadonly(param:boolean){
    if(param!=false){
      this.disable = true
      this.addAttribute(ValidateClass.READONLY)
      this.addClass(ValidateClass.READONLY)
    }else{
      this.removeAttribute(ValidateClass.READONLY)
      this.removeClass(ValidateClass.READONLY)
      this.disable = false
    }
  }
  @Input()
  set setLabel(label:string){
    this.label = label
  }
  @Input()
  set setModel(model:boolean){
    this.model = model
  }

  get setModel(): boolean {
    return this.model;
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
  @Output() setModelChange = new EventEmitter<boolean>();

  ngOnInit(): void {
  }
  onInputChange(e:any){ 
    this.model = e   
    
    this.setModelChange.emit(this.setModel)
  }
  getValue():string{
    return this.model?'ใช่่':'ไม่'
  }
}
