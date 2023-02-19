import { Component, ElementRef, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SelectItem } from 'primeng/api';
import { forkJoin } from 'rxjs';
import { SelectItems } from 'src/app/shared/models/miscellaneous';
import { BaseItemComponent } from 'src/app/shared/component/base-item/base-item.component';
import { BaseItemInterface } from 'src/app/shared/interface/base-item-interface';
import { StudentConsultantItemModel } from '../student-consultant-model';
import { StudentConsultantService } from '../student-consultant.service';
import { UserDataService } from 'src/app/shared/services/user-data.service';

@Component({
  selector: 'student-consultant-item',
  templateUrl: './student-consultant-item.component.html',
  styleUrls: ['./student-consultant-item.component.scss']
})
export class StudentConsultantItemComponent extends BaseItemComponent<StudentConsultantItemModel>  implements BaseItemInterface {
  constructor(el:ElementRef,renderer:Renderer2,private readonly service:StudentConsultantService, router: Router , route:ActivatedRoute,private readonly userDataService:UserDataService){
    super(el,renderer,router,route) 
  }
  studentDropdown:SelectItems[]=[]
  teacherDropdown:SelectItems[]=[]
  consultantTypeDropdown:SelectItems[]=[]
  storyTypeDropdown:SelectItems[]=[]
  resultTypeDropdown:SelectItems[]=[]
  sentTypeDropdown:SelectItems[]=[]
  formValidate:boolean =true
  ngOnDestroy(): void {
  }
  ngAfterViewInit(): void {
    if(this.isUpdateMode){
      this.getById()

    }else{
      this.setInitialCreatingData()
    }
      this.onAsyncRunner();
  }

  onEnumLoader(): void {
    this.consultantTypeDropdown = this.dropdownService.getConsultantTypeDropdown()
    this.storyTypeDropdown = this.dropdownService.getStoryTypeDropdown()
    this.resultTypeDropdown = this.dropdownService.getResultTypeDropdown()
    if(this.userDataService.isGuid()||this.userDataService.isAdmin()){
      this.sentTypeDropdown = this.dropdownService.getSentTypeGuidDropdown()
    }else{
      this.sentTypeDropdown = this.dropdownService.getSentTypeTeacherDropdown()
    }
    
  }
  getById(): void{
    this.service.getItem(this.id).subscribe(result=>{      
      this.model = result
      this.onAsyncRunner(result);
    })
  }
  onAsyncRunner(model?: any): void {
    this.onEnumLoader()

    forkJoin(
    this.service.getStudentDropdown(),
    this.service.getTeacherDropdown(),
    ).subscribe(
      (
      [
      studentDropdown,
      teacherDropdown,
      ]
      ) => {
      [
     this.studentDropdown =studentDropdown  as SelectItems[],
     this.teacherDropdown =teacherDropdown  as SelectItems[],
      ]
      }),
      (error) => {
      }
   
  }
  async setInitialCreatingData(){    
    this.service.initial().subscribe(result=>{
      this.model = result
    })
    this.model.studentId = +localStorage.getItem('STUDENT_ID')
    this.model.studentValue =localStorage.getItem('STUDENT_VALUE')
  }
  onSave(): void {
    this.onSubmit(this.validateField())
  }
  ngOnInit(): void {
   this.setInitialCreatingData()
  } 
  async onSubmit(isValid:boolean){    
    if(isValid){
      if(this.isUpdateMode){
        this.service.update(this.id,this.model).subscribe(value=>{
          this.backTolist()
        })
      }else{
        this.service.create(this.model).subscribe(value=>{
          this.backTolist()
        })
      }
    }
  }
  backTolist(){    
    this.toList('student-consultant')
  }
  pageEdit(){
    const infoId = this.router.url.split('/').reverse()[0]
      this.toItem('student-consultant',+infoId,false);
  }
}
