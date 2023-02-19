import { Component, ElementRef, EventEmitter, HostBinding, Input, OnInit, Output, Renderer2 } from '@angular/core';
import { UntypedFormControl, Validators } from '@angular/forms';
import { ValidateClass } from '../../constants/enum-system';
import { InputNumberConfigModel } from '../../models/configs';
import { BaseWidget } from '../base-widget/base-widget';

@Component({
  selector: 'm-input-number-4option',
  templateUrl: './m-input-number-4option.component.html',
  styleUrls: ['./m-input-number-4option.component.scss']
})
export class MInputNumber4OptionComponent extends BaseWidget implements OnInit {
  value1:number
  value2:number
  value3:number
  value4:number
  model1:boolean
  model2:boolean
  model3:boolean
  model4:boolean
  action1:string
  action2:string
  action3:string
  action4:string
  label:string =''
  model:number = undefined
  helpText:string=''
  invalidText:string = ''
  isRequired:boolean = false
  order:string =''
  inputForm =new UntypedFormControl(null,[Validators.required])
  config:InputNumberConfigModel = {maxDigit:0,minDigit:0}
  constructor( el: ElementRef, renderer:Renderer2){
    super(el,renderer)
  }
  @Input()
  set setLabel(label:string){
    this.label = label
  }

  @Input()
  set setOrder(order:string){
    this.order = order
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
  set setAction3(ac:string){
    this.action3 = ac
  }
  @Input()
  set setAction4(ac:string){
    this.action4 = ac
  }
  @Input()
  set setConfig(config:InputNumberConfigModel){
    this.config= config
  }
  @Input()
  set setV1(value:string){
    this.value1 = +value
  }
  @Input()
  set setV2(value:string){
    this.value2 = +value
  }
  @Input()
  set setV3(value:string){
    this.value3 = +value
  }
  @Input()
  set setV4(value:string){
    this.value4 = +value
  }


  @Input()
  set setModel(model:number){
    this.model = model
    switch(model){
      case this.value1:
        this.model1 = true
        break
        case this.value2:
          this.model2 = true
          break
          case this.value3:
            this.model3 = true
            break
            case this.value4:
              this.model4 = true
              break

    }
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
  onInputChange1(e:any){ 
    this.model = this.value1
    this.model2 = false
    this.model3 = false
    this.model4 = false
    if(e){
      this.setModelChange.emit(this.value1)
    }else{
      this.setModelChange.emit(null)
    }
  }
  onInputChange2(e:any){ 
    this.model1 = false   
    this.model3 = false   
    this.model4 = false   
    this.model = this.value2
    if(e){
      this.setModelChange.emit(this.value2)
    }else{
      this.setModelChange.emit(null)
    }
  }
  onInputChange3(e:any){ 
    this.model1 = false   
    this.model2 = false  
    this.model4 = false  

    this.model = this.value3
    if(e){
      this.setModelChange.emit(this.value3)
    }else{
      this.setModelChange.emit(null)
    }
  }
  onInputChange4(e:any){ 
    this.model1 = false   
    this.model2 = false   
    this.model3 = false   
    this.model = this.value4
    if(e){
      this.setModelChange.emit(this.value4)
    }else{
      this.setModelChange.emit(null)
    }
  }
}
