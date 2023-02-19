import { Component, ElementRef, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SelectItem } from 'primeng/api';
import { forkJoin } from 'rxjs';
import { SelectItems } from 'src/app/shared/models/miscellaneous';
import { BaseItemComponent } from 'src/app/shared/component/base-item/base-item.component';
import { BaseItemInterface } from 'src/app/shared/interface/base-item-interface';
import { TeachersDevelopItemModel } from '../teachers-develop-model';
import { TeachersDevelopService } from '../teachers-develop.service';
import { UserDataService } from 'src/app/shared/services/user-data.service';

@Component({
  selector: 'teachers-develop-item',
  templateUrl: './teachers-develop-item.component.html',
  styleUrls: ['./teachers-develop-item.component.scss']
})
export class TeachersDevelopItemComponent extends BaseItemComponent<TeachersDevelopItemModel>  implements BaseItemInterface {
  constructor(el:ElementRef,renderer:Renderer2,private readonly service:TeachersDevelopService, router: Router , route:ActivatedRoute,private userDataService:UserDataService){
    super(el,renderer,router,route) 
    this.isTeacher = userDataService.isTeacher()
  }
  teacherDropdown:SelectItems[]=[]
  curriculumDropdown:SelectItems[]=[]
  practicleDropdown:SelectItems[]=[]
  formValidate:boolean =true
  isTeacher:boolean = false
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
    this.service.getCurriculumDropdown(),
    this.service.getPracticleDropdown(),
    ).subscribe(
      (
      [
      teacherDropdown,
      curriculumDropdown,
      practicleDropdown,
      ]
      ) => {
      [
     this.teacherDropdown =teacherDropdown  as SelectItems[],
     this.curriculumDropdown =curriculumDropdown  as SelectItems[],
     this.practicleDropdown =practicleDropdown  as SelectItems[],
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
    this.toList('teachers-develop')
  }
}
