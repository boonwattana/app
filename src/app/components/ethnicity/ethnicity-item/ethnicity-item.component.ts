import { Component, ElementRef, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SelectItem } from 'primeng/api';
import { forkJoin } from 'rxjs';
import { SelectItems } from 'src/app/shared/models/miscellaneous';
import { BaseItemComponent } from 'src/app/shared/component/base-item/base-item.component';
import { BaseItemInterface } from 'src/app/shared/interface/base-item-interface';
import { EthnicityItemModel } from '../ethnicity-model';
import { EthnicityService } from '../ethnicity.service';

@Component({
  selector: 'ethnicity-item',
  templateUrl: './ethnicity-item.component.html',
  styleUrls: ['./ethnicity-item.component.scss']
})
export class EthnicityItemComponent extends BaseItemComponent<EthnicityItemModel>  implements BaseItemInterface {
  constructor(el:ElementRef,renderer:Renderer2,private readonly service:EthnicityService, router: Router , route:ActivatedRoute){
    super(el,renderer,router,route) 
  }
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
    this.toList('ethnicity')
  }
}
