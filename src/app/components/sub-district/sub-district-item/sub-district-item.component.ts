import { Component, ElementRef, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SelectItem } from 'primeng/api';
import { forkJoin } from 'rxjs';
import { SelectItems } from 'src/app/shared/models/miscellaneous';
import { BaseItemComponent } from 'src/app/shared/component/base-item/base-item.component';
import { BaseItemInterface } from 'src/app/shared/interface/base-item-interface';
import { SubDistrictItemModel } from '../sub-district-model';
import { SubDistrictService } from '../sub-district.service';

@Component({
  selector: 'sub-district-item',
  templateUrl: './sub-district-item.component.html',
  styleUrls: ['./sub-district-item.component.scss']
})
export class SubDistrictItemComponent extends BaseItemComponent<SubDistrictItemModel>  implements BaseItemInterface {
  constructor(el:ElementRef,renderer:Renderer2,private readonly service:SubDistrictService, router: Router , route:ActivatedRoute){
    super(el,renderer,router,route) 
  }
  districtDropdown:SelectItems[]=[]
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
    this.service.getDistrictDropdown(),
    ).subscribe(
      (
      [
      districtDropdown,
      ]
      ) => {
      [
     this.districtDropdown =districtDropdown  as SelectItems[],
      ]
      }) 
   
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
    this.toList('sub-district')
  }
}
