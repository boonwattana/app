import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'm-view-only',
  templateUrl: './m-view-only.component.html',
  styleUrls: ['./m-view-only.component.scss']
})
export class MViewOnlyComponent implements OnInit {

  constructor() { }
  id:string =''
  label:string =''
  value:string =''
  ngOnInit(): void {
  }
  @Input()
  set setId(param:string){
    this.id = param
  }
  @Input()
    set setLabel(param:string){
      this.label = param
    }
  @Input()
  set setValue(param:any){
    this.value = param
  }
  
}
