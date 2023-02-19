import { Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2 } from '@angular/core';
import { UntypedFormControl, Validators } from '@angular/forms';
import { GatewayService } from '../../services/gateway';
import { BaseWidget } from '../base-widget/base-widget';
import { saveAs } from 'file-saver';
import { ValidateClass } from '../../constants/enum-system';
@Component({
  selector: 'm-file-upload',
  templateUrl: './m-file-upload.component.html',
  styleUrls: ['./m-file-upload.component.scss']

})
export class MFileDocumentUploadComponent  extends BaseWidget implements OnInit{
	url: any; //Angular 11, for stricter type
	msg = "";
  label:string =''
  model:string =''
  helpText:string=''
  invalidText:string = ''
  masterId:number
  Label:boolean = false
  isRequired:boolean = false
  selected:boolean = false
  fileName:string;
  Class:string='';
  readonly:boolean = false
  constructor(private readonly gateway: GatewayService,el: ElementRef, renderer:Renderer2) {
    super(el,renderer)
   }
  @Input()
  set setLabel(label:string){
    this.label = label
  }
  set setLabelType(param:boolean){
    this.Label = param
}
@Input()
set setClass(param:string){
  if(param){
    this.Class = param
  }else{
    this.Class = 'input-field'
  }
  
  // this.placeholder = param
}
  @Input()
  set setModel(model:string){
    this.model = model
  }
  @Input()
  set setFileName(fileName:string){
    this.fileName = fileName
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
  set setReadonly(param:boolean){
    setTimeout(() => {
      if(param!=false){
        this.readonly = true
        this.addAttribute(ValidateClass.DISABLE)
        this.addClass(ValidateClass.DISABLE)
      }else{
        this.removeAttribute(ValidateClass.DISABLE)
        this.removeClass(ValidateClass.DISABLE)
  
      }
    }, 100);


  }
  @Input()
  set setId(id:string){
    this.id=id
  }
  ngOnInit(): void {
  }
  @Output() setModelChange = new EventEmitter<string>();
  @Output() setFileNameChange = new EventEmitter<string>();
  myUploader(event:any) {
    let cal = 0
		for (const obj in event.target.files) {
      const image = event.target.files[obj]
      if(cal==0){
        this.fileName = image.name
        this.setFileNameChange.emit(this.fileName)
      }
      cal = 1
      
      if(image.name){
        
        
        try {
          const reader = new FileReader();
          reader.readAsDataURL(image);
          reader.onload = (_event) => {          
          this.model=_event.target.result.toString()
          
          this.setModelChange.emit(this.model);
          }
        } catch (error) {
        }
      }      
    }
	}
  submitDownload(){
    var blob = this.base64ToBlob(this.model.split(',')[1]);
    saveAs(blob, this.fileName);
  }
  public base64ToBlob(b64Data, contentType='', sliceSize=512) {
    b64Data = b64Data.replace(/\s/g, ''); //IE compatibility...
    let byteCharacters = atob(b64Data);
    let byteArrays = [];
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        let slice = byteCharacters.slice(offset, offset + sliceSize);
  
        let byteNumbers = new Array(slice.length);
        for (var i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }
        let byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
    }
    return new Blob(byteArrays, {type: contentType});
  }
}
