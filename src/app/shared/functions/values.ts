import { TranslateService } from "@ngx-translate/core";
import { AppInjector } from "src/app/app-injector";

export function isNullOrNaN(object: any): boolean {
    if (
      object === null ||
      object === undefined ||
      object === NaN ||
      object === 'NaN'
    ) {
      return true;
    } else {
      return false;
    }
  }
  export function isNullOrUndefined(object: any): boolean {
    if (object === null || object === undefined) {
      return true;
    } else {
      return false;
    }
  }
  export function isNullOrUndefOrEmpty(object: any): boolean {
    if (object === null || object === undefined || object === '') {
      return true;
    } else {
      return false;
    }
  }
  export function isEmail(text:string):boolean
  {
      const regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
      return !regexp.test(text)
  }
  export function transformLabel(menuItem: any): any {
    const translate = AppInjector.get(TranslateService);
    return menuItem.map((item) => {
      translate.get(item.label).subscribe(
        (res) => {
          item.label = res;
        },
        (error) => {
        }
      );
      return item;
    });
  }