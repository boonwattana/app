import { Component, ElementRef, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SelectItem } from 'primeng/api';
import { forkJoin } from 'rxjs';
import { SelectItems } from 'src/app/shared/models/miscellaneous';
import { BaseItemComponent } from 'src/app/shared/component/base-item/base-item.component';
import { BaseItemInterface } from 'src/app/shared/interface/base-item-interface';
import { TeacherItemModel } from '../teacher-model';
import { TeacherService } from '../teacher.service';
import {TabMenuModule} from 'primeng/tabmenu';
import {MenuItem} from 'primeng/api';

 

@Component({
  selector: 'teacher-item',
  templateUrl: './teacher-item.component.html',
  styleUrls: ['./teacher-item.component.scss']
})
export class TeacherItemComponent extends BaseItemComponent<TeacherItemModel>  implements BaseItemInterface {
  constructor(el:ElementRef,renderer:Renderer2,private readonly service:TeacherService, router: Router , route:ActivatedRoute){
    super(el,renderer,router,route) 
  }
  statusDropdown:SelectItems[]=[]
  positionNameDropdown:SelectItems[]=[]
  practitionerDropdown:SelectItems[]=[]
  subjectGroupDropdown:SelectItems[]=[]
  titleDropdown:SelectItems[]=[]
  titleEnDropdown:SelectItems[]=[]
  gendarDropdown:SelectItems[]=[]
  nationalityDropdown:SelectItems[]=[]
  ethnicityDropdown:SelectItems[]=[]
  religionDropdown:SelectItems[]=[]
  practitionerLevelDropdown:SelectItems[]=[]
  educationDropdown:SelectItems[]=[]
  countryDropdown:SelectItems[]=[]
  provinceDropdown:SelectItems[]=[]
  districtDropdown:SelectItems[]=[]
  subDistrictDropdown:SelectItems[]=[]
  classroomTypeDropdown:SelectItems[]=[]
  classroomDropdown:SelectItems[]=[]
  activityStudentDropdown:SelectItems[]=[]
  actionTeachDropdown:SelectItems[]=[]
  formValidate:boolean =true
  type:number = 2
    items: MenuItem[];
    scrollableItems: MenuItem[];
    activeItem: MenuItem;
    activeItem2: MenuItem;



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
    this.statusDropdown = this.dropdownService.getTeacherStatusDropdown()
    this.positionNameDropdown = this.dropdownService.getTeacherPositionNameDropdown()
    this.practitionerDropdown = this.dropdownService.getTeacherPractitionerDropdown()
    this.titleEnDropdown = this.dropdownService.getTeacherTitleEnDropdown()
    this.titleDropdown = this.dropdownService.getTeacherTitleDropdown()
    this.educationDropdown = this.dropdownService.getEducationDropdown()
    this.actionTeachDropdown = this.dropdownService.getActionTeach()
  }
  getById(): void{
    this.service.getItem(this.id).subscribe(result=>{      
      this.model = result
      this.onAsyncRunner(result);
      this.initDropdown(this.model)
    })
  }
  initDropdown(en: any) {
    const model = en as TeacherItemModel

    this.getProvince(model.countryId?model.countryId:0)
    this.getDistrict(model.provinceId?model.provinceId:0)
    this.getSubDistrict(model.districtId?model.districtId:0)
  }
  onAsyncRunner(model?: any): void {
    this.onEnumLoader()

    forkJoin(
    this.service.getGendarDropdown(),
    this.service.getNationalityDropdown(),
    this.service.getEthnicityDropdown(),
    this.service.getReligionDropdown(),
    this.service.getPractitionerLevelDropdown(),
    this.service.getCountryDropdown(),
    // this.service.getProvinceDropdown(),
    // this.service.getDistrictDropdown(),
    // this.service.getSubDistrictDropdown(),
    this.service.getSubjectGroupDropdown(),
    this.service.getClassroomTypeDropdown(),
    this.service.getClassroomDropdown(),

    this.service.getActivityStudentDropdown()
    ).subscribe(
      (
      [
      gendarDropdown,
      nationalityDropdown,
      ethnicityDropdown,
      religionDropdown,
      practitionerLevelDropdown,
      countryDropdown,
      // provinceDropdown,
      // districtDropdown,
      // subDistrictDropdown,
      subjectGroupDropdown,
      classroomTypeDropdown,
      classroomDropdown,
      activityDropdown
      ]
      ) => {
      [
     this.gendarDropdown =gendarDropdown  as SelectItems[],
     this.nationalityDropdown =nationalityDropdown  as SelectItems[],
     this.ethnicityDropdown =ethnicityDropdown  as SelectItems[],
     this.religionDropdown =religionDropdown  as SelectItems[],
     this.practitionerLevelDropdown =practitionerLevelDropdown  as SelectItems[],
     this.countryDropdown =countryDropdown  as SelectItems[],
    //  this.provinceDropdown =provinceDropdown  as SelectItems[],
    //  this.districtDropdown =districtDropdown  as SelectItems[],
    //  this.subDistrictDropdown =subDistrictDropdown  as SelectItems[],
     this.subjectGroupDropdown = subjectGroupDropdown as SelectItems[],
     this.classroomTypeDropdown = classroomTypeDropdown as SelectItems[],
     this.classroomDropdown = classroomDropdown as SelectItems[],
     this.activityStudentDropdown = activityDropdown  as  SelectItems[]
      ]
      }),
      (error) => {
      }
   
  }
  async setInitialCreatingData(){
    this.service.initial().subscribe(result=>{
      this.model = result
      this.initDropdown(this.model)
    })
  }
  onSave(): void {
    this.onSubmit(this.validateField())
  }
  ngOnInit(): void {
    
   this.setInitialCreatingData();
 

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
    this.toList('teacher')
  }
  pageEdit(){
    const infoId = this.router.url.split('/').reverse()[0]
    this.toItem('teacher',+infoId,false);
  }
  getProvince(id:number){
    this.service.getProvinceDropdown(id).subscribe(result=>{
      this.provinceDropdown = result 
    })

  }
  getDistrict(id:number){
    this.service.getDistrictDropdown(id).subscribe(result=>{
      this.districtDropdown = result 
    })
  }
  getSubDistrict(id:number){
    this.service.getSubDistrictDropdown(id).subscribe(result=>{
      this.subDistrictDropdown = result 
    })
  }
  postCodeChange(id:any){    
    this.model.postCode = this.subDistrictDropdown.find(fn=>fn.value == id).rowData.postCode
  }
}
