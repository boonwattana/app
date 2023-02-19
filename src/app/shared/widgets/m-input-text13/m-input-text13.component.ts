import { Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2 } from '@angular/core';
import { FormControl, FormControlName, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ValidateClass } from '../../constants/enum-system';
import { BaseWidget } from '../base-widget/base-widget';

@Component({
  selector: 'm-input-text13',
  templateUrl: './m-input-text13.component.html',
  styleUrls: ['./m-input-text13.component.scss']
})
export class MInputText13Component extends BaseWidget implements OnInit {
  label:string =''
  model:string =''
  helpText:string=''
  invalidText:string = ''
  inputType:string = 'text'
  isRequired:boolean = false
  placeholderText=''
  constructor( el: ElementRef, renderer:Renderer2){
    super(el,renderer)

  }
  @Output() onClick = new EventEmitter<boolean>();

  @Input()
  set setLabel(label:string){
    this.label = label
  }
  @Input()
  set setclasss(param){
     
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
  @Input()
  set setEmail(param:boolean){
    setTimeout(() => {
      if(param!=false){
        
        this.addClass(ValidateClass.IS_EMAIL)
      }else{
  
        this.removeClass(ValidateClass.IS_EMAIL)
      }
    }, 100);


  }
  @Input()
  set setPassword(param:boolean){
    if(param!=false){
      this.inputType = 'password'
    }else{
      this.inputType = 'text'
    }

  }
  @Input()
  set setReadonly(param:boolean){

    setTimeout(() => {
      if(param!=false){
        
        this.addAttribute(ValidateClass.READONLY)
        this.addClass(ValidateClass.READONLY)
      }else{
        // this.removeAttribute(ValidateClass.READONLY)
        // this.removeClass(ValidateClass.READONLY)
  
      }
    }, 100);

  }
  @Input()
  set setModel(model:string){
    this.model = model
    if(this.model){
      this.addAttribute(ValidateClass.HAS_VALUE)
    }else{
      this.removeAttribute(ValidateClass.HAS_VALUE)
    }   
  }
  get setModel(): string {
    return this.model;
  }
  @Input()
  set setHelpText(helpText:string){
    this.helpText = helpText
  }
  @Input()
  set setplaceholderText(Text:string){
    this.placeholderText = Text
  }
  get setplaceholderText(): string {
    return   this.placeholderText ;
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
  onInputChange(e:any){
    if(e){
      this.addAttribute(ValidateClass.HAS_VALUE)
    }else{
      this.removeAttribute(ValidateClass.HAS_VALUE)
    }      
    this.setModelChange.emit(e)
  }
}
