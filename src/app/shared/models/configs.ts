export class ButtonConfigModel {
    public inputId?: string;
    public className?: string;
    public icon?: string;
    public iconPos?: string;
    public label?: string;
    public disabled?: boolean;
  }
export class InputNumberConfigModel{
  public minDigit:number = 0
  public maxDigit:number = 0
}
export class SelectFieldOption{
  en:string
  th:string
  active:boolean
}