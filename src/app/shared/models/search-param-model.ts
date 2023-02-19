import { Operator } from "rxjs";
import { Operators } from "../constants/constanst";
import { BracketType, ColumnType, InputType, SortType } from "../constants/enum-system";
import { SelectItems } from "./miscellaneous";

export class SearchParameter {
  public tableKey?: string;
  public urlPath?: string;
  public searchCondition?: SearchCondition[] = [];
  public paginator?: Paginator = null;
  public refTable?: string = null;
  public branchFilterMode?: string = null;
  public companyBaseGUID?: string;
  public branchBaseGUID?: string;
  public isAscs?: boolean[] = [];
  public sortColumns?: string[] = [];
  public sortTable?: string[] = [];
}
export class SearchCondition {
  public tableName?: string = null;
  public feildName?: string = null;
  public value?: any = null;
  public label?:string = null;
  public inputType:string;
  public options?:SelectItems[] =[]
  public operator?: string = Operators.AND;
  public enumOption?:SelectItems[]
  public hidden?:boolean;
  
}

export class SearchResult<T> {
  public results: T[] = [];
  public paginator: Paginator = null;
}
export class Paginator {
  public page: number;
  public first: number;
  public rows: number;
  public pageCount: number;
  public totalRecord?: number;
}
