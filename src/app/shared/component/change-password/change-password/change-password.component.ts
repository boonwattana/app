import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginStat } from 'src/app/shared/constants/enum-system';
import { sharedAddClassWithId } from 'src/app/shared/functions/validate';
import { BaseItemInterface } from 'src/app/shared/interface/base-item-interface';
import { FormValidationModel } from 'src/app/shared/models/miscellaneous';
import { UserDataService } from 'src/app/shared/services/user-data.service';
import { BaseItemComponent } from '../../base-item/base-item.component';
import { ChangePasswordModel } from '../change-password-model';
import { ChangePasswordService } from '../change-password.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent extends BaseItemComponent<ChangePasswordModel>  implements BaseItemInterface {
  isRegister:boolean = false
  constructor(
    el:ElementRef,
    renderer:Renderer2,
    router: Router , 
    route:ActivatedRoute,
    private readonly changePasswordService:ChangePasswordService,
    private readonly userDataService:UserDataService
    ) { 
      super(el,renderer,router,route)
    }
  ngOnDestroy(): void {
  }
  ngAfterViewInit(): void {
  }
  onEnumLoader(): void {
  }
  getById(): void {
  }
  onAsyncRunner(model?: any): void {
  }
  setInitialCreatingData(): void {
  }
 onBackCustom(): void {
  if(this.userDataService.isStudent()){
    this.toItem('student',+this.userDataService.getInfoId(),true)


  }
  if(this.userDataService.isTeacher()){
    this.toItem('teacher',+this.userDataService.getInfoId(),true)

  }
  if(this.userDataService.isAdmin()){
    this.router.navigate(['/student'])

  }
}
  onSave(): void {
    if(this.model.newPassword){
      if(this.model.newPassword.length<6){
       this.addValidateText('รหัสผ่านต้องมากกว่า 6 ตัวอักษร')
      }else{
        this.changePasswordService.changePassword(this.model).subscribe(result=>{
          if(result){
           this.router.navigate(['/student'])
    
          }
        })
      }
    }else{
      this.addValidateText('ไม่สามารถเว้นว่างได้')
    }
    

  }
  addValidateText(t:string){
    const element = (<HTMLElement>this.el.nativeElement).querySelector(
      `.input-field`
      );
      
      const text = this.renderer.createText(t);

      sharedAddClassWithId('input-invalid',this.el,this.renderer,'NEW_PASSWORD')
      // renderer.addClass(element,'input-invalid')

      const validateSpan = this.renderer.createElement('small');
      this.renderer.appendChild(validateSpan,text)
      this.renderer.addClass(validateSpan,'invalid')                    
      this.renderer.appendChild(element.parentNode,validateSpan)
  }

  ngOnInit(): void {

    
  }

}
