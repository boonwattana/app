import { Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2 } from '@angular/core';
import { ValidateClass } from '../../constants/enum-system';
import { BaseWidget } from '../base-widget/base-widget';

@Component({
  selector: 'm-switch-number',
  templateUrl: './m-switch-number.component.html',
  styleUrls: ['./m-switch-number.component.scss']
})
export class MSwitchNumberComponent  extends BaseWidget implements OnInit  {
  checked: boolean = false;

  label:string =''
  model:number;
  value:number;
  bindingModel:boolean = false;
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
  set setModel(model:number|null){    
    this.model = model
    this.bindingModel =( this.value == this.model)
  }
  @Input()
  set setValue(value:number){
    this.value = value
    this.bindingModel = (this.value == this.model)
  }
  get setModel(): number {
    return this.value;
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
  @Output() setModelChange = new EventEmitter<number>();

  ngOnInit(): void {
  }
  onInputChange(e:any){ 
    this.bindingModel = e   
    
     this.setModelChange.emit(this.value)
  }
  getValue():string{
    return this.model?'ใช่่':'ไม่'
  }
}
