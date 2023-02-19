import { ElementRef, Renderer2 } from "@angular/core";
import { ValidateClass } from "../constants/enum-system";
import { isEmail } from "./values";

export function sharedAddClass(className:string,el:ElementRef,renderer:Renderer2){    
    const element = (<HTMLElement>el.nativeElement).querySelector(
        `.input-field`
        );
        if(className==ValidateClass.REQUIRED){
            
        }
                    
        if(element){
            if(!element.classList.contains(className)){
                
                renderer.addClass(element,className)
            }
        }
        
}
export function sharedRemoveClass(className:string,el:ElementRef,renderer:Renderer2){
    const element = (<HTMLElement>el.nativeElement).querySelector(
        `.input-field`
        );

        
        if(element){
            if(element.classList.contains(className)){
            
                renderer.removeClass(element,className)
                
            }
        }
        
}
export function sharedAddAttribute(attr:string,el:ElementRef,renderer:Renderer2){  
      
    const element = (<HTMLElement>el.nativeElement).querySelector(
        `.input-field`
        );
        if(element){
            element.setAttribute(attr,'true')

        }        
}
export function sharedRemoveAttribute(attr:string,el:ElementRef,renderer:Renderer2){
    const element = (<HTMLElement>el.nativeElement).querySelector(
        `.input-field`
        );
        if(element){
            element.setAttribute(attr,'false')

        }
}
export function sharedAddClassWithId(className:string,el:ElementRef,renderer:Renderer2,id:string){    
    const element = (<HTMLElement>el.nativeElement).querySelector(
        `#${id}`
        );    
        if(element){
            if(!element.classList.contains(className)){
                renderer.addClass(element,className)
            }
        }
        
}
export function sharedRemoveClassWithId(className:string,el:ElementRef,renderer:Renderer2,id:string){
    const element = (<HTMLElement>el.nativeElement).querySelector(
        `#${id}`
        );
        if(element){
            if(element.classList.contains(className)){
                renderer.removeClass(element,className)
            }
        }
        
}
export function sharedValidate(el:ElementRef,renderer:Renderer2){
    const oldElement = (<HTMLElement>el.nativeElement).querySelectorAll(
        'small'
        );
        oldElement.forEach(ol=>{        
            renderer.removeChild(ol,ol,true);
        })
    let text;
    const allList = (<HTMLElement>el.nativeElement).querySelectorAll(
        `.input-field`
      );
 
        
      allList.forEach((element,index) => {
        
        const id = element.getAttribute('id')
        const value = element.getAttribute(ValidateClass.HAS_VALUE)
        const valuecheck = element.getAttribute(ValidateClass.HAS_VALUE) == 'true'
        const selectItem = element.querySelector('.p-inputtext')
        // const selectItem = element.querySelector('.p-inputtext')
        const value2 = selectItem?.getAttribute('id')
        
        if(!element.classList.contains(ValidateClass.READONLY)){
          if(valuecheck||(value2!=undefined)){            
              if(element.classList.contains(ValidateClass.IS_EMAIL)){
                  if(isEmail(value)){
                      text = renderer.createText('ที่อยู่อีเมลไม่ถูกต้อง ');


                        // renderer.addClass(element,'input-invalid')
                        sharedAddClassWithId('input-invalid',el,renderer,id)
                        const validateSpan = renderer.createElement('small');
                        renderer.appendChild(validateSpan,text)
                        renderer.addClass(validateSpan,'invalid')                        
                        renderer.appendChild(element.parentNode,validateSpan)
                  }
  
              }

          }else{
                
              if(element.classList.contains(ValidateClass.REQUIRED)){
                  text = renderer.createText('โปรดระบุ');

                    sharedAddClassWithId('input-invalid',el,renderer,id)
                    // renderer.addClass(element,'input-invalid')

                    const validateSpan = renderer.createElement('small');
                    renderer.appendChild(validateSpan,text)
                    renderer.addClass(validateSpan,'invalid')                    
                    renderer.appendChild(element.parentNode,validateSpan)
              }  else{
                // sharedRemoveClass('input-invalid',el,renderer)

              }
          }
        }
      });
  }