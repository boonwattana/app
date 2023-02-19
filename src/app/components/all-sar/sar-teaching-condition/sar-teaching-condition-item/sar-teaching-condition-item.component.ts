import { Component, ElementRef, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SelectItem } from 'primeng/api';
import { forkJoin } from 'rxjs';
import { SelectItems } from 'src/app/shared/models/miscellaneous';
import { BaseItemComponent } from 'src/app/shared/component/base-item/base-item.component';
import { BaseItemInterface } from 'src/app/shared/interface/base-item-interface';
import { SarTeachingConditionItemModel } from '../sar-teaching-condition-model';
import { SarTeachingConditionService } from '../sar-teaching-condition.service';
import { UserDataService } from 'src/app/shared/services/user-data.service';
@Component({
  selector: 'sar-teaching-condition-item',
  templateUrl: './sar-teaching-condition-item.component.html',
  styleUrls: ['./sar-teaching-condition-item.component.scss']
})
export class SarTeachingConditionItemComponent extends BaseItemComponent<SarTeachingConditionItemModel>  implements BaseItemInterface {
  constructor(el:ElementRef,renderer:Renderer2,private readonly service:SarTeachingConditionService,private userDataService:UserDataService, router: Router , route:ActivatedRoute){
    super(el,renderer,router,route) 
  }
  teacherDropdown:SelectItems[]=[]
  formValidate:boolean =true
  isTeacher = this.userDataService.isTeacher()
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
    if(this.isTeacher === true){
      this.model.teacherId = parseInt( this.userDataService.getInfoId())
       }
    this.onEnumLoader()
  if(!this.view){
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
        this.model.refId= this.model.schoolyear+'-'+ this.model.teacherId;
        this.service.update(this.id,this.model).subscribe(value=>{
          this.backTolist()
        })
      }else{
        this.model.refId= this.model.schoolyear+'-'+ this.model.teacherId;
        this.service.create(this.model).subscribe(value=>{
          this.backTolist()
        })
      }
    }
  }
  backTolist(){    
    this.toList('sar-teaching-condition')
  }
}
