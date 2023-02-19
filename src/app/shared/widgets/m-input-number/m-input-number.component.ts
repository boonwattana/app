import { Component, ElementRef, EventEmitter, HostBinding, Input, OnInit, Output, Renderer2 } from '@angular/core';
import { UntypedFormControl, Validators } from '@angular/forms';
import { ValidateClass } from '../../constants/enum-system';
import { InputNumberConfigModel } from '../../models/configs';
import { BaseWidget } from '../base-widget/base-widget';

@Component({
  selector: 'm-input-number',
  templateUrl: './m-input-number.component.html',
  styleUrls: ['./m-input-number.component.scss']
})
export class MInputNumberComponent extends BaseWidget implements OnInit {

  label:string =''
  model:number = undefined
  helpText:string=''
  invalidText:string = ''
  isRequired:boolean = false
  placeholderText=''
  inputForm =new UntypedFormControl(null,[Validators.required])
  config:InputNumberConfigModel = {maxDigit:0,minDigit:0}
  constructor( el: ElementRef, renderer:Renderer2){
    super(el,renderer)
  }
  @Input()
  set setConfig(config:InputNumberConfigModel){
    this.config= config
  }
  @Input()
  set setLabel(label:string){
    this.label = label
  }
  @Input()
  set setModel(model:number){
    
    this.model = model
    if(this.model){
      this.addAttribute(ValidateClass.HAS_VALUE)
    }else{
      this.removeAttribute(ValidateClass.HAS_VALUE)
    }   
  }
  get setModel(): number {
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
  set setRequired(param:boolean){
    setTimeout(() => {
      if(param != false){    
        this.isRequired = true   
        this.addClass(ValidateClass.REQUIRED)
      }else{
        this.removeClass(ValidateClass.REQUIRED)
      }
    }, 100);

  }
  @Output() setModelChange = new EventEmitter<any>();

  ngOnInit(): void {
  }
  onInputChange(e:any){
    this.setModel = e    
    this.setModelChange.emit(this.setModel )
  }
  getValue(){
    return this.model?.toLocaleString('th-TH',{minimumFractionDigits:this.config.maxDigit,maximumFractionDigits:this.config.maxDigit})
  }
  @Input()
  set setplaceholderText(Text:string){
    this.placeholderText = Text
  }
  get setplaceholderText(): string {
    return   this.placeholderText ;
  }
}
