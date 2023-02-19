import { Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2 } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { SelectItem } from 'primeng/api';
import { ValidateClass } from '../../constants/enum-system';
import { BaseWidget } from '../base-widget/base-widget';

@Component({
  selector: 'm-dropdown',
  templateUrl: './m-dropdown.component.html',
  styleUrls: ['./m-dropdown.component.scss']
})
export class MDropdownComponent extends BaseWidget implements OnInit{
  Label:boolean=true
  cities: any[];
  label:string =''
  model:number;
  helpText:string=''
  Class:string=''
  invalidText:string = ''
  selectOption:SelectItem[] = []
  selectItem:SelectItem;
  placeholder:string =''
  viewValue:string = null
  selectedItem:SelectItem;
  isRequired:boolean = false
  readonly:boolean = false
  showClear:boolean = true
  baseZIndex:number = 99
  constructor( el: ElementRef, renderer:Renderer2){
    super(el,renderer)
  }

  ngOnInit(): void {
  }
  @Input()
  set setLabelType(param:boolean){
    this.Label = param
}
@Input()
set setShowClear(param:boolean){
  this.showClear = param
}
  @Input()
    set setPlaceholder(param:string){
      this.placeholder = param
  }
  @Input()
    set setClass(param:string){
      if(param){
        this.Class = param
      }else{
        this.Class = 'input-field'
      }
      
      // this.placeholder = param
  }
  @Input()
  set setSelectOption(option:SelectItem[]){
    // this.setModel = this.model+1
    // this.setModel = this.model -1
    
    this.selectOption = option;
    this.selectItem = this.selectOption.find(fn=>fn.value == this.model)
  }
  @Input()
  set setReadonly(param:boolean){
    
    setTimeout(() => {
      if(param!=false){
        this.readonly = true
        this.addAttribute(ValidateClass.READONLY)
        this.addClass(ValidateClass.READONLY)
      }else{
        this.readonly = false
        this.removeAttribute(ValidateClass.READONLY)
        this.removeClass(ValidateClass.READONLY)
  
      }
    }, 100);


  }
  @Input()
  set setViewValue(param:string){
    this.viewValue = param

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
  set setLabel(label:string){
    this.label = label
  }
  @Input()
  set setModel(model:number){    
    this.model = model
    this.selectItem = this.selectOption.find(fn=>fn.value == this.model)
    if(this.model){
      this.addAttribute(ValidateClass.HAS_VALUE)
    }else{
      this.removeAttribute(ValidateClass.HAS_VALUE)
    }   
  }
  get setModel(): number {
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
  @Output() setModelChange = new EventEmitter<any>();

  onChange(e:SelectItem){
    

    this.model = e?.value?.value
    if(this.model){
      this.addAttribute(ValidateClass.HAS_VALUE)
    }else{
      this.removeAttribute(ValidateClass.HAS_VALUE)
    }    
    this.setModelChange.emit(this.model);    
    
  }
  // onInputChange(e:any){
  //   if(e){
  //     this.addAttribute(ValidateClass.HAS_VALUE)
  //   }else{
  //     this.removeAttribute(ValidateClass.HAS_VALUE)
  //   }      
  //   this.setModelChange.emit(e)
  // }
  onClear(){
    this.model = null
    this.setModelChange.emit(this.model);
  }
  getValue(){
   return  this.viewValue??this.selectOption.find(fn=> fn.value == this.model)?.label 
  }
}
