import { Component, ElementRef, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SelectItem } from 'primeng/api';
import { forkJoin } from 'rxjs';
import { SelectItems } from 'src/app/shared/models/miscellaneous';
import { BaseItemComponent } from 'src/app/shared/component/base-item/base-item.component';
import { BaseItemInterface } from 'src/app/shared/interface/base-item-interface';
import { EditRequestItemModel } from '../edit-request-model';
import { EditRequestService } from '../edit-request.service';
import { UserDataService } from 'src/app/shared/services/user-data.service';

@Component({
  selector: 'edit-request-item',
  templateUrl: './edit-request-item.component.html',
  styleUrls: ['./edit-request-item.component.scss']
})
export class EditRequestItemComponent extends BaseItemComponent<EditRequestItemModel>  implements BaseItemInterface {
  editFieldDropdown:SelectItems[]=[]
  statusDropdown:SelectItems[]=[]
  formValidate:boolean =true
  userType:string;
  infoId:string;
  isAmin:boolean
  constructor(el:ElementRef,renderer:Renderer2,private readonly service:EditRequestService, router: Router , route:ActivatedRoute,
    private readonly userDataService:UserDataService){
    super(el,renderer,router,route) 
    this.userType= this.userDataService.getUserType()
    this.infoId = this.userDataService.getInfoId()
    this.isAmin=this.userType == 'Admin'
  }

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
    this.statusDropdown = this.dropdownService.getEditRequestStatusDropdown()
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
    this.service.getEditFieldDropdown(),
    ).subscribe(
      (
      [
      editFieldDropdown,
      ]
      ) => {
      [
     this.editFieldDropdown =editFieldDropdown  as SelectItems[],
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
  onApprove(): void {
    this.onSubmitApprove(this.validateField())
  }
  onReject(): void {
    this.onSubmitReject(this.validateField())
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
  async onSubmitApprove(isValid:boolean){    
    if(isValid){
      this.service.approve(this.id,this.model).subscribe(value=>{
        this.backTolist()
      })

    }
  }
  async onSubmitReject(isValid:boolean){    
    if(isValid){
      this.service.reject(this.id,this.model).subscribe(value=>{
        this.backTolist()
      })

    }
  }
  backTolist(){    
    this.toList('edit-request')
  }
}
