import { Component, ElementRef, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SelectItem } from 'primeng/api';
import { forkJoin } from 'rxjs';
import { SelectItems } from 'src/app/shared/models/miscellaneous';
import { BaseItemComponent } from 'src/app/shared/component/base-item/base-item.component';
import { BaseItemInterface } from 'src/app/shared/interface/base-item-interface';
import { EducationBackgroundItemModel } from '../education-background-model';
import { EducationBackgroundService } from '../education-background.service';
import { UserDataService } from 'src/app/shared/services/user-data.service';

@Component({
  selector: 'education-background-item',
  templateUrl: './education-background-item.component.html',
  styleUrls: ['./education-background-item.component.scss']
})
export class EducationBackgroundItemComponent extends BaseItemComponent<EducationBackgroundItemModel>  implements BaseItemInterface {
  constructor(el:ElementRef,renderer:Renderer2,private readonly service:EducationBackgroundService, router: Router , route:ActivatedRoute,private userDataService:UserDataService){
    super(el,renderer,router,route) 
    this.isTeacher = userDataService.isTeacher()
  }
  teacherDropdown:SelectItems[]=[]
  educationDropdown:SelectItems[]=[]
  statusDropdown:SelectItems[]=[]
  formValidate:boolean =true
  isTeacher = false
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
    this.educationDropdown = this.dropdownService.getEducationDropdown()
    this.statusDropdown = this.dropdownService.getEducationStatusDropdown()
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
    this.service.getTeacherDropdown(),
    ).subscribe(
      (
      [
      teacherDropdown,
      ]
      ) => {
      [
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
    this.toList('education-background')
  }
}
