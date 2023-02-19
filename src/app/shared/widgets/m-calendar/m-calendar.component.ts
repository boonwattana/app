import { Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2 } from '@angular/core';
import { UntypedFormControl, Validators } from '@angular/forms';
import { ValidateClass } from '../../constants/enum-system';
import { BaseWidget } from '../base-widget/base-widget';
import * as moment from 'moment-timezone'
@Component({
  selector: 'm-calendar',
  templateUrl: './m-calendar.component.html',
  styleUrls: ['./m-calendar.component.scss']
})
export class MCalendarComponent  extends BaseWidget implements OnInit {
  label:string =''
  model:Date = new Date()
  helpText:string=''
  invalidText:string = ''
  placeholder:string = ''
  isRequired:boolean = false
  classBinding:string ='input-field'
  minDate:Date = null
  maxDate:Date = null
  val:string
  inputForm =new UntypedFormControl(null,[Validators.required])
  constructor( el: ElementRef, renderer:Renderer2){
    super(el,renderer)
  }
  @Input()
  set setLabel(label:string){

    this.label = label
  }
  @Input()
  set setMinDate(arg:Date){

    this.minDate = arg
  }
  @Input()
  set setMaxDate(arg:Date){

    this.maxDate = arg
  }
  @Input()
  set setModel(model:Date){
    this.model=model
    this.val = this.getValue();
    
    // if(model){
    //   this.model = model
    //   this.val = this.getValue();

    // }else{
    //   this.model = new Date()
    //   this.setModelChange.emit(this.model)
    // }
    if(this.model){
      this.addAttribute(ValidateClass.HAS_VALUE)
    }else{
      this.removeAttribute(ValidateClass.HAS_VALUE)
    }   
  }
  get setModel(): Date {
    return this.model;
  }
  @Input()
  set setReadonly(param:boolean){
    setTimeout(() => {
      if(param!=false){
        this.addAttribute(ValidateClass.DISABLE)
        this.addClass(ValidateClass.DISABLE)
      }else{
        this.removeAttribute(ValidateClass.DISABLE)
        this.removeClass(ValidateClass.DISABLE)
  
      }
    }, 100);

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

  ngOnInit(): void {
  }
  
  onInputChange(){  
    // this.model = e  
    
    if(this.val&&this.val?.indexOf('_')==-1){
      const dateArr = this.val.split('/')
      this.model = new Date(`${+dateArr[2]-543}-${dateArr[1]}-${dateArr[0]}T00:00:00.000Z`)
      this.setModelChange.emit(this.model)

    }
    
    // this.placeholder = this.getValue()
    if(this.model){
      this.addAttribute(ValidateClass.HAS_VALUE)
    }else{
      this.removeAttribute(ValidateClass.HAS_VALUE)
    }    
  }
  getValue(){    
    if(this.model){
      let june = new Date(this.model)
      // const month  =june.tz('Asia/Tokyo').toLocaleString('dd/mm/yyy')
      const month  =june.getMonth()
      const year  =june.getFullYear()
      const day  =june.getDate()
      if(year){        
        return `${day.toString().length==1?`0${day}`:(day)}/${(+month+1).toString().length==1?`0${+month+1}`:(+month+1)}/${+year+543}`

      }else{
        return ''
      }
      // const dateArr = daysTimeArr[0].split('-')

    }

    return `f`
   }
}
