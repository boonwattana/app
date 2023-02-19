import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { isNullOrUndefined } from '../../functions/values';
import { ButtonConfigModel } from '../../models/configs';

@Component({
  selector: 'm-button',
  templateUrl: './m-button.component.html',
  styleUrls: ['./m-button.component.scss']
})
export class MButtonComponent implements OnInit {

  bindingConfig: ButtonConfigModel;
  bindingLabel: string;
  bindingClassName: string;
  bindingIcon: string;
  bindingDisabled: boolean;
  bindingFunctionMode: boolean = false;
  bindingIconPos: string;
  @Output() onClick = new EventEmitter<any>();
  @Input() set setConfig(param: ButtonConfigModel) {
    this.bindingConfig = isNullOrUndefined(param)
      ? new ButtonConfigModel()
      : param;
    this.bindingClassName =  param.className
    this.bindingIcon = param.icon
    this.bindingIconPos = param.iconPos
    this.bindingLabel = param.label
  }
  @Input() set setLabel(param: string) {
    this.bindingLabel = isNullOrUndefined(param)
      ? this.bindingConfig.label
      : param;
  }

  @Input() set setIcon(param: string) {
    this.bindingIcon = isNullOrUndefined(param)
      ? this.bindingConfig.label
      : param;
  }
  @Input() set setIconPos(param: string) {
    this.bindingIconPos = isNullOrUndefined(param)
      ? this.bindingConfig.iconPos
      : param;
  }
  @Input() set setClassName(param: string) {
    this.bindingClassName = isNullOrUndefined(param)
      ? this.bindingConfig.className
      : param;
  }
  
  constructor() { }

  ngOnInit(): void {
  }
}
