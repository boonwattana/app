import { Component, ElementRef, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SelectItem } from 'primeng/api';
import { forkJoin } from 'rxjs';
import { SelectItems } from 'src/app/shared/models/miscellaneous';
import { BaseItemComponent } from 'src/app/shared/component/base-item/base-item.component';
import { BaseItemInterface } from 'src/app/shared/interface/base-item-interface';
import { StudentHelpItemModel } from '../student-help-model';
import { StudentHelpService } from '../student-help.service';

@Component({
  selector: 'student-help-item',
  templateUrl: './student-help-item.component.html',
  styleUrls: ['./student-help-item.component.scss']
})
export class StudentHelpItemComponent extends BaseItemComponent<StudentHelpItemModel>  implements BaseItemInterface {
  constructor(el:ElementRef,renderer:Renderer2,private readonly service:StudentHelpService, router: Router , route:ActivatedRoute){
    super(el,renderer,router,route) 
  }
  studentDropdown:SelectItems[]=[]
  resultHelpTypeDropdown:SelectItems[]=[]
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
    this.resultHelpTypeDropdown = this.dropdownService.getResultHelpTypeDropdown()
  }
  getById(): void{
    this.service.getItem(this.id).subscribe(result=>{      
      this.model = result
      this.isUpdateMode = result.isUpdateMode
      this.onAsyncRunner(result);
    })
  }
  onAsyncRunner(model?: any): void {
    this.onEnumLoader()

    forkJoin(
    this.service.getStudentDropdown(),
    ).subscribe(
      (
      [
      studentDropdown,
      ]
      ) => {
      [
     this.studentDropdown =studentDropdown  as SelectItems[],
      ]
      }),
      (error) => {
      }
   
  }
  async setInitialCreatingData(){
    this.service.initial().subscribe(result=>{
      this.model = result
      this.model.studentId = +localStorage.getItem('STUDENT_ID')
      this.model.studentValue =localStorage.getItem('STUDENT_VALUE')
    })
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
    this.toList('student-help')
  }
  pageEdit(){
    const infoId = this.router.url.split('/').reverse()[0]
      this.toItem('student-help',+infoId,false);
  }
}
