import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MButtonComponent } from './m-button/m-button.component';
import {ButtonModule} from 'primeng/button';
import { MCalendarComponent } from './m-calendar/m-calendar.component';
import { MCheckBoxComponent } from './m-check-box/m-check-box.component';
import { MDataTableComponent } from './m-data-table/m-data-table.component';
import { MDataTableComponent2 } from './m-data-table2/m-data-table.component2';
import { MDropdownComponent } from './m-dropdown/m-dropdown.component';
import { MFileUploadComponent } from './m-images-upload/m-images-upload.component';
import { MInputTextComponent } from './m-input-text/m-input-text.component';
import { MInputText13Component } from './m-input-text13/m-input-text13.component';
import { MInputTextAreaComponent } from './m-input-text-area/m-input-text-area.component';
import { MMapComponent } from './m-map/m-map.component';
import { MMultiSelectComponent } from './m-multi-select/m-multi-select.component';
import { MRatingComponent } from './m-rating/m-rating.component';
import { MSwitchComponent } from './m-switch/m-switch.component';
import {CalendarModule} from 'primeng/calendar';
import {CheckboxModule} from 'primeng/checkbox';
import {DropdownModule} from 'primeng/dropdown';
import {EditorModule} from 'primeng/editor';
import {InputSwitchModule} from 'primeng/inputswitch';
import {InputTextModule} from 'primeng/inputtext';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {InputNumberModule} from 'primeng/inputnumber';
import { MInputNumberComponent } from './m-input-number/m-input-number.component';
import {RadioButtonModule} from 'primeng/radiobutton';
import {RatingModule} from 'primeng/rating';
import {GMapModule} from 'primeng/gmap';
import {TableModule} from 'primeng/table';
import {MultiSelectModule} from 'primeng/multiselect';
import {FileUploadModule} from 'primeng/fileupload';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {PaginatorModule} from 'primeng/paginator';
import { PanelMenuModule } from 'primeng/panelmenu';
import {ToggleButtonModule} from 'primeng/togglebutton';
import { MTimeComponent } from './m-time/m-time.component';
import { TranslateModule } from '@ngx-translate/core';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import { MViewOnlyComponent } from './m-view-only/m-view-only.component';
import {CardModule} from 'primeng/card';
import {AccordionModule} from 'primeng/accordion';
import {PasswordModule} from 'primeng/password';
import {ToastModule} from 'primeng/toast';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {ProgressBarModule} from 'primeng/progressbar';
import { MFileDocumentUploadComponent } from './m-file-upload/m-file-upload.component';
import { MInputNumber2OptionComponent } from './m-input-number-2option/m-input-number-2option.component';
import { MInputNumber2OptionTimeComponent } from './m-input-number-2option-time/m-input-number-2option-time.component';
import { MInputNumber4OptionComponent } from './m-input-number-4option/m-input-number-4option.component';
import { MFileUploadMultipleComponent } from './m-images-upload-multiple/m-images-upload-multiple.component';
import { MSwitchFromComponent } from './m-switch-from/m-switch-from.component';
import { MInputNumber5OptionComponent } from './m-input-number-5option/m-input-number-5option.component';
import { MInputNumber3OptionComponent } from './m-input-number-3option/m-input-number-3option.component';
import { MReportComponent } from './m-report/m-report.component';
import { MInputNumber3FilterComponent } from './m-input-number-3filter/m-input-number-3filter.component';
import { MInputNumber2FilterComponent } from './m-input-number-2filter/m-input-number-2filter.component';
import { MReportSComponent } from './m-report-s/m-report-s.component';
import { MReportS2Component } from './m-report-s2/m-report-s2.component';
import { MReportS3Component } from './m-report-s3/m-report-s3.component';
import { MReportS4Component } from './m-report-s4/m-report-s4.component';
import { MDataTableReportComponent } from './m-data-table-report/m-data-table-report.component';
import {DragDropModule} from 'primeng/dragdrop';
import {DialogModule} from 'primeng/dialog';
import { MDataTableCustomComponent } from './m-data-table-custom/m-data-table-custom.component';
import { MSwitchNumberComponent } from './m-switch-number/m-switch-number.component';
import {InputMaskModule} from 'primeng/inputmask';
const SHARED = [ReactiveFormsModule,PaginatorModule,TranslateModule]
const PRIMENG = [InputMaskModule,DragDropModule,DialogModule,ProgressBarModule,ProgressSpinnerModule,ToastModule,PasswordModule,AccordionModule,CardModule,MultiSelectModule,ButtonModule,CalendarModule,CheckboxModule,DropdownModule,EditorModule
,InputSwitchModule,InputTextModule,InputTextareaModule,InputNumberModule,RadioButtonModule,PanelMenuModule
,RatingModule,GMapModule,TableModule,FileUploadModule,ToggleButtonModule,ConfirmDialogModule]
const COMPONENT = [MSwitchNumberComponent,MDataTableCustomComponent,MDataTableReportComponent,MReportS4Component,MReportS3Component,MReportS2Component,MReportSComponent,MInputNumber3FilterComponent,MInputNumber2FilterComponent,MReportComponent,MInputNumber3OptionComponent,MInputNumber5OptionComponent,MInputNumber4OptionComponent,MInputNumber2OptionTimeComponent,MInputNumber2OptionComponent,MFileUploadMultipleComponent,MSwitchFromComponent,MFileDocumentUploadComponent ,MButtonComponent,MCalendarComponent,MCheckBoxComponent,MTimeComponent,
MDataTableComponent,MDropdownComponent,MFileUploadComponent,MInputTextComponent,MInputText13Component,MInputTextAreaComponent,
MMapComponent,MMultiSelectComponent,MRatingComponent,MSwitchComponent
,MInputNumberComponent,MViewOnlyComponent,MDataTableComponent2
]
@NgModule({
  declarations: [...COMPONENT],
  imports: [
    FormsModule,
    CommonModule,
    ...PRIMENG,...SHARED
  ],
  exports:[...COMPONENT,...PRIMENG,...SHARED],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class SharedWidgetModule { }
