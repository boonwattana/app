import { Component, ElementRef, HostListener, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppInjector } from 'src/app/app-injector';
import { ValidateClass } from '../../constants/enum-system';
import { sharedAddClassWithId, sharedRemoveClass, sharedValidate } from '../../functions/validate';
import { isEmail } from '../../functions/values';
import { DisplayService } from '../../services/display.service';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-base-item',
  template: ` <p>base item works!</p> `,
})
export class BaseItemComponent<T> extends BaseComponent {
  isUpdateMode: boolean
  id: number;
  view: boolean;
  model: T = {} as T;
  constructor(public el: ElementRef, public renderer: Renderer2, router: Router, route: ActivatedRoute) {
    super(router, route);
    this.checkPageMode()
    AppInjector.get(DisplayService).isView.subscribe(value => {
      this.view = value
    });
  }
  checkPageMode() {
    this.id =  this.getParam()
    if(this.id!=0){
      this.isUpdateMode = true
    }else{
      this.isUpdateMode = false

    }
    
  }

  validateField() {
    sharedValidate(this.el, this.renderer)
    const allElement = (<HTMLElement>this.el.nativeElement).querySelectorAll(
      `.${ValidateClass.SMALL_INVALID}`
    );

    return allElement.length == 0
  }

}
