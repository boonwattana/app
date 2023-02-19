import { Component, ElementRef, HostListener, Inject, Injector, Renderer2 } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { AppInjector } from "src/app/app-injector";
import { ValidateClass } from "../../constants/enum-system";
import { sharedAddAttribute, sharedAddClass, sharedRemoveAttribute, sharedRemoveClass, sharedValidate } from "../../functions/validate";
import { isEmail } from "../../functions/values";
import { DisplayService } from "../../services/display.service";
@Component({
    template: ''
  })
export class BaseWidget{
    id:string=''
    view:boolean
    constructor(private el: ElementRef,private renderer:Renderer2){
      AppInjector.get(DisplayService).isView.subscribe(value=>{
        this.view = value
      });
    }
    @HostListener('click') ngOnClick() {
      
        this.validateField()
      }
      @HostListener('keyup') ngOnKeyup() {
        this.validateField()
      }
    addClass(className:string){
        sharedAddClass(className,this.el,this.renderer)
    }
    removeClass(className:string){
        sharedRemoveClass(className,this.el,this.renderer)
    }
    addAttribute(attr:string){
        sharedAddAttribute(attr,this.el,this.renderer)
    }
    removeAttribute(attr:string){
        sharedRemoveAttribute(attr,this.el,this.renderer)
    }
    validateField(){      
      
        sharedRemoveClass('input-invalid',this.el,this.renderer)
      
       sharedValidate(this.el,this.renderer)
      }

}