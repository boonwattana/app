import { Component } from "@angular/core";
import { Observable } from "rxjs";
import { FormValidationModel } from "../models/miscellaneous";
import { BaseInterface } from "./base-interface";

@Component({
    template: '',
  })
  export declare abstract class BaseItemInterface implements BaseInterface {
    ngOnInit(): void;
    ngOnDestroy(): void;
    ngAfterViewInit(): void;
    checkPageMode(): void;
    onEnumLoader(): void;
    getById():void;
    onAsyncRunner(model?: any): void;
    setInitialCreatingData(): void;
    onSave(validation: FormValidationModel): void;
  }