import { Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2 } from '@angular/core';
import { ValidateClass } from '../../constants/enum-system';
import { BaseWidget } from '../base-widget/base-widget';

@Component({
  selector: 'm-switch-from',
  templateUrl: './m-switch-from.component.html',
  styleUrls: ['./m-switch-from.component.scss']
})
export class MSwitchFromComponent  extends BaseWidget implements OnInit  {
  checked: boolean = false;

  label:string =''
  description:string =''
  model:boolean;
  model1:boolean = false
  model2:boolean= false
  helpText:string=''
  invalidText:string = ''
  isRequired:boolean = false
  action1:string
  action2:string

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
      this.addAttribute(ValidateClass.READONLY)
      this.addClass(ValidateClass.READONLY)
    }else{
      this.removeAttribute(ValidateClass.READONLY)
      this.removeClass(ValidateClass.READONLY)

    }
  }
  @Input()
  set setLabel(label:string){
    this.label = label
  }

  @Input()
  set setDescription(description:string){
    this.description = description
  }  
  @Input()
  set setAction1(ac:string){
    this.action1 = ac
  }
  @Input()
  set setAction2(ac:string){
    this.action2 = ac
  }
  @Input()
  set setModel(model:boolean){
    
    if(model == true){
      this.model1 = true
      this.model2 = false
      this.model = true
    }
    
    if(model == undefined){
      this.model1 = false
      this.model2 = false
      this.model = null
    }
    if(model == false){
      this.model1 = false
      this.model2 = true
      this.model = false
    } 
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
  onInputChange1(e:any){ 

    this.model2 = !this.model2  
    this.setModelChange.emit(true)
  }
  onInputChange2(e:any){ 
     this.model1 = !this.model1   
    this.setModelChange.emit(false)
  }
  getValue():string{
    return this.model?'ใช่่':'ไม่'
  }
}
