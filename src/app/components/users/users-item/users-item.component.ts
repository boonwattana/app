import { Component, ElementRef, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SelectItem } from 'primeng/api';
import { forkJoin } from 'rxjs';
import { SelectItems } from 'src/app/shared/models/miscellaneous';
import { BaseItemComponent } from 'src/app/shared/component/base-item/base-item.component';
import { BaseItemInterface } from 'src/app/shared/interface/base-item-interface';
import { UsersItemModel } from '../users-model';
import { UsersService } from '../users.service';
import { UserDataService } from 'src/app/shared/services/user-data.service';
import { UserType } from 'src/app/shared/constants/enum-system';

@Component({
  selector: 'users-item',
  templateUrl: './users-item.component.html',
  styleUrls: ['./users-item.component.scss']
})
export class UsersItemComponent extends BaseItemComponent<UsersItemModel>  implements BaseItemInterface {
  constructor(el:ElementRef,renderer:Renderer2,private readonly service:UsersService, router: Router , route:ActivatedRoute, private readonly userDataService:UserDataService){
    super(el,renderer,router,route) 
    
  }
  typeDropdown:SelectItems[]=[]
  formValidate:boolean =true
  isTeacher:boolean
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
    this.typeDropdown = this.dropdownService.getTypeDropdown()
  }
  getById(): void{
    this.service.getItem(this.id).subscribe(result=>{      
      this.model = result
      this.isTeacher = !(this.model.type == UserType.TEACHER)
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
    this.toList('users')
  }
  onTypeChange(e:any){
    
    if(e == UserType.TEACHER){
      
      this.isTeacher = false
    }else{
      this.isTeacher = true
      this.model.isGuid = false
    }
  }
}
