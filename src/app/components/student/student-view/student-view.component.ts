import { Component, ElementRef, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SelectItem } from 'primeng/api';
import { elementAt, forkJoin } from 'rxjs';
import { SelectItems } from 'src/app/shared/models/miscellaneous';
import { DisplayService } from 'src/app/shared/services/display.service';
import { BaseItemComponent } from 'src/app/shared/component/base-item/base-item.component';
import { BaseItemInterface } from 'src/app/shared/interface/base-item-interface';
import { StudentItemModel } from '../student-model';
import { StudentService } from '../student.service';
import { UserDataService } from 'src/app/shared/services/user-data.service';

@Component({
  selector: 'student-view',
  templateUrl: './student-view.component.html',
  styleUrls: ['./student-view.component.scss']
})
export class StudentViewComponent extends BaseItemComponent<StudentItemModel>  implements BaseItemInterface {
  isAmin:boolean = false
  notAmin:boolean = false
  isStudent:boolean = false
  constructor(el:ElementRef,renderer:Renderer2,private readonly service:StudentService,private readonly userDataService:UserDataService, router: Router , route:ActivatedRoute,displayService:DisplayService){
    super(el,renderer,router,route) 

    this.isAmin = this.userDataService.getUserType() == 'Admin' 
    this.isStudent = this.userDataService.getUserType() == 'Student' 
  this.notAmin = !this.isAmin 
  }
  statusDropdown:SelectItems[]=[]
  titleDropdown:SelectItems[]=[]
  gendarDropdown:SelectItems[]=[]
  nationalityDropdown:SelectItems[]=[]
  ethnicityDropdown:SelectItems[]=[]
  religionDropdown:SelectItems[]=[]

  oldSchoolCountryDropdown:SelectItems[]=[]
  oldSchoolProvinceDropdown:SelectItems[]=[]
  oldSchoolDistrictDropdown:SelectItems[]=[]
  oldSchoolSubDistrictDropdown:SelectItems[]=[]

  birthCountryDropdown:SelectItems[]=[]
  birthProvinceDropdown:SelectItems[]=[]
  birthDistrictDropdown:SelectItems[]=[]
  birthSubDistrictDropdown:SelectItems[]=[]

  countryDropdown:SelectItems[]=[]
  provinceDropdown:SelectItems[]=[]
  districtDropdown:SelectItems[]=[]
  subDistrictDropdown:SelectItems[]=[]
  contractCountryDropdown:SelectItems[]=[]
  contractProvinceDropdown:SelectItems[]=[]
  contractDistrictDropdown:SelectItems[]=[]
  contractSubDistrictDropdown:SelectItems[]=[]
  bloodTypeDropdown:SelectItems[]=[]
  aliveWithDropdown:SelectItems[]=[]
  parentStatusDropdown:SelectItems[]=[]
  classroomDropdown:SelectItems[]=[]
  classroomTypeDropdown:SelectItems[]=[]
  fatherTitleDropdown:SelectItems[]=[]
  fatherBloodTypeDropdown:SelectItems[]=[]
  motherTitleDropdown:SelectItems[]=[]
  motherBloodTypeDropdown:SelectItems[]=[]
  parentTitleDropdown:SelectItems[]=[]
  parentBloodTypeDropdown:SelectItems[]=[]
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
    this.statusDropdown = this.dropdownService.getStatusDropdown()
    this.titleDropdown = this.dropdownService.getTitleDropdown()
    this.bloodTypeDropdown = this.dropdownService.getBloodTypeDropdown()
    this.fatherTitleDropdown = this.dropdownService.getParentTitleDropdown()
    this.fatherBloodTypeDropdown = this.dropdownService.getBloodTypeDropdown()
    this.motherTitleDropdown = this.dropdownService.getParentTitleDropdown()
    this.motherBloodTypeDropdown = this.dropdownService.getBloodTypeDropdown()
    this.parentTitleDropdown = this.dropdownService.getParentTitleDropdown()
    this.parentBloodTypeDropdown = this.dropdownService.getBloodTypeDropdown()
  }
  getById(): void{
    this.service.getItem(this.id).subscribe(result=>{      
      this.model = result
      this.onAsyncRunner(result);
      this.initDropdown(this.model)

    })
  }
  onAsyncRunner(model?: any): void {
    this.onEnumLoader()

    forkJoin(
    this.service.getGendarDropdown(),
    this.service.getNationalityDropdown(),
    this.service.getEthnicityDropdown(),
    this.service.getReligionDropdown(),
    this.service.getBirthCountryDropdown(),
    this.service.getCountryDropdown(),
    // this.service.getProvinceDropdown(),
    // this.service.getDistrictDropdown(),
    // this.service.getSubDistrictDropdown(),
    // this.service.getContractCountryDropdown(),
    // this.service.getContractProvinceDropdown(),
    // this.service.getContractDistrictDropdown(),
    // this.service.getContractSubDistrictDropdown(),
    this.service.getAliveWithDropdown(),
    this.service.getClassroomDropdown(),
    this.service.getParentStatusDropdown(),
    this.service.getClassroomTypeDropdown()
    ).subscribe(
      (
      [
      gendarDropdown,
      nationalityDropdown,
      ethnicityDropdown,
      religionDropdown,
      birthCountryDropdown,
      countryDropdown,
      // provinceDropdown,
      // districtDropdown,
      // subDistrictDropdown,
      // contractCountryDropdown,
      // contractProvinceDropdown,
      // contractDistrictDropdown,
      // contractSubDistrictDropdown,
      aliveWithDropdown,
      classroomDropdown,
      parentStatusDropdown,
      classroomTypeDropdown
      ]
      ) => {
      [
     this.gendarDropdown =gendarDropdown  as SelectItems[],
     this.nationalityDropdown =nationalityDropdown  as SelectItems[],
     this.ethnicityDropdown =ethnicityDropdown  as SelectItems[],
     this.religionDropdown =religionDropdown  as SelectItems[],
     this.birthCountryDropdown =birthCountryDropdown  as SelectItems[],
     this.countryDropdown =countryDropdown  as SelectItems[],
     this.oldSchoolCountryDropdown =countryDropdown  as SelectItems[],
    //  this.provinceDropdown =provinceDropdown  as SelectItems[],
    //  this.districtDropdown =districtDropdown  as SelectItems[],
    //  this.subDistrictDropdown =subDistrictDropdown  as SelectItems[],
     this.contractCountryDropdown =countryDropdown  as SelectItems[],
    //  this.contractProvinceDropdown =provinceDropdown  as SelectItems[],
    //  this.contractDistrictDropdown =contractDistrictDropdown  as SelectItems[],
    //  this.contractSubDistrictDropdown =contractSubDistrictDropdown  as SelectItems[],
     this.aliveWithDropdown =aliveWithDropdown  as SelectItems[],
     this.classroomDropdown =classroomDropdown  as SelectItems[],
     this.parentStatusDropdown = parentStatusDropdown as SelectItems[],
     this.classroomTypeDropdown = classroomTypeDropdown as SelectItems[],
      ]
      }) 
   
  }
  initDropdown(en: any) {
    const model = en as StudentItemModel
    this.getOldSchoolProvince(model.oldSchoolCountryId?model.oldSchoolCountryId:0)
    this.getOldSchoolDistrict(model.oldSchoolProvinceId?model.oldSchoolProvinceId:0)
    this.getOldSchoolSubDistrict(model.oldSchoolDistrictId?model.oldSchoolDistrictId:0)
    this.getBirthProvince(model.birthCountryId?model.birthCountryId:0)
    this.getBirthDistrict(model.birthProvinceId?model.birthProvinceId:0)
    this.getBirthSubDistrict(model.birthDistrictId?model.birthDistrictId:0)
    this.getContractProvince(model.contractCountryId?model.contractCountryId:0)
    this.getProvince(model.countryId?model.countryId:0)
    this.getDistrict(model.provinceId?model.provinceId:0)
    this.getContractDistrict(model.contractProvinceId?model.contractProvinceId:0)
    this.getSubDistrict(model.districtId?model.districtId:0)
    this.getContractSubDistrict(model.contractDistrictId?model.contractDistrictId:0)
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
    this.displayService.setViewMode()
    // localStorage.setItem('MODE','VIEW')
    // DisplayService.
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
    this.toList('student')
  }
  getOldSchoolProvince(id:number){
    this.service.getProvinceDropdown(id).subscribe(result=>{
      this.oldSchoolProvinceDropdown = result 
    })

  }
  getOldSchoolDistrict(id:number){
    this.service.getDistrictDropdown(id).subscribe(result=>{
      this.oldSchoolDistrictDropdown = result 
    })
  }
  getOldSchoolSubDistrict(id:number){
    this.service.getSubDistrictDropdown(id).subscribe(result=>{
      this.oldSchoolSubDistrictDropdown = result 
    })
  }
  getBirthProvince(id:number){
    this.service.getProvinceDropdown(id).subscribe(result=>{
      this.birthProvinceDropdown = result 
    })

  }
  getBirthDistrict(id:number){
    this.service.getDistrictDropdown(id).subscribe(result=>{
      this.birthDistrictDropdown = result 
    })
  }
  getBirthSubDistrict(id:number){
    this.service.getSubDistrictDropdown(id).subscribe(result=>{
      this.birthSubDistrictDropdown = result 
    })
  }
  getContractProvince(id:number){
    this.service.getContractProvinceDropdown(id).subscribe(result=>{
      this.contractProvinceDropdown = result 
    })
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
  getContractDistrict(id:number){
    this.service.getContractDistrictDropdown(id).subscribe(result=>{
      this.contractDistrictDropdown = result 
    })
  }
  getSubDistrict(id:number){
    this.service.getSubDistrictDropdown(id).subscribe(result=>{
      this.subDistrictDropdown = result 
    })
  }
  getContractSubDistrict(id:number){
    this.service.getContractSubDistrictDropdown(id).subscribe(result=>{
      this.contractSubDistrictDropdown = result 
    })
  }
  filterEnum(model:any,array:any){
     let label = array.filter((element:any)=>{
      return element.value === model
      
    })
    return label[0]?.label
    this.model.phoneNumber
  }
  page(){
    const infoId = this.router.url.split('/').reverse()[0]
    const canEdit = this.userDataService.getCanEdit()

    
    if(this.isStudent){
     
      
      if(canEdit){
        this.toItem('student',+infoId,false);
      }else{
        this.router.navigate([`edit-request`]);
      }
    }else{
      this.toItem('student',+infoId,false);
    }

  }
  
  // toItemPage(id:number,isView:boolean){
  //   this.toItem('edit-request',id,isView)
  // }
}
