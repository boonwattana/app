import { Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2 } from '@angular/core';
import { UntypedFormControl, Validators } from '@angular/forms';
import {ConfirmationService} from 'primeng/api';
import { GatewayService } from '../../services/gateway';
import { BaseWidget } from '../base-widget/base-widget';

@Component({
  selector: 'm-images-upload',
  templateUrl: './m-images-upload.component.html',
  styleUrls: ['./m-images-upload.component.scss']

})
export class MFileUploadComponent  extends BaseWidget implements OnInit{
	url: any; //Angular 11, for stricter type
  urlList:any[] = []
	msg = "";
  uploadedFiles: any[] = [];
  imagesList:any[] = []
  label:string =''
  model:string[] = []
  helpText:string=''
  invalidText:string = ''
  masterId:number
  isRequired:boolean = false
  inputForm =new UntypedFormControl(null,[Validators.required,Validators.email])
  selected:boolean = false
  type:number = 0
  constructor(private readonly confirmationService:ConfirmationService,private readonly gateway: GatewayService,el: ElementRef, renderer:Renderer2) {
    super(el,renderer)
   }
  @Input()
  set setLabel(label:string){
    this.label = label
  }
  @Input()
  set setModel(model:string[]){
    this.model = model
  }
  
  @Input()
  set setType(type:number){
    this.type = type
  }
  @Input()
  set setMasterId(id:number){
    this.masterId = id
    this.loadImageUrl(this.masterId)
  }
  @Input()
  set setHelpText(helpText:string){
    this.helpText = helpText
  }
  @Input()
  set setInvalidText(invalidText:string){
    this.invalidText = invalidText
  }
  @Input()
  set setId(id:string){
    this.id=id
  }
  ngOnInit(): void {
  }
  @Output() setModelChange = new EventEmitter<string[]>();

  myUploader(event:any) {
		for (const obj in event.target.files) {
      const image = event.target.files[obj]
      if(image.name){
        this.selected = true
        
        try {
          const reader = new FileReader();
          reader.readAsDataURL(image);
          reader.onload = (_event) => {          
          this.msg = "";
          this.urlList = []
          this.urlList.push(_event.target.result);
          if(this.urlList[0]?.length > 1000000){
            this.urlList = []
            this.confirmationService.confirm({
              message: 'ภาพต้องมีขนาดไม่เกิน 1 MB?',
              accept: () => {
                this.urlList = []
              }
            });
          }
          this.model=this.urlList
          this.setModelChange.emit(this.model);
          }
        } catch (error) {
        }
      }      
    }
	}
  loadImageUrl(id:number){
    this.gateway.get(`/images/url/${id}/${this.type}`).subscribe(data=>{
      this.imagesList = data.results      
    })
  }
  getImageUrl(image:string){
    return this.gateway.getUrl(`/images/${image}`)
  }
  removeImage(it:any){
    
    this.gateway.delete(`/images/${it.id}`).subscribe(result=>{
      if(result?.success){
        this.imagesList = this.imagesList.filter(fl=>fl.id != result?.data.id)
      }
    })
    
  }
  removeImageSelect(en:any){
    this.urlList = this.urlList.filter(fl=>fl != en)
    if(this.urlList.length==0){
      this.selected = false
    }    
  }
}
