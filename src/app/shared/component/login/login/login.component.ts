import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginStat, UserType } from 'src/app/shared/constants/enum-system';
import { BaseItemInterface } from 'src/app/shared/interface/base-item-interface';
import { FormValidationModel } from 'src/app/shared/models/miscellaneous';
import { UserDataService } from 'src/app/shared/services/user-data.service';
import { BaseItemComponent } from '../../base-item/base-item.component';
import { LoginModel } from '../login-model';
import { LoginService } from '../login.service';
import { RegisterModel } from '../register-model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BaseItemComponent<LoginModel>  implements BaseItemInterface {
  isRegister:boolean = false
  register:RegisterModel = {}
  constructor(
    el:ElementRef,
    renderer:Renderer2,
    router: Router , 
    route:ActivatedRoute,
    private readonly loginService:LoginService,
    private readonly userDataService:UserDataService,
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
  onSave(validation: FormValidationModel): void {
  }

  ngOnInit(): void {

    
  }
  submitLogin(){

    if(this.validateField()){
      this.loginService.login(this.model).subscribe(result=>{
        
        if(result){          
          this.userDataService.setCurrentTime()
          this.userDataService.setToken(result?.token?.accessToken)
          this.userDataService.setLoginState(LoginStat.LOGIN)
          
          this.userDataService.setUserFLName(`${result.user?.firstname} ${result.user?.lastname}`)
          this.userDataService.setInfoId(result.user?.inforId)
          this.userDataService.setUserId(result.user?.id)
          this.userDataService.setUserType(result.user?.type)
          this.userDataService.setCanEdit(result.canEdit)
          this.userDataService.setisGuid(result.user?.isGuid)


          this.userDataService.setClassName(result.className)
          this.userDataService.setRoomName(result.roomName)
          this.userDataService.setTermName(result.termName)
          this.userDataService.setTermId(result.termId)



          if(result.matchPassword){
            this.userDataService.setMatchPassword(result.matchPassword?'YES':'NO')

          }
          if(result.user?.type==UserType.TEACHER){
            this.userDataService.setClassroomTypeId(result.classroomTypeId)
            this.userDataService.setClassroomId(result.classroomId)
          }
          // window.location.reload();
          if(this.userDataService.isStudent()){
            this.toItem('student',result.user?.inforId,true)
            setTimeout(function(){ 
              window.location.reload();
            }, 1000); 

          }
          if(this.userDataService.isTeacher()){
            this.toItem('teacher',result.user?.inforId,true)
            setTimeout(function(){ 
              window.location.reload();
            }, 1000); }
      
            if(this.userDataService.isAccount()){
              this.toList('student')
              setTimeout(function(){ 
                window.location.reload();
              }, 1000); }
            if(this.userDataService.isHuman()){
              this.toList('teacher')
              setTimeout(function(){ 
                window.location.reload();
              }, 1000); }

              if(this.userDataService.isBusiness()){
                this.toList('student-home-visit')
                setTimeout(function(){ 
                  window.location.reload();
                }, 1000); }
          
                if(this.userDataService.isAdmin()){
                  this.toList('dashbord')
                  setTimeout(function(){ 
                    window.location.reload();
                  }, 1000); }

        }
      })
    }

  }
  submitRegister(){    
    if(this.validateField()){
      this.loginService.register(this.register).subscribe(result=>{
        if(result?.success){
          this.isRegister = false
          this.userDataService.setToken(result?.token?.accessToken)
          this.userDataService.setLoginState(LoginStat.LOGIN)
          window.location.reload();
        }
      })
    }

  }
  setRegister(isRegister:boolean){
    this.isRegister = isRegister
  }
  social(link){
    window.location.href = link
  }
}
