import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppInjector } from 'src/app/app-injector';
import { ButtonConfig } from '../../constants/fomats-config';
import { InputNumberConfigModel } from '../../models/configs';
import { DisplayService } from '../../services/display.service';
import { BaseDropdownService } from './base.dropdown.service';

@Component({
  selector: 'app-base',
  template: ` <p>base works!</p> `,
})
export class BaseComponent {
  public buttonConfig = ButtonConfig.SAVE;
  public dropdownService:BaseDropdownService
  public INPUT_DECIMAL_2:InputNumberConfigModel = {minDigit:2,maxDigit:2}
  public INPUT_DECIMAL_4:InputNumberConfigModel = {minDigit:4,maxDigit:4}
  public INPUT_INTEGER:InputNumberConfigModel = {minDigit:0,maxDigit:0}
  public displayService:DisplayService
  public router:Router
  constructor(private _router: Router ,private route:ActivatedRoute  ) {
    this.dropdownService = AppInjector.get(BaseDropdownService);
    this.displayService = AppInjector.get(DisplayService);
    this.router = _router;
   }
  toItem(route:string,id:number,isView:boolean){    
    if(isView){
      this.displayService.setViewMode()
    }else{
      this.displayService.setEditMode()
    }
      this.router.navigate([`${route}/${id}`]);
  }
  toList(route:string){
    this.router.navigate([`${route}`]);

  }
  getParam():number {
    const modelId =  this.route.snapshot.params as {id}
    return modelId.id;
  }
  onBack(){
    this.displayService.setEditMode()
    const url = this.router.url
    const pathArr = url.split('/');
    pathArr.pop();
    pathArr.reverse().pop()
    pathArr.reverse()
    this.router.navigate([`${pathArr}`]);
  }
}
