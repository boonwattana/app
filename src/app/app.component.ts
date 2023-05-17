import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { AppInjector } from './app-injector';
import { LoginStat, UserType } from './shared/constants/enum-system';
import { AuthenService } from './shared/services/auth.service';
import { DisplayService } from './shared/services/display.service';
import { LoaderService } from './shared/services/loader.service';
import { UserDataService } from './shared/services/user-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnInit {
  @ViewChild('Setting') settingMenu:ElementRef;
  title = 'bonwattana-web';
  isLogged:boolean = false
  loadValue:number = 0;
  username:string = ''
  // settingMenu:boolean
  studentMenu:boolean
  full:boolean = false
  canEdit:boolean = false
  userType:string
  canRequest:boolean = true
  showTeacherMenu:boolean =false
  showStudentMenu:boolean =false
  showStudentMenuOnly:boolean =false
  isForStudentMenu:boolean=false
  isForParent:boolean=false
  isForAdOnly:boolean=false
  showStudentCare:boolean = false
  showHumanMenu:boolean = false
  showAccountMenu:boolean = false
  showMenuGuid:boolean = false
  showTeacherMenuOnly:boolean = false
  showLoginBtn:boolean = true
  public displayService:DisplayService
  constructor(private readonly el: ElementRef,private readonly userDataService:UserDataService,
    private readonly router:Router,
    public loaderService: LoaderService,
    private readonly confirmationService:ConfirmationService,
    private readonly renderer:Renderer2,
    private readonly authService:AuthenService
    ){
    const loginStatus = userDataService.getLoginState()
    this.displayService = AppInjector.get(DisplayService);
    if(loginStatus==LoginStat.LOGIN){
      this.isLogged = true
      this.username = userDataService.getUserFLName()
      // this.settingMenu = userDataService.getUserType()=='Admin'
      this.userType= this.userDataService.getUserType()
     
      if(this.userDataService.getUserType() === "Student"){
        this.isForStudentMenu=true;
      }
      if(this.userDataService.getUserType() !== "Student" &&this.userDataService.getUserType() !== "Teacher"){
        this.isForParent=true;
      }
      if(this.userDataService.getUserType() !== "Student" &&this.userDataService.getUserType() !== "Teacher"&&this.userDataService.getUserType() == "Admin"){
        this.isForAdOnly=true;
      }
      if(this.userType == 'Admin' ){
        this.canEdit = true
        this.canRequest = true
      }else{
        this.canEdit = this.userDataService.getCanEdit()
        this.canRequest = !this.canEdit
      }
      if(this.userDataService.isAdmin()){
        this.showTeacherMenu = true
        this.showStudentCare = true
      }
      if(this.userDataService.isBusiness()){
        this.showStudentCare = true
      }
      if(this.userDataService.isAdmin()||this.userDataService.isStudent()){
        this.showStudentMenu = true
      }
      if(this.userDataService.isHuman()){
        this.showHumanMenu = true
      }
      if(this.userDataService.isAccount()){
        this.showAccountMenu = true
      }
      if(this.userDataService.isTeacher()){
        this.showTeacherMenu = true
        this.showTeacherMenuOnly = true
        this.showMenuGuid = false
        if(this.userDataService.isGuid()){
          this.showMenuGuid = true
        }
      }
      if(this.userDataService.isStudent()){
        this.showStudentMenuOnly = true
      }
    }
    this.loadValue=0
    this.showLoginBtn = !this.authService.isLogedIn()
  }
  ngOnInit(): void {
    this.setNavClick()
    if(!this.isLogged){
      const element = document.getElementsByClassName('sidebar-left')[0] as HTMLElement
      const element1 = document.getElementsByClassName('sidebar-left1')[0] as HTMLElement
      element.classList.add('none')
      element1.classList.add('none')
      const elementlayout = document.getElementsByClassName('page-layout')[0] as HTMLElement
      elementlayout.style.gridTemplateColumns = '1fr'
    }
    // if(!this.isLogged){
    //   const element = (<HTMLElement>this.el.nativeElement).querySelector(
    //     `.sidebar`
    //     );       
    //     if(element){
    //         if(!element.classList.contains('hideAll')){
    //             this.renderer.addClass(element,'hideAll')
    //         }
    //     }
    //     const element2 = (<HTMLElement>this.el.nativeElement).querySelector(
    //       `.home-content`
    //       );                      
    //       if(element2){
    //           if(!element2.classList.contains('hideAll')){
    //               this.renderer.addClass(element2,'hideAll')
    //           }
    //       }
        
    // }
    this.loaderService.value.subscribe(value=>{
      
      this.loadValue = value
    })

    if(this.userDataService.getUserType()!='Admin'){
      const setting = (<HTMLElement>this.el.nativeElement).querySelector(
        `.setting`
        ); 
        this.renderer.addClass(setting,'hideAll')

    }

    

  }
  logout(){
    
    this.confirmationService.confirm({
      message: 'ท่านต้องการที่จะออกจากระบบ?',
      accept: () => {
        this.userDataService.clearStorage()
        this.router.navigate(['/login'])
        setTimeout(() => {
          window.location.reload();
    
        }, 100);
      }
    });


  }
  setNavClick() {
    this.full = !this.full
    let arrow = (<HTMLElement>this.el.nativeElement).querySelectorAll(
      `.arrow`
      ); 
    arrow.forEach(en=>{

      let arrowParent = en.parentElement.parentElement;      
      arrowParent.classList.toggle("showMenu");
      arrowParent.addEventListener("click", ()=>{
        arrowParent.classList.toggle("hideMenu");
  
        });
    })
    let sidebar = (<HTMLElement>this.el.nativeElement).querySelector(
      `.sidebar`
      );
    let sidebarBtn = (<HTMLElement>this.el.nativeElement).querySelector(
      `.bx-menu`
      );
      if(sidebarBtn){
        sidebarBtn.addEventListener("click", ()=>{
          sidebar.classList.toggle("close");
        });
      }

  // for (var i = 0; i < arrow.length; i++) {
  //   arrow[i].addEventListener("click", (e)=>{
  //  let arrowParent = e.target.parentElement.parentElement;//selecting main parent of arrow
  //  arrowParent.classList.toggle("showMenu");
  //   });
  // }
  
  
  
  
  }
  openmenuuser(){
    
    const userName = document.getElementById('user-menu') as HTMLElement
    userName.classList.toggle('user-menu-show')
    
  }
  openmenulift(){
    const userName = document.getElementsByClassName('sidebar-left')[0] as HTMLElement
    userName.classList.toggle('sidebar-left-show')
  }
  openmenuliftDestop(){
    const userName = document.getElementsByClassName('sidebar-left')[0] as HTMLElement
    const pageLayout = document.getElementsByClassName('page-layout')[0] as HTMLElement
    
    userName.classList.toggle('sidebar-left-close')
    pageLayout.classList.toggle('page-layout-close')
    
  }
  navigateTo(path:string){
    this.openmenulift()
    if(    !(path =='student-filter'||
    path == 'student-support')){
      const allmenu = (<HTMLElement>this.el.nativeElement).querySelectorAll(
        `.list-item`
        );
        allmenu.forEach(iteEl=>{
            if(iteEl.classList.contains('activeMenu')){
                this.renderer.removeClass(iteEl,'activeMenu')
            }
        })
        const activeMenu = (<HTMLElement>this.el.nativeElement).querySelector(
          `.${path}`
          );
          if(activeMenu){
            if(!activeMenu.classList.contains('activeMenu')){
                
                this.renderer.addClass(activeMenu,'activeMenu')
            }
        }
    }

    
    const id = this.userDataService.getInfoId()
    if(path == 'teacher'&& this.userDataService.isTeacher()){
      this.displayService.setViewMode()
      this.router.navigate([path+'/'+id]);
    }else if(
       this.userDataService.isStudent() 
    ){
      if(path == 'edit-request'){
        this.router.navigate([path]);
      }else{
        this.displayService.setViewMode()
        this.router.navigate([path+'/'+id]);
      }

    }
   else if(
      (path == 'teaching-schedule'&& this.userDataService.isTeacher() )
    ){
      this.displayService.setViewMode()
      this.router.navigate([path+'/'+id]);
    } else{
      this.router.navigate([path]);
    }


  }
  status(){
    if(this.userDataService.getUserType()=== UserType.ADMIN){
      return '#004aad'

    }else if(this.userDataService.getUserType() === UserType.STUDENT){
      return '#39b6ff'
    }
    else if(this.userDataService.getUserType() === UserType.BUSINESS){
      return '#6DBF1D'
    }
    else if(this.userDataService.getUserType() === UserType.HUMAN){
      return '#276DC4'
    }
    else if(this.userDataService.getUserType() === UserType.ACCOUNT){
      return '#CC6AD4'
    }
    else if(this.userDataService.getUserType() === UserType.TEACHER){
      return '#E34D0B'
    }
    
    else{
      return '#004aad'
    }
  }
  login(){
    this.router.navigate(['/login']);
  }
  changePassword(){
    this.displayService.setEditMode()

    this.router.navigate(['/change-password']);

  }
  openmenusub(className:string){
    
    const element = (<HTMLElement>this.el.nativeElement).querySelector(
      className
      );
      
                  
      if(element){
          if(!element.classList.contains('list-menu-d-show')){
              
              this.renderer.addClass(element,'list-menu-d-show')
          }else{
            this.renderer.removeClass(element,'list-menu-d-show')
          }
      }
    // let element = document.getElementsByClassName('list-menu-d')[key] as HTMLElement 
    
    // if(!element.classList[1]){
    //   element.classList.add('list-menu-d-show')  
    // }else{
    //   element.classList.remove('list-menu-d-show') 
    // }
  }
}
