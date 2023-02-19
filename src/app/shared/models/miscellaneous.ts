import { Operators } from "../constants/constanst";
import { BracketType, ColumnType, SortType } from "../constants/enum-system";
import { SearchCondition } from "./search-param-model";

export class OptionModel {
    public key: string;
    public columns: ColumnModel[] = [];
    public advanceColumns: ColumnModel[];
    public showPaginator = true;
    public autoSearch?: boolean;
    public isAdvance?: boolean;
    public canCreate?: boolean;
    public canView?: boolean;
    public canDelete?: boolean;
    public exportFileName?: string;
    public searchCondition?:SearchCondition[] = []
  }
  export class ColumnModel {
    public label: string;
    public tableName?: string;
    public fieldName?: string;
    public textKey: string;
    public subTextKey?: string;
    public type: ColumnType;
    public format?: any;
    public visibility: boolean;
    public sorting: SortType = SortType.NONE;
    public masterList?: SelectItems[];
    public parentKey?: string;
    public width?: any ="width:100px";
    public  orentation?:string;
    public operator?: string = Operators.AND;
    public sortingOrder?: number;
    public sortingKey?: string;
    public searchingKey?: string;
    public disabled?: boolean = false;
    public disabledFilter?: boolean = false;
    public order?: number;
    public value?: string = null;
    public values?: any[] = [];
    public equalityOperator?: string = Operators.EQUAL;
    public bracket?: number = BracketType.None;
    public enumOption?:SelectItems[]
  }
  export interface SelectItems {
    label?: string;
    value: any;
    styleClass?: string;
    icon?: string;
    title?: string;
    disabled?: boolean;
    rowData?: any;
  }
  export class RowIdentity {
    public id: number = null;
    public rowIndex?: number;
    public data?:any
  }
  export class FormValidationModel {
    public isValid?: boolean;
    public invalidId?: string[];
  }