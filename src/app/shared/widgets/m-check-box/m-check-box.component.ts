import { Component, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { BaseWidget } from '../base-widget/base-widget';

@Component({
  selector: 'm-check-box',
  templateUrl: './m-check-box.component.html',
  styleUrls: ['./m-check-box.component.scss']
})
export class MCheckBoxComponent extends BaseWidget implements OnInit {
  label:string =''
  model:boolean = false
  helpText:string=''
  invalidText:string = ''
  isRequired:boolean = false
  constructor( el: ElementRef, renderer:Renderer2){
    super(el,renderer)

}
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
