import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormControl, Validators } from '@angular/forms';

@Component({
  selector: 'm-rating',
  templateUrl: './m-rating.component.html',
  styleUrls: ['./m-rating.component.scss']
})
export class MRatingComponent implements OnInit {
  val:number=0;
  label:string =''
  model:boolean;
  helpText:string=''
  invalidText:string = ''
  id:string=''
  inputForm =new UntypedFormControl(null,[Validators.required])
  isRequired:boolean = false
  constructor() { }
  @Input()
  set setLabel(label:string){
    this.label = label
  }
  @Input()
  set setModel(model:boolean){
    this.model = model
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

}
