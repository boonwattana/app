import { Component, ElementRef, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SelectItem } from 'primeng/api';
import { forkJoin } from 'rxjs';
import { SelectItems } from 'src/app/shared/models/miscellaneous';
import { BaseItemComponent } from 'src/app/shared/component/base-item/base-item.component';
import { BaseItemInterface } from 'src/app/shared/interface/base-item-interface';
import { StudentSupportItemModel } from '../student-support-model';
import { StudentSupportService } from '../student-support.service';

export class Product{
  id:number;
  category:string;
  name:string;
  price:number;
  image:string;
  inventoryStatus:string
}

@Component({
  selector: 'student-support-item',
  templateUrl: './student-support-item.component.html',
  styleUrls: ['./student-support-item.component.scss']
})
export class StudentSupportItemComponent extends BaseItemComponent<StudentSupportItemModel>  implements BaseItemInterface {
  constructor(el:ElementRef,renderer:Renderer2,private readonly service:StudentSupportService, router: Router , route:ActivatedRoute){
    super(el,renderer,router,route) 
  }
  
  classroomDropdown:SelectItems[]=[]
  classroomTypeDropdown:SelectItems[]=[]
  teacherDropdown:SelectItems[]=[]
  performanceDropdown:SelectItems[]=[]
  formValidate:boolean =true
  availableProducts: Product[] = [
    {
      id:1,
      category:"string",
      name:"string",
      price:10,
      image:'',
      inventoryStatus:'true'
    },
    {
      id:2,
      category:"string2",
      name:"string2",
      price:10,
      image:'',
      inventoryStatus:'true'
    }
  ];
    
  selectedProducts: Product[]  = [];
  
  draggedProduct: Product;
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
    this.performanceDropdown = this.dropdownService.getPerformanceDropdown()
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
    this.service.getClassroomDropdown(),
    this.service.getClassroomTypeDropdown()
    ).subscribe(
      (
      [
      teacherDropdown,
      classroomDropdown,
      classroomTypeDropdown
      ]
      ) => {
      [
     this.teacherDropdown =teacherDropdown  as SelectItems[],
     this.classroomDropdown =classroomDropdown  as SelectItems[],
     this.classroomTypeDropdown = classroomTypeDropdown as SelectItems[],
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
    this.toList('student-support')
  }
  dragStart(product?: Product) {

    this.draggedProduct = product;
}

drop(event?:any) {
    
    if (this.draggedProduct) {
        let draggedProductIndex = this.findIndex(this.draggedProduct);
        this.selectedProducts = [...this.selectedProducts, this.draggedProduct];
        this.availableProducts = this.availableProducts.filter((val,i) => i!=draggedProductIndex);
        this.draggedProduct = null;
    }

    
}

dragEnd(event?:any) {
    this.draggedProduct = null;
}

findIndex(product: Product) {
    let index = -1;
    for(let i = 0; i < this.availableProducts.length; i++) {
        if (product.id === this.availableProducts[i].id) {
            index = i;
            break;
        }
    }
    return index;
}
onAdd(e:any){

  if(!this.model.studentIdAdd){
    this.model.studentIdAdd =[]
  }
  this.model.studentIdAdd.push(e)
  
}
onRemove(e:any){
  if(!this.model.studentIdRemove){
    this.model.studentIdRemove =[]
  }
  this.model.studentIdRemove.push(e)
}
pageEdit(){
  const infoId = this.router.url.split('/').reverse()[0]
    this.toItem('student-support',+infoId,false);
}
}
