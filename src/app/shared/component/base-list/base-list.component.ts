import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OptionModel } from '../../models/miscellaneous';
import { SearchCondition, SearchParameter, SearchResult } from '../../models/search-param-model';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-base-list',
  template: ` <p>base list works!</p> `,
})
export class BaseListComponent<T> extends BaseComponent {
  public option: OptionModel = new OptionModel();
  searchResult: SearchResult<T>;
  searchParam: SearchParameter;
  searchConditions:SearchCondition[] =[]
  canCreate:boolean = true
  cenEdit:boolean = true
  canDelete:boolean = true
  canReportClass:boolean = false
  canReportRoom:boolean = false
  canReportAll:boolean = false
  reportName:string = ''
  public userType:string= '';
  public infoId:string = '';
  constructor( router: Router , route:ActivatedRoute) {
    super(router,route)
    this.displayService.setEditMode()
   }
   public downloadAsPDF(result:any) {
    
    if(!result.error){
      let blob = new Blob([result], { type: 'application/pdf'});
      let url = window.URL.createObjectURL(blob);
      let pwa = window.open(url);
      if (!pwa || pwa.closed || typeof pwa.closed == 'undefined') {
          alert( 'Please disable your Pop-up blocker and try again.');
      }
    }

  }
}
