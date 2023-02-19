import { Component } from "@angular/core";
import { RowIdentity } from "../models/miscellaneous";
import { SearchParameter } from "../models/search-param-model";
import { BaseInterface } from "./base-interface";

@Component({
    template: '',
  })
  export declare abstract class BaseListInterface implements BaseInterface {
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    onEnumLoader(): void;
    setDataGridOption(): void;
    setSerachCondtion(): void;
    onCreate(row: RowIdentity): void;
    onView(row: RowIdentity): void;
    onDelete(row: RowIdentity): void;
    onSearch(searchParameter:SearchParameter):void;
  }