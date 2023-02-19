import { Component, ElementRef, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SelectItem } from 'primeng/api';
import { forkJoin } from 'rxjs';
import { SelectItems } from 'src/app/shared/models/miscellaneous';
import { BaseItemComponent } from 'src/app/shared/component/base-item/base-item.component';
import { BaseItemInterface } from 'src/app/shared/interface/base-item-interface';
import { SarItemModel } from '../sar-model';
import { SarService } from '../sar.service';
import { UserDataService } from 'src/app/shared/services/user-data.service';
import { GatewayService } from 'src/app/shared/services/gateway';
@Component({
  selector: 'sar-item',
  templateUrl: './sar-item.component.html',
  styleUrls: ['./sar-item.component.scss']
})
export class SarItemComponent extends BaseItemComponent<SarItemModel>  implements BaseItemInterface {
  constructor(el:ElementRef,renderer:Renderer2,private readonly service:SarService,private userDataService:UserDataService, router: Router , route:ActivatedRoute, private gateway: GatewayService,){
    super(el,renderer,router,route) 
  }
  teacherDropdown:SelectItems[]=[]
  formValidate:boolean =true
  isTeacher = this.userDataService.isTeacher()
  refIdValue = this.router.url.split('/').reverse()[0]
  type = 4
  educationObj=[];
  sarPersonalData=[];
  sarPersonalLeaveDataObj=[];
  sarCoursesYearTermObj=[];
  teachingscheduleTerm1Obj=[];
  teachingscheduleTerm2Obj=[];
  sarCoursesYearTerm2Obj=[];
  sarAnotherSpeacialDutyObj=[];
  sarLearningManagementPlanObj=[];
  sarMediaProductionObj=[];
  sarIntegratedLearningObj=[];
  sarResearchInClassObj=[];
  sarStudentAssignObj=[];
  sarLecturerInviteObj=[];
  sarTeachingFormatObj=[];
  sarTeachingConditionObj=[];
  sarselfdevelopmentObj=[];
  sarinvitedspeakerObj=[];
  sarawardObj=[];
  teachingresultTerm1Obj=[];
  teachingresultTerm2Obj=[];
  sarperformingspecialdutiesObj=[];
  sarstudentestimateteachingObj=[];
  sarselfassessmentObj=[];
  sarqualityoflearnersObj=[];
  sarqualityevidenceStandard1GoodObj=[];
  sarqualityevidenceStandard1BadObj=[];
  sarqualityevidenceStandard2GoodObj=[];
  sarqualityevidenceStandard2BadObj=[];
  sarqualityevidenceStandard3GoodObj=[];
  sarqualityevidenceStandard3BadObj=[];
  sarqualityevidenceStandard4GoodObj=[];
  sarqualityevidenceStandard4BadObj=[];
  sarstandard2Obj=[];
  sarstandard3Obj=[];
  sarstandard4Obj=[];
  sacompetencyassessmentObj=[];
  sarcrudassessmentObj=[];
  educationDropdown :SelectItems[]=[]
  titleDropdown:SelectItems[]=[]
  saractivitiesObj=[];
  saradviseclassObj=[];
  sarcrudassessmentTerm1Obj = [];
  sarcrudassessmentTerm2Obj = [];
  sacompetencyassessmentTerm1Obj = [];
  sacompetencyassessmentTerm2Obj = [];
  saruploadimgObj = [];
  sarorderedpositionObj = [];
  ngOnDestroy(): void {
  }
  printReport(){
    const servicePath = '/sar';
    const url = `${servicePath}/export-to-word`;
    this.gateway.postPdf(url,{
      id:this.getParam(),
    }).subscribe(result=>{
      this.downloadAsPDF(result)
    })
  }
  downloadAsPDF(result: any) {    
    if(!result.error){
      let blob = new Blob([result], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'});
      let url = window.URL.createObjectURL(blob);
      let pwa = window.open(url);
      if (!pwa || pwa.closed || typeof pwa.closed == 'undefined') {
          alert( 'Please disable your Pop-up blocker and try again.');
      }
    }
  }
  ngAfterViewInit(): void {
    if(this.refIdValue.split('-')[2] !== undefined){
      if(this.refIdValue.split('-')[2] == 'create'){
        this.isUpdateMode =false
      }     
    }
  
    if(this.isUpdateMode){
      this.getById()
    }else{
      this.setInitialCreatingData()
    }
      this.onAsyncRunner();
  }

  onEnumLoader(): void {
    this.titleDropdown = this.dropdownService.getTeacherTitleDropdown()
    this.educationDropdown = this.dropdownService.getEducationDropdown()

  }
  filterEnum(model:any,array:any){
    let label = array.filter((element:any)=>{
     return element.value === model
   })
   return label[0]?.label
 }
  getById(): void{
    this.service.getItem(this.id).subscribe(result=>{      



      this.model = result.teacherObj;
      /*sardata*/
 
      this.model.sarCoursesYearTermToTalSubject= result.item.sarCoursesYearTermToTalSubject
  
      this.model.sarCoursesYearTermToTalActivities= result.item.sarCoursesYearTermToTalActivities
      
      this.model.sarCoursesYearTermToTalHour= result.item.sarCoursesYearTermToTalHour
      
      this.model.sarCoursesYearTerm2ToTalSubject= result.item.sarCoursesYearTerm2ToTalSubject
      
      this.model.sarCoursesYearTerm2ToTalActivities= result.item.sarCoursesYearTerm2ToTalActivities
      
      this.model.sarCoursesYearTerm2ToTalHour= result.item.sarCoursesYearTerm2ToTalHour
      
      this.model.sarselfdevelopmentToTalTimes= result.item.sarselfdevelopmentToTalTimes
      
      this.model.sarselfdevelopmentToTaldays= result.item.sarselfdevelopmentToTaldays
      
      this.model.sarselfdevelopmentToTalHour= result.item.sarselfdevelopmentToTalHour
      
      this.model.sarselfdevelopmentToTalTimes2= result.item.sarselfdevelopmentToTalTimes2
      
      this.model.sacompetencyassessmentresult = result.item.sacompetencyassessmentresult
      
      this.model.sarcrudassessmentresult = result.item.sarcrudassessmentresult 
      
      this.model.sarattributeassessmentresult = result.item.sarattributeassessmentresults


      this.model.sarPersonalLeaveschoolYearValue = result.item.sarPersonalLeaveschoolYearValue
      this.model.sarqualityoflearnersNote = result.item.sarqualityoflearnersNote
      this.model.sarstandard2Note = result.item.sarstandard2Note
      this.model.sarstandard3Note = result.item.sarstandard3Note
      this.model.SelfAssessment1_1 = result.item.SelfAssessment1_1
      this.model.SelfAssessment1_2 = result.item.SelfAssessment1_2
      this.model.SelfAssessment1_3 = result.item.SelfAssessment1_3
      this.model.SelfAssessment2_1 = result.item.SelfAssessment2_1
      this.model.SelfAssessment2_2 = result.item.SelfAssessment2_2
      this.model.SelfAssessment2_3 = result.item.SelfAssessment2_3
      this.model.SelfAssessment3_1 = result.item.SelfAssessment3_1
      this.model.SelfAssessment3_2 = result.item.SelfAssessment3_2
      this.model.SelfAssessment3_3 = result.item.SelfAssessment3_3
      this.model.SelfAssessment4_1 = result.item.SelfAssessment4_1
      this.model.SelfAssessment4_2 = result.item.SelfAssessment4_2
      this.model.SelfAssessment4_3 = result.item.SelfAssessment4_3
      
      this.educationObj = result.educationObj;
      if(result.sarPersonalData!==undefined){
        this.sarPersonalData=result.sarPersonalData
      this.model.salary=result.sarPersonalData.salary;
      this.model.practitionerMoney=result.sarPersonalData.practitionerMoney
      this.model.positionNumber=result.sarPersonalData.positionNumber
      this.model.affiliation=result.sarPersonalData.affiliation
      }
         //cal ผลรวมวันลา
var sum_sickLeaveTimes =0;
var sum_sickLeaveDays =0;
var sum_businessLeaveTimes =0;
var sum_businessLeaveDays =0;
var sum_ordinationLeaveTimes =0;
var sum_ordinationLeaveDays =0;
var sum_deliverLeaveTimes =0;
var sum_deliverLeaveDays =0;
var sum_lateTimes =0;
var sum_lateLeaveDays =0;
var total_times=0;
var total_days=0;
      if(result.sarPersonalLeaveData.length!=0){
       this.sarPersonalLeaveDataObj = result.sarPersonalLeaveData
      if(this.sarPersonalLeaveDataObj.length >0){
        for(var i=0;i<this.sarPersonalLeaveDataObj.length; i++){
          sum_sickLeaveTimes += this.sarPersonalLeaveDataObj[i].sickLeaveTimes;
      sum_sickLeaveDays += this.sarPersonalLeaveDataObj[i].sickLeaveDays;
      sum_businessLeaveTimes +=  this.sarPersonalLeaveDataObj[i].businessLeaveTimes;
      sum_businessLeaveDays +=  this.sarPersonalLeaveDataObj[i].businessLeaveDays;
      sum_ordinationLeaveTimes +=  this.sarPersonalLeaveDataObj[i].ordinationLeaveTimes;
      sum_ordinationLeaveDays +=  this.sarPersonalLeaveDataObj[i].ordinationLeaveDays;
      sum_deliverLeaveTimes +=  this.sarPersonalLeaveDataObj[i].deliverLeaveTimes;
      sum_deliverLeaveDays +=  this.sarPersonalLeaveDataObj[i].deliverLeaveDays;
      sum_lateTimes +=  this.sarPersonalLeaveDataObj[i].lateTimes;
      sum_lateLeaveDays +=  this.sarPersonalLeaveDataObj[i].lateLeaveDays;
     
         }
         total_times+= sum_sickLeaveTimes+sum_businessLeaveTimes+sum_ordinationLeaveTimes+sum_deliverLeaveTimes +sum_lateTimes;
         total_days+= sum_sickLeaveDays+sum_businessLeaveDays+sum_ordinationLeaveDays+sum_deliverLeaveDays+sum_lateLeaveDays;
      
     }   
      }
      this.model.sum_sickLeaveTimes=  sum_sickLeaveTimes
      this.model.sum_sickLeaveDays=  sum_sickLeaveDays
      this.model.sum_businessLeaveTimes=  sum_businessLeaveTimes
      this.model.sum_businessLeaveDays=  sum_businessLeaveDays
      this.model.sum_ordinationLeaveTimes=  sum_ordinationLeaveTimes
      this.model.sum_ordinationLeaveDays=  sum_ordinationLeaveDays
      this.model.sum_deliverLeaveTimes=  sum_deliverLeaveTimes
      this.model.sum_deliverLeaveDays=  sum_deliverLeaveDays
      this.model.sum_lateTimes=  sum_lateTimes
      this.model.sum_lateLeaveDays=  sum_lateLeaveDays
      this.model.total_times=  total_times
      this.model.total_days=  total_days
      var _sarCoursesYearTermSumHour =0
      var _sarCoursesYearTermSumTotalRoom=0
      if(result.sarCoursesYearTerm.length!==0){
        this.sarCoursesYearTermObj =  result.sarCoursesYearTerm;
       // this.model.sarCoursesYearTermTitle ='ภาคเรียนที่ '+ result.sarCoursesYearTerm[0].term+' ปีการศึกษา '+ result.sarCoursesYearTerm[0].schoolYear;
        if(this.sarCoursesYearTermObj.length >0){
          for(var i=0;i<this.sarCoursesYearTermObj.length; i++){

            var totalroom_for_cal =1
            if(this.sarCoursesYearTermObj[i].totalRoom>0){
              totalroom_for_cal =this.sarCoursesYearTermObj[i].totalRoom;
            }
            
            _sarCoursesYearTermSumHour+=(this.sarCoursesYearTermObj[i].hourPerWeek*totalroom_for_cal);
            _sarCoursesYearTermSumTotalRoom+=this.sarCoursesYearTermObj[i].totalRoom;
          }
        }
      }
      this.model.sarCoursesYearTermSumHour=_sarCoursesYearTermSumHour;
      this.model.sarCoursesYearTermSumTotalRoom=_sarCoursesYearTermSumTotalRoom;
      
      if(result.teachingscheduleTerm1!==undefined){
        this.teachingscheduleTerm1Obj = result.teachingscheduleTerm1
        this.model.teachingscheduleTerm1Model= result.teachingscheduleTerm1
      }

      var _sarCoursesYearTerm2SumHour =0
      var _sarCoursesYearTerm2TotalRoom =0
      if(result.sarCoursesYearTerm2.length!==0){
     this.sarCoursesYearTerm2Obj =  result.sarCoursesYearTerm2;
    //  this.model.sarCoursesYearTerm2Title ='ภาคเรียนที่ '+ result.sarCoursesYearTerm2[0].term+' ปีการศึกษา '+ result.sarCoursesYearTerm2[0].schoolYear;
      if(this.sarCoursesYearTerm2Obj.length >0){
        for(var i=0;i<this.sarCoursesYearTerm2Obj.length; i++){
          var totalroom_for_cal =1
          if(this.sarCoursesYearTerm2Obj[i].totalRoom>0){
            totalroom_for_cal =this.sarCoursesYearTerm2Obj[i].totalRoom;
          }
          _sarCoursesYearTerm2SumHour+= (this.sarCoursesYearTerm2Obj[i].hourPerWeek*totalroom_for_cal);
          _sarCoursesYearTerm2TotalRoom+=this.sarCoursesYearTerm2Obj[i].totalRoom;
        }
      }
    }
      this.model.sarCoursesYearTerm2SumHour=_sarCoursesYearTerm2SumHour ;
      this.model.sarCoursesYearTerm2TotalRoom=_sarCoursesYearTerm2TotalRoom;
      if(result.teachingscheduleTerm2!==undefined){
      this.teachingscheduleTerm2Obj = result.teachingscheduleTerm2
     this.model.teachingscheduleTerm2Model= result.teachingscheduleTerm2
    }
    if(result.sarAnotherSpeacialDuty.length!==0){
      this.sarAnotherSpeacialDutyObj= result.sarAnotherSpeacialDuty
      //this.model.sarAnotherSpeacialDutyTitle =  result.sarAnotherSpeacialDuty[0].schoolyear
    }
    if(result.sarLearningManagementPlan.length!==0){
     this.sarLearningManagementPlanObj =  result.sarLearningManagementPlan}

     var _sarMediaProductionTotal =0
     if(result.sarMediaProduction.length!==0){
     this.sarMediaProductionObj =  result.sarMediaProduction
     if(this.sarMediaProductionObj.length >0){
      for(var i=0;i<this.sarMediaProductionObj.length; i++){
        _sarMediaProductionTotal+=this.sarMediaProductionObj[i].mediaProductionCount;
      }
    }
    }
     this.model.sarMediaProductionTotal =_sarMediaProductionTotal

     if(result.sarIntegratedLearning.length!==0){
     this.sarIntegratedLearningObj = result.sarIntegratedLearning
    }

    var _sarResearchInClassTotal =0;
     if(result.sarResearchInClass.length!==0){
     this.sarResearchInClassObj = result.sarResearchInClass
     _sarResearchInClassTotal =result.sarResearchInClass.length;
    }

    this.model.sarResearchInClassTotal=_sarResearchInClassTotal

     if(result.sarStudentAssign.length!==0){
      this.sarStudentAssignObj = result.sarStudentAssign}
      if(result.sarLecturerInvite.length!==0){
      this.sarLecturerInviteObj = result.sarLecturerInvite}

      var _sarTeachingFormatTotal=0;
      if(result.sarTeachingFormat!==undefined){
      this.sarTeachingFormatObj = result.sarTeachingFormat
      this.model.sarTeachingFormatModel = result.sarTeachingFormat
      if(  this.model.sarTeachingFormatModel.teachingFormat1== true){
        _sarTeachingFormatTotal+=1
       }
      if(  this.model.sarTeachingFormatModel.teachingFormat2== true){
  _sarTeachingFormatTotal+=1
 }
 if(  this.model.sarTeachingFormatModel.teachingFormat3== true){
  _sarTeachingFormatTotal+=1
 }
 if(  this.model.sarTeachingFormatModel.teachingFormat4== true){
   _sarTeachingFormatTotal+=1
 }
 if(  this.model.sarTeachingFormatModel.teachingFormat5== true){
   _sarTeachingFormatTotal+=1
 }
 if(  this.model.sarTeachingFormatModel.teachingFormat6== true){
   _sarTeachingFormatTotal+=1
 }
 if(  this.model.sarTeachingFormatModel.teachingFormat7== true){
   _sarTeachingFormatTotal+=1
 }
 if(  this.model.sarTeachingFormatModel.teachingFormat8== true){
   _sarTeachingFormatTotal+=1
 }
 if(  this.model.sarTeachingFormatModel.teachingFormat9== true){
   _sarTeachingFormatTotal+=1
 }
 if(  this.model.sarTeachingFormatModel.teachingFormat10== true){
   _sarTeachingFormatTotal+=1
 }
 if(  this.model.sarTeachingFormatModel.teachingFormat11== true){
   _sarTeachingFormatTotal+=1
 }
 if(  this.model.sarTeachingFormatModel.teachingFormat12== true){
   _sarTeachingFormatTotal+=1
 }
 if(  this.model.sarTeachingFormatModel.teachingFormat13== true){
   _sarTeachingFormatTotal+=1
 }
 if(  this.model.sarTeachingFormatModel.teachingFormat14== true){
   _sarTeachingFormatTotal+=1
 }
 if(  this.model.sarTeachingFormatModel.teachingFormat15== true){
   _sarTeachingFormatTotal+=1
 }

 if(  this.model.sarTeachingFormatModel.teachingFormat17== true){
  _sarTeachingFormatTotal+=1
}
 if(  this.model.sarTeachingFormatModel.teachingFormat18== true){
   _sarTeachingFormatTotal+=1
 }
 if(  this.model.sarTeachingFormatModel.teachingFormat19== true){
   _sarTeachingFormatTotal+=1
 }
 if(  this.model.sarTeachingFormatModel.teachingFormat20== true){
   _sarTeachingFormatTotal+=1
 }
 if(  this.model.sarTeachingFormatModel.teachingFormat21== true){
   _sarTeachingFormatTotal+=1
 }
 if(  this.model.sarTeachingFormatModel.teachingFormat22== true){
   _sarTeachingFormatTotal+=1
 }
 if(  this.model.sarTeachingFormatModel.teachingFormat23== true){
   _sarTeachingFormatTotal+=1
 }
 if(  this.model.sarTeachingFormatModel.teachingFormat24== true){
   _sarTeachingFormatTotal+=1
 }
 if(  this.model.sarTeachingFormatModel.teachingFormat25== true){
   _sarTeachingFormatTotal+=1
 }
 if(  this.model.sarTeachingFormatModel.teachingFormat26== true){
   _sarTeachingFormatTotal+=1
 }
 
 if(  this.model.sarTeachingFormatModel.teachingFormatOther== true){
   _sarTeachingFormatTotal+=1
 }
}
      this.model.sarTeachingFormatTotal =_sarTeachingFormatTotal;

     if(result.sarTeachingCondition!==undefined){
      this.sarTeachingConditionObj = result.sarTeachingCondition
      this.model.sarTeachingConditionModel = result.sarTeachingCondition
    }
    if(result.sarselfdevelopment.length!==0){
      this.sarselfdevelopmentObj = result.sarselfdevelopment
    }
    if(result.saraward.length!==0){
      this.sarawardObj = result.saraward
    }
    if(result.sarinvitedspeaker.length!==0){
      this.sarinvitedspeakerObj = result.sarinvitedspeaker
    }

    //รวมเทอม 1
var _teachingresulttotalStudent_01=0;
var _teachingresultresultGrad2_01=0;
var _teachingresultresultGrad1_01=0;
var _teachingresultresultGrad3_01=0;
var _teachingresultresultGrad4_01=0;
var _teachingresultresultGrad5_01=0;
var _teachingresultresultGrad6_01=0;
var _teachingresultresultGrad7_01=0;
var _teachingresultresultGrad8_01=0;
var _teachingresultresultGrad9_01=0;
var _teachingresultresultGrad10_01=0;
var _teachingresulttotalResultGrad_01=0;
//รวม เทอม2
var _teachingresulttotalStudent_02=0;
var _teachingresultresultGrad2_02=0;
var _teachingresultresultGrad1_02=0;
var _teachingresultresultGrad3_02=0;
var _teachingresultresultGrad4_02=0;
var _teachingresultresultGrad5_02=0;
var _teachingresultresultGrad6_02=0;
var _teachingresultresultGrad7_02=0;
var _teachingresultresultGrad8_02=0;
var _teachingresultresultGrad9_02=0;
var _teachingresultresultGrad10_02=0;
var _teachingresulttotalResultGrad_02=0;


//รวาม2เทอม
    var _teachingresulttotalStudent=0;
    var _teachingresultresultGrad2=0;
    var _teachingresultresultGrad1=0;
    var _teachingresultresultGrad3=0;
    var _teachingresultresultGrad4=0;
    var _teachingresultresultGrad5=0;
    var _teachingresultresultGrad6=0;
    var _teachingresultresultGrad7=0;
    var _teachingresultresultGrad8=0;
    var _teachingresultresultGrad9=0;
    var _teachingresultresultGrad10=0;
    var _teachingresulttotalResultGrad=0;
    var _teachingresulttotalMoreGrad3=0;
    var _teachingresulttotalMoreGrad2=0;


    if(result.teachingresultTerm1.length!==0){
      this.teachingresultTerm1Obj= result.teachingresultTerm1
      if(this.teachingresultTerm1Obj.length >0){
        for(var i=0;i<this.teachingresultTerm1Obj.length; i++){
          //เทอม1
_teachingresulttotalStudent_01+=this.teachingresultTerm1Obj[i].totalStudent;
_teachingresultresultGrad2_01+=this.teachingresultTerm1Obj[i].resultGrad2;
_teachingresultresultGrad1_01+=this.teachingresultTerm1Obj[i].resultGrad1;
_teachingresultresultGrad3_01+=this.teachingresultTerm1Obj[i].resultGrad3;
_teachingresultresultGrad4_01+=this.teachingresultTerm1Obj[i].resultGrad4;
_teachingresultresultGrad5_01+=this.teachingresultTerm1Obj[i].resultGrad5;
_teachingresultresultGrad6_01+=this.teachingresultTerm1Obj[i].resultGrad6;
_teachingresultresultGrad7_01+=this.teachingresultTerm1Obj[i].resultGrad7;
_teachingresultresultGrad8_01+=this.teachingresultTerm1Obj[i].resultGrad8;
_teachingresultresultGrad9_01+=this.teachingresultTerm1Obj[i].resultGrad9;
_teachingresultresultGrad10_01+=this.teachingresultTerm1Obj[i].resultGrad10;
_teachingresulttotalResultGrad_01+=this.teachingresultTerm1Obj[i].totalResultGrad;
//
          _teachingresulttotalStudent+=this.teachingresultTerm1Obj[i].totalStudent;
           _teachingresultresultGrad2+=this.teachingresultTerm1Obj[i].resultGrad2;
           _teachingresultresultGrad1+=this.teachingresultTerm1Obj[i].resultGrad1;
           _teachingresultresultGrad3+=this.teachingresultTerm1Obj[i].resultGrad3;
           _teachingresultresultGrad4+=this.teachingresultTerm1Obj[i].resultGrad4;
           _teachingresultresultGrad5+=this.teachingresultTerm1Obj[i].resultGrad5;
           _teachingresultresultGrad6+=this.teachingresultTerm1Obj[i].resultGrad6;
           _teachingresultresultGrad7+=this.teachingresultTerm1Obj[i].resultGrad7;
           _teachingresultresultGrad8+=this.teachingresultTerm1Obj[i].resultGrad8;
           _teachingresultresultGrad9+=this.teachingresultTerm1Obj[i].resultGrad9;
           _teachingresultresultGrad10+=this.teachingresultTerm1Obj[i].resultGrad10;
           _teachingresulttotalResultGrad+=this.teachingresultTerm1Obj[i].totalResultGrad;

           _teachingresulttotalMoreGrad2+=(this.teachingresultTerm1Obj[i].resultGrad6+this.teachingresultTerm1Obj[i].resultGrad7+this.teachingresultTerm1Obj[i].resultGrad8+this.teachingresultTerm1Obj[i].resultGrad9+this.teachingresultTerm1Obj[i].resultGrad10)
           _teachingresulttotalMoreGrad3+=(this.teachingresultTerm1Obj[i].resultGrad8+this.teachingresultTerm1Obj[i].resultGrad9+this.teachingresultTerm1Obj[i].resultGrad10)
          }
      }  
    }
    if(result.teachingresultTerm2.length!==0){
      this.teachingresultTerm2Obj= result.teachingresultTerm2
      if(this.teachingresultTerm2Obj.length >0){
        for(var i=0;i<this.teachingresultTerm2Obj.length; i++){
                    //เทอม2
_teachingresulttotalStudent_02+=this.teachingresultTerm2Obj[i].totalStudent;
_teachingresultresultGrad2_02+=this.teachingresultTerm2Obj[i].resultGrad2;
_teachingresultresultGrad1_02+=this.teachingresultTerm2Obj[i].resultGrad1;
_teachingresultresultGrad3_02+=this.teachingresultTerm2Obj[i].resultGrad3;
_teachingresultresultGrad4_02+=this.teachingresultTerm2Obj[i].resultGrad4;
_teachingresultresultGrad5_02+=this.teachingresultTerm2Obj[i].resultGrad5;
_teachingresultresultGrad6_02+=this.teachingresultTerm2Obj[i].resultGrad6;
_teachingresultresultGrad7_02+=this.teachingresultTerm2Obj[i].resultGrad7;
_teachingresultresultGrad8_02+=this.teachingresultTerm2Obj[i].resultGrad8;
_teachingresultresultGrad9_02+=this.teachingresultTerm2Obj[i].resultGrad9;
_teachingresultresultGrad10_02+=this.teachingresultTerm2Obj[i].resultGrad10;
_teachingresulttotalResultGrad_02+=this.teachingresultTerm2Obj[i].totalResultGrad;
//
          _teachingresulttotalStudent+=this.teachingresultTerm2Obj[i].totalStudent;
          _teachingresultresultGrad2+=this.teachingresultTerm2Obj[i].resultGrad2;
          _teachingresultresultGrad1+=this.teachingresultTerm2Obj[i].resultGrad1;
          _teachingresultresultGrad3+=this.teachingresultTerm2Obj[i].resultGrad3;
          _teachingresultresultGrad4+=this.teachingresultTerm2Obj[i].resultGrad4;
          _teachingresultresultGrad5+=this.teachingresultTerm2Obj[i].resultGrad5;
          _teachingresultresultGrad6+=this.teachingresultTerm2Obj[i].resultGrad6;
          _teachingresultresultGrad7+=this.teachingresultTerm2Obj[i].resultGrad7;
          _teachingresultresultGrad8+=this.teachingresultTerm2Obj[i].resultGrad8;
          _teachingresultresultGrad9+=this.teachingresultTerm2Obj[i].resultGrad9;
          _teachingresultresultGrad10+=this.teachingresultTerm2Obj[i].resultGrad10;
          _teachingresulttotalResultGrad+=this.teachingresultTerm2Obj[i].totalResultGrad;
          _teachingresulttotalMoreGrad2+=(this.teachingresultTerm2Obj[i].resultGrad6+this.teachingresultTerm2Obj[i].resultGrad7+this.teachingresultTerm2Obj[i].resultGrad8+this.teachingresultTerm2Obj[i].resultGrad9+this.teachingresultTerm2Obj[i].resultGrad10)
          _teachingresulttotalMoreGrad3+=(this.teachingresultTerm2Obj[i].resultGrad8+this.teachingresultTerm2Obj[i].resultGrad9+this.teachingresultTerm2Obj[i].resultGrad10)
    
        }
      }
    }
//1
this.model.teachingresulttotalStudent_01 =_teachingresulttotalStudent_01
this.model.teachingresultresultGrad2_01 =_teachingresultresultGrad2_01 
this.model.teachingresultresultGrad1_01 =_teachingresultresultGrad1_01 
this.model.teachingresultresultGrad3_01 =_teachingresultresultGrad3_01 
this.model.teachingresultresultGrad4_01 =_teachingresultresultGrad4_01 
this.model.teachingresultresultGrad5_01 =_teachingresultresultGrad5_01 
this.model.teachingresultresultGrad6_01 =_teachingresultresultGrad6_01 
this.model.teachingresultresultGrad7_01 =_teachingresultresultGrad7_01 
this.model.teachingresultresultGrad8_01 =_teachingresultresultGrad8_01 
this.model.teachingresultresultGrad9_01 =_teachingresultresultGrad9_01 
this.model.teachingresultresultGrad10_01 =_teachingresultresultGrad10_01 
this.model.teachingresulttotalResultGrad_01 =_teachingresulttotalResultGrad_01 

//2
this.model.teachingresulttotalStudent_02 =_teachingresulttotalStudent_02
this.model.teachingresultresultGrad2_02 =_teachingresultresultGrad2_02 
this.model.teachingresultresultGrad1_02 =_teachingresultresultGrad1_02 
this.model.teachingresultresultGrad3_02 =_teachingresultresultGrad3_02 
this.model.teachingresultresultGrad4_02 =_teachingresultresultGrad4_02 
this.model.teachingresultresultGrad5_02 =_teachingresultresultGrad5_02 
this.model.teachingresultresultGrad6_02 =_teachingresultresultGrad6_02 
this.model.teachingresultresultGrad7_02 =_teachingresultresultGrad7_02 
this.model.teachingresultresultGrad8_02 =_teachingresultresultGrad8_02 
this.model.teachingresultresultGrad9_02 =_teachingresultresultGrad9_02 
this.model.teachingresultresultGrad10_02 =_teachingresultresultGrad10_02 
this.model.teachingresulttotalResultGrad_02 =_teachingresulttotalResultGrad_02 
    this.model.teachingresulttotalStudent =_teachingresulttotalStudent
    this.model.teachingresultresultGrad2 =_teachingresultresultGrad2 
    this.model.teachingresultresultGrad1 =_teachingresultresultGrad1 
    this.model.teachingresultresultGrad3 =_teachingresultresultGrad3 
    this.model.teachingresultresultGrad4 =_teachingresultresultGrad4 
    this.model.teachingresultresultGrad5 =_teachingresultresultGrad5 
    this.model.teachingresultresultGrad6 =_teachingresultresultGrad6 
    this.model.teachingresultresultGrad7 =_teachingresultresultGrad7 
    this.model.teachingresultresultGrad8 =_teachingresultresultGrad8 
    this.model.teachingresultresultGrad9 =_teachingresultresultGrad9 
    this.model.teachingresultresultGrad10 =_teachingresultresultGrad10 
    this.model.teachingresulttotalResultGrad =_teachingresulttotalResultGrad 

    this.model.teachingresultresultGrad2Persent =  ((_teachingresultresultGrad2/_teachingresulttotalStudent )*100).toFixed(2);
    this.model.teachingresultresultGrad1Persent = ((_teachingresultresultGrad1  /_teachingresulttotalStudent )*100).toFixed(2);
    this.model.teachingresultresultGrad3Persent =((_teachingresultresultGrad3/_teachingresulttotalStudent )*100 ).toFixed(2);
    this.model.teachingresultresultGrad4Persent =((_teachingresultresultGrad4/_teachingresulttotalStudent )*100 ).toFixed(2);
    this.model.teachingresultresultGrad5Persent =((_teachingresultresultGrad5/_teachingresulttotalStudent )*100 ).toFixed(2);
    this.model.teachingresultresultGrad6Persent =((_teachingresultresultGrad6/_teachingresulttotalStudent )*100 ).toFixed(2);
    this.model.teachingresultresultGrad7Persent =((_teachingresultresultGrad7/_teachingresulttotalStudent )*100).toFixed(2);
    this.model.teachingresultresultGrad8Persent =((_teachingresultresultGrad8/_teachingresulttotalStudent )*100).toFixed(2);
    this.model.teachingresultresultGrad9Persent =((_teachingresultresultGrad9/_teachingresulttotalStudent )*100 ).toFixed(2);
    this.model.teachingresultresultGrad10Persent =((_teachingresultresultGrad10/_teachingresulttotalStudent )*100).toFixed(2);
    this.model.teachingresulttotalResultGradPersent =((_teachingresulttotalResultGrad/_teachingresulttotalStudent )*100).toFixed(2);
    this.model.teachingresulttotalMoreGrad3 =_teachingresulttotalMoreGrad3
    this.model.teachingresulttotalMoreGrad2 =_teachingresulttotalMoreGrad2
    this.model.teachingresulttotalMoreGrad3Persent =((_teachingresulttotalMoreGrad3/_teachingresulttotalStudent )*100).toFixed(2);
    this.model.teachingresulttotalMoreGrad2Persent =((_teachingresulttotalMoreGrad2/_teachingresulttotalStudent )*100).toFixed(2);

    if(result.sarperformingspecialduties!==undefined){
      this.sarperformingspecialdutiesObj = result.sarperformingspecialduties
      this.model.sarperformingspecialdutiesModel= result.sarperformingspecialduties
    }
    if(result.sarstudentestimateteaching!==undefined){
      this.sarstudentestimateteachingObj= result.sarstudentestimateteaching
      this.model.sarstudentestimateteachingModel= result.sarstudentestimateteaching
    }
    if(result.sarselfassessment!==undefined){
      this.sarselfassessmentObj= result.sarselfassessment
      this.model.sarselfassessmentModel= result.sarselfassessment
    }
    var _sarqualityoflearners_total_P5=0;
    var _sarqualityoflearners_total_P4=0;
    var _sarqualityoflearners_total_P3=0;
    var _sarqualityoflearners_total_P2=0;
    var _sarqualityoflearners_total_P1=0;
    if(result.sarqualityoflearners!==undefined){
      this.sarqualityoflearnersObj= result.sarqualityoflearners
      this.model.sarqualityoflearnersModel= result.sarqualityoflearners
      if(this.model.sarqualityoflearnersModel.choice1 == 5 ){
        _sarqualityoflearners_total_P5+=5;
      }
      if(this.model.sarqualityoflearnersModel.choice1 == 4 ){
        _sarqualityoflearners_total_P4+=4;
      }
      if(this.model.sarqualityoflearnersModel.choice1 == 3 ){
        _sarqualityoflearners_total_P3+=3;
      }
      if(this.model.sarqualityoflearnersModel.choice1 == 2 ){
        _sarqualityoflearners_total_P2+=2;
      }
      if(this.model.sarqualityoflearnersModel.choice1 == 1 ){
        _sarqualityoflearners_total_P1+=1;
      }
      if(this.model.sarqualityoflearnersModel.choice2 == 5 ){
        _sarqualityoflearners_total_P5+=5;
      }
      if(this.model.sarqualityoflearnersModel.choice2 == 4 ){
        _sarqualityoflearners_total_P4+=4;
      }
      if(this.model.sarqualityoflearnersModel.choice2 == 3 ){
        _sarqualityoflearners_total_P3+=3;
      }
      if(this.model.sarqualityoflearnersModel.choice2 == 2 ){
        _sarqualityoflearners_total_P2+=2;
      }
      if(this.model.sarqualityoflearnersModel.choice2 == 1 ){
        _sarqualityoflearners_total_P1+=1;
      }
      if(this.model.sarqualityoflearnersModel.choice3 == 5 ){
        _sarqualityoflearners_total_P5+=5;
      }
      if(this.model.sarqualityoflearnersModel.choice3 == 4 ){
        _sarqualityoflearners_total_P4+=4;
      }
      if(this.model.sarqualityoflearnersModel.choice3 == 3 ){
        _sarqualityoflearners_total_P3+=3;
      }
      if(this.model.sarqualityoflearnersModel.choice3 == 2 ){
        _sarqualityoflearners_total_P2+=2;
      }
      if(this.model.sarqualityoflearnersModel.choice3 == 1 ){
        _sarqualityoflearners_total_P1+=1;
      }
      if(this.model.sarqualityoflearnersModel.choice4 == 5 ){
        _sarqualityoflearners_total_P5+=5;
      }
      if(this.model.sarqualityoflearnersModel.choice4 == 4 ){
        _sarqualityoflearners_total_P4+=4;
      }
      if(this.model.sarqualityoflearnersModel.choice4 == 3 ){
        _sarqualityoflearners_total_P3+=3;
      }
      if(this.model.sarqualityoflearnersModel.choice4 == 2 ){
        _sarqualityoflearners_total_P2+=2;
      }
      if(this.model.sarqualityoflearnersModel.choice4 == 1 ){
        _sarqualityoflearners_total_P1+=1;
      }
      if(this.model.sarqualityoflearnersModel.choice5 == 5 ){
        _sarqualityoflearners_total_P5+=5;
      }
      if(this.model.sarqualityoflearnersModel.choice5 == 4 ){
        _sarqualityoflearners_total_P4+=4;
      }
      if(this.model.sarqualityoflearnersModel.choice5 == 3 ){
        _sarqualityoflearners_total_P3+=3;
      }
      if(this.model.sarqualityoflearnersModel.choice5 == 2 ){
        _sarqualityoflearners_total_P2+=2;
      }
      if(this.model.sarqualityoflearnersModel.choice5 == 1 ){
        _sarqualityoflearners_total_P1+=1;
      }
      if(this.model.sarqualityoflearnersModel.choice6 == 5 ){
        _sarqualityoflearners_total_P5+=5;
      }
      if(this.model.sarqualityoflearnersModel.choice6 == 4 ){
        _sarqualityoflearners_total_P4+=4;
      }
      if(this.model.sarqualityoflearnersModel.choice6 == 3 ){
        _sarqualityoflearners_total_P3+=3;
      }
      if(this.model.sarqualityoflearnersModel.choice6 == 2 ){
        _sarqualityoflearners_total_P2+=2;
      }
      if(this.model.sarqualityoflearnersModel.choice6 == 1 ){
        _sarqualityoflearners_total_P1+=1;
      }
      if(this.model.sarqualityoflearnersModel.choice7 == 5 ){
        _sarqualityoflearners_total_P5+=5;
      }
      if(this.model.sarqualityoflearnersModel.choice7 == 4 ){
        _sarqualityoflearners_total_P4+=4;
      }
      if(this.model.sarqualityoflearnersModel.choice7 == 3 ){
        _sarqualityoflearners_total_P3+=3;
      }
      if(this.model.sarqualityoflearnersModel.choice7 == 2 ){
        _sarqualityoflearners_total_P2+=2;
      }
      if(this.model.sarqualityoflearnersModel.choice7 == 1 ){
        _sarqualityoflearners_total_P1+=1;
      }
      if(this.model.sarqualityoflearnersModel.choice8 == 5 ){
        _sarqualityoflearners_total_P5+=5;
      }
      if(this.model.sarqualityoflearnersModel.choice8 == 4 ){
        _sarqualityoflearners_total_P4+=4;
      }
      if(this.model.sarqualityoflearnersModel.choice8 == 3 ){
        _sarqualityoflearners_total_P3+=3;
      }
      if(this.model.sarqualityoflearnersModel.choice8 == 2 ){
        _sarqualityoflearners_total_P2+=2;
      }
      if(this.model.sarqualityoflearnersModel.choice8 == 1 ){
        _sarqualityoflearners_total_P1+=1;
      }
      if(this.model.sarqualityoflearnersModel.choice9 == 5 ){
        _sarqualityoflearners_total_P5+=5;
      }
      if(this.model.sarqualityoflearnersModel.choice9 == 4 ){
        _sarqualityoflearners_total_P4+=4;
      }
      if(this.model.sarqualityoflearnersModel.choice9 == 3 ){
        _sarqualityoflearners_total_P3+=3;
      }
      if(this.model.sarqualityoflearnersModel.choice9 == 2 ){
        _sarqualityoflearners_total_P2+=2;
      }
      if(this.model.sarqualityoflearnersModel.choice9 == 1 ){
        _sarqualityoflearners_total_P1+=1;
      }
      if(this.model.sarqualityoflearnersModel.choice10 == 5 ){
        _sarqualityoflearners_total_P5+=5;
      }
      if(this.model.sarqualityoflearnersModel.choice10 == 4 ){
        _sarqualityoflearners_total_P4+=4;
      }
      if(this.model.sarqualityoflearnersModel.choice10 == 3 ){
        _sarqualityoflearners_total_P3+=3;
      }
      if(this.model.sarqualityoflearnersModel.choice10 == 2 ){
        _sarqualityoflearners_total_P2+=2;
      }
      if(this.model.sarqualityoflearnersModel.choice10 == 1 ){
        _sarqualityoflearners_total_P1+=1;
      }
    }
    this.model.sarqualityoflearners_total_P5=_sarqualityoflearners_total_P5;
    this.model.sarqualityoflearners_total_P4=_sarqualityoflearners_total_P4;
    this.model.sarqualityoflearners_total_P3=_sarqualityoflearners_total_P3;
    this.model.sarqualityoflearners_total_P2=_sarqualityoflearners_total_P2;
    this.model.sarqualityoflearners_total_P1=_sarqualityoflearners_total_P1;
    this.model.sarqualityoflearners_total_result= (_sarqualityoflearners_total_P5+_sarqualityoflearners_total_P4+_sarqualityoflearners_total_P3+_sarqualityoflearners_total_P2+_sarqualityoflearners_total_P1)/10;
   if( this.model.sarqualityoflearners_total_result>=5){
        this.model.sarqualityoflearners_total_result_value = "ยอดเยี่ยม"
   }
   if( this.model.sarqualityoflearners_total_result>=4 &&this.model.sarqualityoflearners_total_result<5 ){
    this.model.sarqualityoflearners_total_result_value = "ดีเลิศ"
}
if( this.model.sarqualityoflearners_total_result>=3&&this.model.sarqualityoflearners_total_result<4 ){
  this.model.sarqualityoflearners_total_result_value = "ดี"
}
if( this.model.sarqualityoflearners_total_result>=2 &&this.model.sarqualityoflearners_total_result<3){
  this.model.sarqualityoflearners_total_result_value = "ปานกลาง"
}
if( (this.model.sarqualityoflearners_total_result>=1&&this.model.sarqualityoflearners_total_result<2) || this.model.sarqualityoflearners_total_result<1){
  this.model.sarqualityoflearners_total_result_value = "กำลังพัฒนา"
}
   /* 
    if(result.sarqualityevidenceStandard1Good.length!==0){
      this.sarqualityevidenceStandard1GoodObj= result.sarqualityevidenceStandard1Good
    }
    if(result.sarqualityevidenceStandard1Bad.length!==0){
      this.sarqualityevidenceStandard1BadObj= result.sarqualityevidenceStandard1Bad
    }
    if(result.sarqualityevidenceStandard2Good.length!==0){
      this.sarqualityevidenceStandard2GoodObj= result.sarqualityevidenceStandard2Good
    }
    if(result.sarqualityevidenceStandard2Bad.length!==0){
      this.sarqualityevidenceStandard2BadObj= result.sarqualityevidenceStandard2Bad
    }
    if(result.sarqualityevidenceStandard3Good.length!==0){
      this.sarqualityevidenceStandard3GoodObj= result.sarqualityevidenceStandard3Good
    }
    if(result.sarqualityevidenceStandard3Bad.length!==0){
      this.sarqualityevidenceStandard3BadObj= result.sarqualityevidenceStandard3Bad
    }
    if(result.sarqualityevidenceStandard4Good.length!==0){
      this.sarqualityevidenceStandard4GoodObj= result.sarqualityevidenceStandard4Good
    }
    if(result.sarqualityevidenceStandard4Bad.length!==0){
      this.sarqualityevidenceStandard4BadObj= result.sarqualityevidenceStandard4Bad
    }*/
    var _sarstandard2_total_P5=0;
    var _sarstandard2_total_P4=0;
    var _sarstandard2_total_P3=0;
    var _sarstandard2_total_P2=0;
    var _sarstandard2_total_P1=0;
    if(result.sarstandard2!==undefined){
      this.sarstandard2Obj= result.sarstandard2
      this.model.sarstandard2Model= result.sarstandard2
      if(this.model.sarqualityoflearnersModel.choice1 == 5 ){
        _sarstandard2_total_P5+=5;
      }
      if(this.model.sarstandard2Model.choice1 == 4 ){
        _sarstandard2_total_P4+=4;
      }
      if(this.model.sarstandard2Model.choice1 == 3 ){
        _sarstandard2_total_P3+=3;
      }
      if(this.model.sarstandard2Model.choice1 == 2 ){
        _sarstandard2_total_P2+=2;
      }
      if(this.model.sarstandard2Model.choice1 == 1 ){
        _sarstandard2_total_P1+=1;
      }
      if(this.model.sarstandard2Model.choice2 == 5 ){
        _sarstandard2_total_P5+=5;
      }
      if(this.model.sarstandard2Model.choice2 == 4 ){
        _sarstandard2_total_P4+=4;
      }
      if(this.model.sarstandard2Model.choice2 == 3 ){
        _sarstandard2_total_P3+=3;
      }
      if(this.model.sarstandard2Model.choice2 == 2 ){
        _sarstandard2_total_P2+=2;
      }
      if(this.model.sarstandard2Model.choice2 == 1 ){
        _sarstandard2_total_P1+=1;
      }
      if(this.model.sarstandard2Model.choice3 == 5 ){
        _sarstandard2_total_P5+=5;
      }
      if(this.model.sarstandard2Model.choice3 == 4 ){
        _sarstandard2_total_P4+=4;
      }
      if(this.model.sarstandard2Model.choice3 == 3 ){
        _sarstandard2_total_P3+=3;
      }
      if(this.model.sarstandard2Model.choice3 == 2 ){
        _sarstandard2_total_P2+=2;
      }
      if(this.model.sarstandard2Model.choice3 == 1 ){
        _sarstandard2_total_P1+=1;
      }
      if(this.model.sarstandard2Model.choice4 == 5 ){
        _sarstandard2_total_P5+=5;
      }
      if(this.model.sarstandard2Model.choice4 == 4 ){
        _sarstandard2_total_P4+=4;
      }
      if(this.model.sarstandard2Model.choice4 == 3 ){
        _sarstandard2_total_P3+=3;
      }
      if(this.model.sarstandard2Model.choice4 == 2 ){
        _sarstandard2_total_P2+=2;
      }
      if(this.model.sarstandard2Model.choice4 == 1 ){
        _sarstandard2_total_P1+=1;
      }
      if(this.model.sarstandard2Model.choice5 == 5 ){
        _sarstandard2_total_P5+=5;
      }
      if(this.model.sarstandard2Model.choice5 == 4 ){
        _sarstandard2_total_P4+=4;
      }
      if(this.model.sarstandard2Model.choice5 == 3 ){
        _sarstandard2_total_P3+=3;
      }
      if(this.model.sarstandard2Model.choice5 == 2 ){
        _sarstandard2_total_P2+=2;
      }
      if(this.model.sarstandard2Model.choice5 == 1 ){
        _sarstandard2_total_P1+=1;
      }
      if(this.model.sarstandard2Model.choice6 == 5 ){
        _sarstandard2_total_P5+=5;
      }
      if(this.model.sarstandard2Model.choice6 == 4 ){
        _sarstandard2_total_P4+=4;
      }
      if(this.model.sarstandard2Model.choice6 == 3 ){
        _sarstandard2_total_P3+=3;
      }
      if(this.model.sarstandard2Model.choice6 == 2 ){
        _sarstandard2_total_P2+=2;
      }
      if(this.model.sarstandard2Model.choice6 == 1 ){
        _sarstandard2_total_P1+=1;
      }
    }
    this.model.sarstandard2_total_P5=_sarstandard2_total_P5;
    this.model.sarstandard2_total_P4=_sarstandard2_total_P4;
    this.model.sarstandard2_total_P3=_sarstandard2_total_P3;
    this.model.sarstandard2_total_P2=_sarstandard2_total_P2;
    this.model.sarstandard2_total_P1=_sarstandard2_total_P1;
    this.model.sarstandard2_total_result= (_sarstandard2_total_P5+_sarstandard2_total_P4+_sarstandard2_total_P3+_sarstandard2_total_P2+_sarstandard2_total_P1)/6;
   if( this.model.sarstandard2_total_result>=5){
        this.model.sarstandard2_total_result_value = "ยอดเยี่ยม"
   }
   if( this.model.sarstandard2_total_result>=4 &&this.model.sarstandard2_total_result<5 ){
    this.model.sarstandard2_total_result_value = "ดีเลิศ"
}
if( this.model.sarstandard2_total_result>=3&&this.model.sarstandard2_total_result<4 ){
  this.model.sarstandard2_total_result_value = "ดี"
}
if( this.model.sarstandard2_total_result>=2 &&this.model.sarstandard2_total_result<3){
  this.model.sarstandard2_total_result_value = "ปานกลาง"
}
if( (this.model.sarstandard2_total_result>=1&&this.model.sarstandard2_total_result<2) || this.model.sarstandard2_total_result<1){
  this.model.sarstandard2_total_result_value = "กำลังพัฒนา"
}
var _sarstandard3_total_P5=0;
var _sarstandard3_total_P4=0;
var _sarstandard3_total_P3=0;
var _sarstandard3_total_P2=0;
var _sarstandard3_total_P1=0;

      if(result.sarstandard3!==undefined){
      this.sarstandard3Obj= result.sarstandard3
      this.model.sarstandard3Model= result.sarstandard3
      if(this.model.sarqualityoflearnersModel.choice1 == 5 ){
        _sarstandard3_total_P5+=5;
      }
      if(this.model.sarstandard3Model.choice1 == 4 ){
        _sarstandard3_total_P4+=4;
      }
      if(this.model.sarstandard3Model.choice1 == 3 ){
        _sarstandard3_total_P3+=3;
      }
      if(this.model.sarstandard3Model.choice1 == 2 ){
        _sarstandard3_total_P2+=2;
      }
      if(this.model.sarstandard3Model.choice1 == 1 ){
        _sarstandard3_total_P1+=1;
      }
      if(this.model.sarstandard3Model.choice2 == 5 ){
        _sarstandard3_total_P5+=5;
      }
      if(this.model.sarstandard3Model.choice2 == 4 ){
        _sarstandard3_total_P4+=4;
      }
      if(this.model.sarstandard3Model.choice2 == 3 ){
        _sarstandard3_total_P3+=3;
      }
      if(this.model.sarstandard3Model.choice2 == 2 ){
        _sarstandard3_total_P2+=2;
      }
      if(this.model.sarstandard3Model.choice2 == 1 ){
        _sarstandard3_total_P1+=1;
      }
      if(this.model.sarstandard3Model.choice3 == 5 ){
        _sarstandard3_total_P5+=5;
      }
      if(this.model.sarstandard3Model.choice3 == 4 ){
        _sarstandard3_total_P4+=4;
      }
      if(this.model.sarstandard3Model.choice3 == 3 ){
        _sarstandard3_total_P3+=3;
      }
      if(this.model.sarstandard3Model.choice3 == 2 ){
        _sarstandard3_total_P2+=2;
      }
      if(this.model.sarstandard3Model.choice3 == 1 ){
        _sarstandard3_total_P1+=1;
      }
      if(this.model.sarstandard3Model.choice4 == 5 ){
        _sarstandard3_total_P5+=5;
      }
      if(this.model.sarstandard3Model.choice4 == 4 ){
        _sarstandard3_total_P4+=4;
      }
      if(this.model.sarstandard3Model.choice4 == 3 ){
        _sarstandard3_total_P3+=3;
      }
      if(this.model.sarstandard3Model.choice4 == 2 ){
        _sarstandard3_total_P2+=2;
      }
      if(this.model.sarstandard3Model.choice4 == 1 ){
        _sarstandard3_total_P1+=1;
      }
      if(this.model.sarstandard3Model.choice5 == 5 ){
        _sarstandard3_total_P5+=5;
      }
      if(this.model.sarstandard3Model.choice5 == 4 ){
        _sarstandard3_total_P4+=4;
      }
      if(this.model.sarstandard3Model.choice5 == 3 ){
        _sarstandard3_total_P3+=3;
      }
      if(this.model.sarstandard3Model.choice5 == 2 ){
        _sarstandard3_total_P2+=2;
      }
      if(this.model.sarstandard3Model.choice5 == 1 ){
        _sarstandard3_total_P1+=1;
      }
    }

    this.model.sarstandard3_total_P5=_sarstandard3_total_P5;
    this.model.sarstandard3_total_P4=_sarstandard3_total_P4;
    this.model.sarstandard3_total_P3=_sarstandard3_total_P3;
    this.model.sarstandard3_total_P2=_sarstandard3_total_P2;
    this.model.sarstandard3_total_P1=_sarstandard3_total_P1;
    this.model.sarstandard3_total_result= (_sarstandard3_total_P5+_sarstandard3_total_P4+_sarstandard3_total_P3+_sarstandard3_total_P2+_sarstandard3_total_P1)/5;
   if( this.model.sarstandard3_total_result>=5){
        this.model.sarstandard3_total_result_value = "ยอดเยี่ยม"
   }
   if( this.model.sarstandard3_total_result>=4 &&this.model.sarstandard3_total_result<5 ){
    this.model.sarstandard3_total_result_value = "ดีเลิศ"
}
if( this.model.sarstandard3_total_result>=3&&this.model.sarstandard3_total_result<4 ){
  this.model.sarstandard3_total_result_value = "ดี"
}
if( this.model.sarstandard3_total_result>=2 &&this.model.sarstandard3_total_result<3){
  this.model.sarstandard3_total_result_value = "ปานกลาง"
}
if( (this.model.sarstandard3_total_result>=1&&this.model.sarstandard3_total_result<2) || this.model.sarstandard3_total_result<1){
  this.model.sarstandard3_total_result_value = "กำลังพัฒนา"
}
    /*
      if(result.sarstandard4!==undefined){
      this.sarstandard4Obj= result.sarstandard4
      this.model.sarstandard4Model= result.sarstandard4
    }*/
   
    if(result.sacompetencyassessment.length!==0){

      this.sacompetencyassessmentObj=result.sacompetencyassessment
    }
     
    if(result.sarcrudassessment.length!==0){

      this.sarcrudassessmentObj=result.sarcrudassessment
    }  
    if(result.saractivities.length!==0){

      this.saractivitiesObj=result.saractivities
    }  
    if(result.saradviseclass.length!==0){

      this.saradviseclassObj=result.saradviseclass
    }  
    var _sarcrudassessmentTerm1_totalStudent =0;
    var _sarcrudassessmentTerm1_assessment1 =0;
    var _sarcrudassessmentTerm1_assessment2 =0;
    var _sarcrudassessmentTerm1_assessment3 =0;
    var _sarcrudassessmentTerm1_assessment4 =0;
    if(result.sarcrudassessmentTerm1.length!==0){
      this.sarcrudassessmentTerm1Obj=result.sarcrudassessmentTerm1
      if(this.sarcrudassessmentTerm1Obj.length >0){
        for(var i=0;i<this.sarcrudassessmentTerm1Obj.length; i++){     
          _sarcrudassessmentTerm1_totalStudent += this.sarcrudassessmentTerm1Obj[i].totalStudent;
          _sarcrudassessmentTerm1_assessment1+= this.sarcrudassessmentTerm1Obj[i].assessment1;
          _sarcrudassessmentTerm1_assessment2+= this.sarcrudassessmentTerm1Obj[i].assessment2;
          _sarcrudassessmentTerm1_assessment3+= this.sarcrudassessmentTerm1Obj[i].assessment3;
          _sarcrudassessmentTerm1_assessment4+= this.sarcrudassessmentTerm1Obj[i].assessment4;
         }
        
        }
    }
    this.model.sarcrudassessmentTerm1_assessment1=_sarcrudassessmentTerm1_assessment1;
    this.model.sarcrudassessmentTerm1_assessment2=_sarcrudassessmentTerm1_assessment2;
    this.model.sarcrudassessmentTerm1_assessment3=_sarcrudassessmentTerm1_assessment3;
    this.model.sarcrudassessmentTerm1_assessment4=_sarcrudassessmentTerm1_assessment4;
    this.model.sarcrudassessmentTerm1_totalStudent=_sarcrudassessmentTerm1_totalStudent;  
    this.model.sarcrudassessmentTerm1_assessment1_persent=((_sarcrudassessmentTerm1_assessment1/_sarcrudassessmentTerm1_totalStudent )*100).toFixed(2);
    this.model.sarcrudassessmentTerm1_assessment2_persent=((_sarcrudassessmentTerm1_assessment2/_sarcrudassessmentTerm1_totalStudent )*100).toFixed(2);
    this.model.sarcrudassessmentTerm1_assessment3_persent=((_sarcrudassessmentTerm1_assessment3/_sarcrudassessmentTerm1_totalStudent )*100).toFixed(2);
    this.model.sarcrudassessmentTerm1_assessment4_persent=((_sarcrudassessmentTerm1_assessment4/_sarcrudassessmentTerm1_totalStudent )*100).toFixed(2);

    var _sarcrudassessmentTerm2_totalStudent =0;
    var _sarcrudassessmentTerm2_assessment1 =0;
    var _sarcrudassessmentTerm2_assessment2 =0;
    var _sarcrudassessmentTerm2_assessment3 =0;
    var _sarcrudassessmentTerm2_assessment4 =0;
    if(result.sarcrudassessmentTerm2.length!==0){
      this.sarcrudassessmentTerm2Obj=result.sarcrudassessmentTerm2
      if(this.sarcrudassessmentTerm2Obj.length >0){
        for(var i=0;i<this.sarcrudassessmentTerm2Obj.length; i++){     
          _sarcrudassessmentTerm2_totalStudent += this.sarcrudassessmentTerm2Obj[i].totalStudent;
          _sarcrudassessmentTerm2_assessment1+= this.sarcrudassessmentTerm2Obj[i].assessment1;
          _sarcrudassessmentTerm2_assessment2+= this.sarcrudassessmentTerm2Obj[i].assessment2;
          _sarcrudassessmentTerm2_assessment3+= this.sarcrudassessmentTerm2Obj[i].assessment3;
          _sarcrudassessmentTerm2_assessment4+= this.sarcrudassessmentTerm2Obj[i].assessment4;
         }
        
        }
    }
    this.model.sarcrudassessmentTerm2_assessment1=_sarcrudassessmentTerm2_assessment1;
    this.model.sarcrudassessmentTerm2_assessment2=_sarcrudassessmentTerm2_assessment2;
    this.model.sarcrudassessmentTerm2_assessment3=_sarcrudassessmentTerm2_assessment3;
    this.model.sarcrudassessmentTerm2_assessment4=_sarcrudassessmentTerm2_assessment4;
    this.model.sarcrudassessmentTerm2_totalStudent=_sarcrudassessmentTerm2_totalStudent;  
    this.model.sarcrudassessmentTerm2_assessment1_persent=((_sarcrudassessmentTerm2_assessment1/_sarcrudassessmentTerm2_totalStudent )*100).toFixed(2);
    this.model.sarcrudassessmentTerm2_assessment2_persent=((_sarcrudassessmentTerm2_assessment2/_sarcrudassessmentTerm2_totalStudent )*100).toFixed(2);
    this.model.sarcrudassessmentTerm2_assessment3_persent=((_sarcrudassessmentTerm2_assessment3/_sarcrudassessmentTerm2_totalStudent )*100).toFixed(2);
    this.model.sarcrudassessmentTerm2_assessment4_persent=((_sarcrudassessmentTerm2_assessment4/_sarcrudassessmentTerm2_totalStudent )*100).toFixed(2);
 
    var _sacompetencyassessmentTerm1_totalStudent =0;
    var _sacompetencyassessmentTerm1_assessment1 =0;
    var _sacompetencyassessmentTerm1_assessment2 =0;
    var _sacompetencyassessmentTerm1_assessment3 =0;
    var _sacompetencyassessmentTerm1_assessment4 =0;
    if(result.sacompetencyassessmentTerm1.length!==0){
      this.sacompetencyassessmentTerm1Obj=result.sacompetencyassessmentTerm1
      if(this.sacompetencyassessmentTerm1Obj.length >0){
        for(var i=0;i<this.sacompetencyassessmentTerm1Obj.length; i++){     
          _sacompetencyassessmentTerm1_totalStudent += this.sacompetencyassessmentTerm1Obj[i].totalStudent;
          _sacompetencyassessmentTerm1_assessment1+= this.sacompetencyassessmentTerm1Obj[i].assessment1;
          _sacompetencyassessmentTerm1_assessment2+= this.sacompetencyassessmentTerm1Obj[i].assessment2;
          _sacompetencyassessmentTerm1_assessment3+= this.sacompetencyassessmentTerm1Obj[i].assessment3;
          _sacompetencyassessmentTerm1_assessment4+= this.sacompetencyassessmentTerm1Obj[i].assessment4;
         }
        
        }
    }
    this.model.sacompetencyassessmentTerm1_assessment1=_sacompetencyassessmentTerm1_assessment1;
    this.model.sacompetencyassessmentTerm1_assessment2=_sacompetencyassessmentTerm1_assessment2;
    this.model.sacompetencyassessmentTerm1_assessment3=_sacompetencyassessmentTerm1_assessment3;
    this.model.sacompetencyassessmentTerm1_assessment4=_sacompetencyassessmentTerm1_assessment4;
    this.model.sacompetencyassessmentTerm1_totalStudent=_sacompetencyassessmentTerm1_totalStudent;  
    this.model.sacompetencyassessmentTerm1_assessment1_persent=((_sacompetencyassessmentTerm1_assessment1/_sacompetencyassessmentTerm1_totalStudent )*100).toFixed(2);
    this.model.sacompetencyassessmentTerm1_assessment2_persent=((_sacompetencyassessmentTerm1_assessment2/_sacompetencyassessmentTerm1_totalStudent )*100).toFixed(2);
    this.model.sacompetencyassessmentTerm1_assessment3_persent=((_sacompetencyassessmentTerm1_assessment3/_sacompetencyassessmentTerm1_totalStudent )*100).toFixed(2);
    this.model.sacompetencyassessmentTerm1_assessment4_persent=((_sacompetencyassessmentTerm1_assessment4/_sacompetencyassessmentTerm1_totalStudent )*100).toFixed(2);


    var _sacompetencyassessmentTerm2_totalStudent =0;
    var _sacompetencyassessmentTerm2_assessment1 =0;
    var _sacompetencyassessmentTerm2_assessment2 =0;
    var _sacompetencyassessmentTerm2_assessment3 =0;
    var _sacompetencyassessmentTerm2_assessment4 =0;
    if(result.sacompetencyassessmentTerm2.length!==0){
      this.sacompetencyassessmentTerm2Obj=result.sacompetencyassessmentTerm2
      if(this.sacompetencyassessmentTerm2Obj.length >0){
        for(var i=0;i<this.sacompetencyassessmentTerm2Obj.length; i++){     
          _sacompetencyassessmentTerm2_totalStudent += this.sacompetencyassessmentTerm2Obj[i].totalStudent;
          _sacompetencyassessmentTerm2_assessment1+= this.sacompetencyassessmentTerm2Obj[i].assessment1;
          _sacompetencyassessmentTerm2_assessment2+= this.sacompetencyassessmentTerm2Obj[i].assessment2;
          _sacompetencyassessmentTerm2_assessment3+= this.sacompetencyassessmentTerm2Obj[i].assessment3;
          _sacompetencyassessmentTerm2_assessment4+= this.sacompetencyassessmentTerm2Obj[i].assessment4;
         }
        
        }
    }
    this.model.sacompetencyassessmentTerm2_assessment1=_sacompetencyassessmentTerm2_assessment1;
    this.model.sacompetencyassessmentTerm2_assessment2=_sacompetencyassessmentTerm2_assessment2;
    this.model.sacompetencyassessmentTerm2_assessment3=_sacompetencyassessmentTerm2_assessment3;
    this.model.sacompetencyassessmentTerm2_assessment4=_sacompetencyassessmentTerm2_assessment4;
    this.model.sacompetencyassessmentTerm2_totalStudent=_sacompetencyassessmentTerm2_totalStudent;  
    this.model.sacompetencyassessmentTerm2_assessment1_persent=((_sacompetencyassessmentTerm2_assessment1/_sacompetencyassessmentTerm2_totalStudent )*100).toFixed(2);
    this.model.sacompetencyassessmentTerm2_assessment2_persent=((_sacompetencyassessmentTerm2_assessment2/_sacompetencyassessmentTerm2_totalStudent )*100).toFixed(2);
    this.model.sacompetencyassessmentTerm2_assessment3_persent=((_sacompetencyassessmentTerm2_assessment3/_sacompetencyassessmentTerm2_totalStudent )*100).toFixed(2);
    this.model.sacompetencyassessmentTerm2_assessment4_persent=((_sacompetencyassessmentTerm2_assessment4/_sacompetencyassessmentTerm2_totalStudent )*100).toFixed(2);

    if(result.saruploadimg.length!==0){

      this.saruploadimgObj=result.saruploadimg
    }  
    if(result.sarorderedposition.length!==0){

      this.sarorderedpositionObj=result.sarorderedposition
    }  
      this.onAsyncRunner(result);
    })
  }
  onAsyncRunner(model?: any): void {
    if(this.isTeacher === true){
      this.model.teacherId = parseInt( this.userDataService.getInfoId())
       }
    this.onEnumLoader()
  if(!this.view){
    forkJoin(
    this.service.getTeacherDropdown(),
    ).subscribe(
      (
      [
      teacherDropdown,
      ]
      ) => {
      [
     this.teacherDropdown =teacherDropdown  as SelectItems[],
      ]
      }),
      (error) => {
      }
   }
  }
  async setInitialCreatingData(){
    this.service.initialSarDetail(this.refIdValue).subscribe(result=>{
      this.model = result.teacherObj;
      this.educationObj = result.educationObj;
      if(result.sarPersonalData!==undefined){
        this.sarPersonalData=result.sarPersonalData
      this.model.salary=result.sarPersonalData.salary;
      this.model.practitionerMoney=result.sarPersonalData.practitionerMoney
      this.model.positionNumber=result.sarPersonalData.positionNumber
      this.model.affiliation=result.sarPersonalData.affiliation
      }
         //cal ผลรวมวันลา
var sum_sickLeaveTimes =0;
var sum_sickLeaveDays =0;
var sum_businessLeaveTimes =0;
var sum_businessLeaveDays =0;
var sum_ordinationLeaveTimes =0;
var sum_ordinationLeaveDays =0;
var sum_deliverLeaveTimes =0;
var sum_deliverLeaveDays =0;
var sum_lateTimes =0;
var sum_lateLeaveDays =0;
var total_times=0;
var total_days=0;
      if(result.sarPersonalLeaveData.length!=0){
       this.sarPersonalLeaveDataObj = result.sarPersonalLeaveData
      if(this.sarPersonalLeaveDataObj.length >0){
        for(var i=0;i<this.sarPersonalLeaveDataObj.length; i++){
             
      sum_sickLeaveTimes += this.sarPersonalLeaveDataObj[i].sickLeaveTimes;
      sum_sickLeaveDays += this.sarPersonalLeaveDataObj[i].sickLeaveDays;
      sum_businessLeaveTimes +=  this.sarPersonalLeaveDataObj[i].businessLeaveTimes;
      sum_businessLeaveDays +=  this.sarPersonalLeaveDataObj[i].businessLeaveDays;
      sum_ordinationLeaveTimes +=  this.sarPersonalLeaveDataObj[i].ordinationLeaveTimes;
      sum_ordinationLeaveDays +=  this.sarPersonalLeaveDataObj[i].ordinationLeaveDays;
      sum_deliverLeaveTimes +=  this.sarPersonalLeaveDataObj[i].deliverLeaveTimes;
      sum_deliverLeaveDays +=  this.sarPersonalLeaveDataObj[i].deliverLeaveDays;
      sum_lateTimes +=  this.sarPersonalLeaveDataObj[i].lateTimes;
      sum_lateLeaveDays +=  this.sarPersonalLeaveDataObj[i].lateLeaveDays;
     
         }
         total_times+= sum_sickLeaveTimes+sum_businessLeaveTimes+sum_ordinationLeaveTimes+sum_deliverLeaveTimes +sum_lateTimes;
         total_days+= sum_sickLeaveDays+sum_businessLeaveDays+sum_ordinationLeaveDays+sum_deliverLeaveDays+sum_lateLeaveDays;
      
     }   
      }
      this.model.sum_sickLeaveTimes=  sum_sickLeaveTimes
      this.model.sum_sickLeaveDays=  sum_sickLeaveDays
      this.model.sum_businessLeaveTimes=  sum_businessLeaveTimes
      this.model.sum_businessLeaveDays=  sum_businessLeaveDays
      this.model.sum_ordinationLeaveTimes=  sum_ordinationLeaveTimes
      this.model.sum_ordinationLeaveDays=  sum_ordinationLeaveDays
      this.model.sum_deliverLeaveTimes=  sum_deliverLeaveTimes
      this.model.sum_deliverLeaveDays=  sum_deliverLeaveDays
      this.model.sum_lateTimes=  sum_lateTimes
      this.model.sum_lateLeaveDays=  sum_lateLeaveDays
      this.model.total_times=  total_times
      this.model.total_days=  total_days
      var _sarCoursesYearTermSumHour =0
      var _sarCoursesYearTermSumTotalRoom=0
      if(result.sarCoursesYearTerm.length!==0){
        this.sarCoursesYearTermObj =  result.sarCoursesYearTerm;
      //  this.model.sarCoursesYearTermTitle ='ภาคเรียนที่ '+ result.sarCoursesYearTerm[0].term+' ปีการศึกษา '+ result.sarCoursesYearTerm[0].schoolYear;
        if(this.sarCoursesYearTermObj.length >0){
          for(var i=0;i<this.sarCoursesYearTermObj.length; i++){
            var totalroom_for_cal =1
            if(this.sarCoursesYearTermObj[i].totalRoom>0){
              totalroom_for_cal =this.sarCoursesYearTermObj[i].totalRoom;
            }
            _sarCoursesYearTermSumHour+=(this.sarCoursesYearTermObj[i].hourPerWeek*totalroom_for_cal);
            _sarCoursesYearTermSumTotalRoom+=this.sarCoursesYearTermObj[i].totalRoom;
          }
        }
      }
      this.model.sarCoursesYearTermSumHour=_sarCoursesYearTermSumHour;
      this.model.sarCoursesYearTermSumTotalRoom=_sarCoursesYearTermSumTotalRoom;
      if(result.teachingscheduleTerm1!==undefined){
        this.teachingscheduleTerm1Obj = result.teachingscheduleTerm1
        this.model.teachingscheduleTerm1Model= result.teachingscheduleTerm1
      }

      var _sarCoursesYearTerm2SumHour =0
      var _sarCoursesYearTerm2TotalRoom =0
      if(result.sarCoursesYearTerm2.length!==0){
     this.sarCoursesYearTerm2Obj =  result.sarCoursesYearTerm2;
     // this.model.sarCoursesYearTerm2Title ='ภาคเรียนที่ '+ result.sarCoursesYearTerm2[0].term+' ปีการศึกษา '+ result.sarCoursesYearTerm2[0].schoolYear;
      if(this.sarCoursesYearTerm2Obj.length >0){
        for(var i=0;i<this.sarCoursesYearTerm2Obj.length; i++){
          var totalroom_for_cal =1
          if(this.sarCoursesYearTerm2Obj[i].totalRoom>0){
            totalroom_for_cal =this.sarCoursesYearTerm2Obj[i].totalRoom;
          }
          _sarCoursesYearTerm2SumHour+= (this.sarCoursesYearTerm2Obj[i].hourPerWeek*totalroom_for_cal);
          _sarCoursesYearTerm2TotalRoom+=this.sarCoursesYearTerm2Obj[i].totalRoom;
        }
      }
    }
      this.model.sarCoursesYearTerm2SumHour=_sarCoursesYearTerm2SumHour;
      this.model.sarCoursesYearTerm2TotalRoom=_sarCoursesYearTerm2TotalRoom;
      if(result.teachingscheduleTerm2!==undefined){
      this.teachingscheduleTerm2Obj = result.teachingscheduleTerm2
     this.model.teachingscheduleTerm2Model= result.teachingscheduleTerm2
    }
    if(result.sarAnotherSpeacialDuty.length!==0){
      this.sarAnotherSpeacialDutyObj= result.sarAnotherSpeacialDuty
     // this.model.sarAnotherSpeacialDutyTitle =  result.sarAnotherSpeacialDuty[0].schoolyear
    }
    if(result.sarLearningManagementPlan.length!==0){
     this.sarLearningManagementPlanObj =  result.sarLearningManagementPlan}

     var _sarMediaProductionTotal =0
     if(result.sarMediaProduction.length!==0){
     this.sarMediaProductionObj =  result.sarMediaProduction
     if(this.sarMediaProductionObj.length >0){
      for(var i=0;i<this.sarMediaProductionObj.length; i++){
        _sarMediaProductionTotal+=this.sarMediaProductionObj[i].mediaProductionCount;
      }
    }
    }
     this.model.sarMediaProductionTotal =_sarMediaProductionTotal

     if(result.sarIntegratedLearning.length!==0){
     this.sarIntegratedLearningObj = result.sarIntegratedLearning
    }

    var _sarResearchInClassTotal =0;
     if(result.sarResearchInClass.length!==0){
     this.sarResearchInClassObj = result.sarResearchInClass
     _sarResearchInClassTotal =result.sarResearchInClass.length;
    }

    this.model.sarResearchInClassTotal=_sarResearchInClassTotal

     if(result.sarStudentAssign.length!==0){
      this.sarStudentAssignObj = result.sarStudentAssign}
      if(result.sarLecturerInvite.length!==0){
      this.sarLecturerInviteObj = result.sarLecturerInvite}

      var _sarTeachingFormatTotal=0;
      if(result.sarTeachingFormat!==undefined){
      this.sarTeachingFormatObj = result.sarTeachingFormat
      this.model.sarTeachingFormatModel = result.sarTeachingFormat
      if(  this.model.sarTeachingFormatModel.teachingFormat1== true){
        _sarTeachingFormatTotal+=1
       }
      if(  this.model.sarTeachingFormatModel.teachingFormat2== true){
  _sarTeachingFormatTotal+=1
 }
 if(  this.model.sarTeachingFormatModel.teachingFormat3== true){
  _sarTeachingFormatTotal+=1
 }
 if(  this.model.sarTeachingFormatModel.teachingFormat4== true){
   _sarTeachingFormatTotal+=1
 }
 if(  this.model.sarTeachingFormatModel.teachingFormat5== true){
   _sarTeachingFormatTotal+=1
 }
 if(  this.model.sarTeachingFormatModel.teachingFormat6== true){
   _sarTeachingFormatTotal+=1
 }
 if(  this.model.sarTeachingFormatModel.teachingFormat7== true){
   _sarTeachingFormatTotal+=1
 }
 if(  this.model.sarTeachingFormatModel.teachingFormat8== true){
   _sarTeachingFormatTotal+=1
 }
 if(  this.model.sarTeachingFormatModel.teachingFormat9== true){
   _sarTeachingFormatTotal+=1
 }
 if(  this.model.sarTeachingFormatModel.teachingFormat10== true){
   _sarTeachingFormatTotal+=1
 }
 if(  this.model.sarTeachingFormatModel.teachingFormat11== true){
   _sarTeachingFormatTotal+=1
 }
 if(  this.model.sarTeachingFormatModel.teachingFormat12== true){
   _sarTeachingFormatTotal+=1
 }
 if(  this.model.sarTeachingFormatModel.teachingFormat13== true){
   _sarTeachingFormatTotal+=1
 }
 if(  this.model.sarTeachingFormatModel.teachingFormat14== true){
   _sarTeachingFormatTotal+=1
 }
 if(  this.model.sarTeachingFormatModel.teachingFormat15== true){
   _sarTeachingFormatTotal+=1
 }

 if(  this.model.sarTeachingFormatModel.teachingFormat17== true){
  _sarTeachingFormatTotal+=1
}
 if(  this.model.sarTeachingFormatModel.teachingFormat18== true){
   _sarTeachingFormatTotal+=1
 }
 if(  this.model.sarTeachingFormatModel.teachingFormat19== true){
   _sarTeachingFormatTotal+=1
 }
 if(  this.model.sarTeachingFormatModel.teachingFormat20== true){
   _sarTeachingFormatTotal+=1
 }
 if(  this.model.sarTeachingFormatModel.teachingFormat21== true){
   _sarTeachingFormatTotal+=1
 }
 if(  this.model.sarTeachingFormatModel.teachingFormat22== true){
   _sarTeachingFormatTotal+=1
 }
 if(  this.model.sarTeachingFormatModel.teachingFormat23== true){
   _sarTeachingFormatTotal+=1
 }
 if(  this.model.sarTeachingFormatModel.teachingFormat24== true){
   _sarTeachingFormatTotal+=1
 }
 if(  this.model.sarTeachingFormatModel.teachingFormat25== true){
   _sarTeachingFormatTotal+=1
 }
 if(  this.model.sarTeachingFormatModel.teachingFormat26== true){
   _sarTeachingFormatTotal+=1
 }
 
 if(  this.model.sarTeachingFormatModel.teachingFormatOther== true){
   _sarTeachingFormatTotal+=1
 }
}
      this.model.sarTeachingFormatTotal =_sarTeachingFormatTotal;

     if(result.sarTeachingCondition!==undefined){
      this.sarTeachingConditionObj = result.sarTeachingCondition
      this.model.sarTeachingConditionModel = result.sarTeachingCondition
    }
    if(result.sarselfdevelopment.length!==0){
      this.sarselfdevelopmentObj = result.sarselfdevelopment
    }
    if(result.saraward.length!==0){
      this.sarawardObj = result.saraward
    }
    if(result.sarinvitedspeaker.length!==0){
      this.sarinvitedspeakerObj = result.sarinvitedspeaker
    }
//รวมเทอม 1
var _teachingresulttotalStudent_01=0;
var _teachingresultresultGrad2_01=0;
var _teachingresultresultGrad1_01=0;
var _teachingresultresultGrad3_01=0;
var _teachingresultresultGrad4_01=0;
var _teachingresultresultGrad5_01=0;
var _teachingresultresultGrad6_01=0;
var _teachingresultresultGrad7_01=0;
var _teachingresultresultGrad8_01=0;
var _teachingresultresultGrad9_01=0;
var _teachingresultresultGrad10_01=0;
var _teachingresulttotalResultGrad_01=0;
//รวม เทอม2
var _teachingresulttotalStudent_02=0;
var _teachingresultresultGrad2_02=0;
var _teachingresultresultGrad1_02=0;
var _teachingresultresultGrad3_02=0;
var _teachingresultresultGrad4_02=0;
var _teachingresultresultGrad5_02=0;
var _teachingresultresultGrad6_02=0;
var _teachingresultresultGrad7_02=0;
var _teachingresultresultGrad8_02=0;
var _teachingresultresultGrad9_02=0;
var _teachingresultresultGrad10_02=0;
var _teachingresulttotalResultGrad_02=0;


//รวาม2เทอม
       var _teachingresulttotalStudent=0;
    var _teachingresultresultGrad2=0;
    var _teachingresultresultGrad1=0;
    var _teachingresultresultGrad3=0;
    var _teachingresultresultGrad4=0;
    var _teachingresultresultGrad5=0;
    var _teachingresultresultGrad6=0;
    var _teachingresultresultGrad7=0;
    var _teachingresultresultGrad8=0;
    var _teachingresultresultGrad9=0;
    var _teachingresultresultGrad10=0;
    var _teachingresulttotalResultGrad=0;
    var _teachingresulttotalMoreGrad3=0;
    var _teachingresulttotalMoreGrad2=0;


    if(result.teachingresultTerm1.length!==0){
      this.teachingresultTerm1Obj= result.teachingresultTerm1
      if(this.teachingresultTerm1Obj.length >0){
        for(var i=0;i<this.teachingresultTerm1Obj.length; i++){
//เทอม1
_teachingresulttotalStudent_01+=this.teachingresultTerm1Obj[i].totalStudent;
_teachingresultresultGrad2_01+=this.teachingresultTerm1Obj[i].resultGrad2;
_teachingresultresultGrad1_01+=this.teachingresultTerm1Obj[i].resultGrad1;
_teachingresultresultGrad3_01+=this.teachingresultTerm1Obj[i].resultGrad3;
_teachingresultresultGrad4_01+=this.teachingresultTerm1Obj[i].resultGrad4;
_teachingresultresultGrad5_01+=this.teachingresultTerm1Obj[i].resultGrad5;
_teachingresultresultGrad6_01+=this.teachingresultTerm1Obj[i].resultGrad6;
_teachingresultresultGrad7_01+=this.teachingresultTerm1Obj[i].resultGrad7;
_teachingresultresultGrad8_01+=this.teachingresultTerm1Obj[i].resultGrad8;
_teachingresultresultGrad9_01+=this.teachingresultTerm1Obj[i].resultGrad9;
_teachingresultresultGrad10_01+=this.teachingresultTerm1Obj[i].resultGrad10;
_teachingresulttotalResultGrad_01+=this.teachingresultTerm1Obj[i].totalResultGrad;
//


          _teachingresulttotalStudent+=this.teachingresultTerm1Obj[i].totalStudent;
           _teachingresultresultGrad2+=this.teachingresultTerm1Obj[i].resultGrad2;
           _teachingresultresultGrad1+=this.teachingresultTerm1Obj[i].resultGrad1;
           _teachingresultresultGrad3+=this.teachingresultTerm1Obj[i].resultGrad3;
           _teachingresultresultGrad4+=this.teachingresultTerm1Obj[i].resultGrad4;
           _teachingresultresultGrad5+=this.teachingresultTerm1Obj[i].resultGrad5;
           _teachingresultresultGrad6+=this.teachingresultTerm1Obj[i].resultGrad6;
           _teachingresultresultGrad7+=this.teachingresultTerm1Obj[i].resultGrad7;
           _teachingresultresultGrad8+=this.teachingresultTerm1Obj[i].resultGrad8;
           _teachingresultresultGrad9+=this.teachingresultTerm1Obj[i].resultGrad9;
           _teachingresultresultGrad10+=this.teachingresultTerm1Obj[i].resultGrad10;
           _teachingresulttotalResultGrad+=this.teachingresultTerm1Obj[i].totalResultGrad;

           _teachingresulttotalMoreGrad2+=(this.teachingresultTerm1Obj[i].resultGrad6+this.teachingresultTerm1Obj[i].resultGrad7+this.teachingresultTerm1Obj[i].resultGrad8+this.teachingresultTerm1Obj[i].resultGrad9+this.teachingresultTerm1Obj[i].resultGrad10)
           _teachingresulttotalMoreGrad3+=(this.teachingresultTerm1Obj[i].resultGrad8+this.teachingresultTerm1Obj[i].resultGrad9+this.teachingresultTerm1Obj[i].resultGrad10)
          }
      }  
    }
    if(result.teachingresultTerm2.length!==0){
      this.teachingresultTerm2Obj= result.teachingresultTerm2
      if(this.teachingresultTerm2Obj.length >0){
        for(var i=0;i<this.teachingresultTerm2Obj.length; i++){
          //เทอม2
_teachingresulttotalStudent_02+=this.teachingresultTerm2Obj[i].totalStudent;
_teachingresultresultGrad2_02+=this.teachingresultTerm2Obj[i].resultGrad2;
_teachingresultresultGrad1_02+=this.teachingresultTerm2Obj[i].resultGrad1;
_teachingresultresultGrad3_02+=this.teachingresultTerm2Obj[i].resultGrad3;
_teachingresultresultGrad4_02+=this.teachingresultTerm2Obj[i].resultGrad4;
_teachingresultresultGrad5_02+=this.teachingresultTerm2Obj[i].resultGrad5;
_teachingresultresultGrad6_02+=this.teachingresultTerm2Obj[i].resultGrad6;
_teachingresultresultGrad7_02+=this.teachingresultTerm2Obj[i].resultGrad7;
_teachingresultresultGrad8_02+=this.teachingresultTerm2Obj[i].resultGrad8;
_teachingresultresultGrad9_02+=this.teachingresultTerm2Obj[i].resultGrad9;
_teachingresultresultGrad10_02+=this.teachingresultTerm2Obj[i].resultGrad10;
_teachingresulttotalResultGrad_02+=this.teachingresultTerm2Obj[i].totalResultGrad;
//
          _teachingresulttotalStudent+=this.teachingresultTerm2Obj[i].totalStudent;
          _teachingresultresultGrad2+=this.teachingresultTerm2Obj[i].resultGrad2;
          _teachingresultresultGrad1+=this.teachingresultTerm2Obj[i].resultGrad1;
          _teachingresultresultGrad3+=this.teachingresultTerm2Obj[i].resultGrad3;
          _teachingresultresultGrad4+=this.teachingresultTerm2Obj[i].resultGrad4;
          _teachingresultresultGrad5+=this.teachingresultTerm2Obj[i].resultGrad5;
          _teachingresultresultGrad6+=this.teachingresultTerm2Obj[i].resultGrad6;
          _teachingresultresultGrad7+=this.teachingresultTerm2Obj[i].resultGrad7;
          _teachingresultresultGrad8+=this.teachingresultTerm2Obj[i].resultGrad8;
          _teachingresultresultGrad9+=this.teachingresultTerm2Obj[i].resultGrad9;
          _teachingresultresultGrad10+=this.teachingresultTerm2Obj[i].resultGrad10;
          _teachingresulttotalResultGrad+=this.teachingresultTerm2Obj[i].totalResultGrad;
          _teachingresulttotalMoreGrad2+=(this.teachingresultTerm2Obj[i].resultGrad6+this.teachingresultTerm2Obj[i].resultGrad7+this.teachingresultTerm2Obj[i].resultGrad8+this.teachingresultTerm2Obj[i].resultGrad9+this.teachingresultTerm2Obj[i].resultGrad10)
          _teachingresulttotalMoreGrad3+=(this.teachingresultTerm2Obj[i].resultGrad8+this.teachingresultTerm2Obj[i].resultGrad9+this.teachingresultTerm2Obj[i].resultGrad10)
    
        }
      }
    }
//1
this.model.teachingresulttotalStudent_01 =_teachingresulttotalStudent_01
this.model.teachingresultresultGrad2_01 =_teachingresultresultGrad2_01 
this.model.teachingresultresultGrad1_01 =_teachingresultresultGrad1_01 
this.model.teachingresultresultGrad3_01 =_teachingresultresultGrad3_01 
this.model.teachingresultresultGrad4_01 =_teachingresultresultGrad4_01 
this.model.teachingresultresultGrad5_01 =_teachingresultresultGrad5_01 
this.model.teachingresultresultGrad6_01 =_teachingresultresultGrad6_01 
this.model.teachingresultresultGrad7_01 =_teachingresultresultGrad7_01 
this.model.teachingresultresultGrad8_01 =_teachingresultresultGrad8_01 
this.model.teachingresultresultGrad9_01 =_teachingresultresultGrad9_01 
this.model.teachingresultresultGrad10_01 =_teachingresultresultGrad10_01 
this.model.teachingresulttotalResultGrad_01 =_teachingresulttotalResultGrad_01 

//2
this.model.teachingresulttotalStudent_02 =_teachingresulttotalStudent_02
this.model.teachingresultresultGrad2_02 =_teachingresultresultGrad2_02 
this.model.teachingresultresultGrad1_02 =_teachingresultresultGrad1_02 
this.model.teachingresultresultGrad3_02 =_teachingresultresultGrad3_02 
this.model.teachingresultresultGrad4_02 =_teachingresultresultGrad4_02 
this.model.teachingresultresultGrad5_02 =_teachingresultresultGrad5_02 
this.model.teachingresultresultGrad6_02 =_teachingresultresultGrad6_02 
this.model.teachingresultresultGrad7_02 =_teachingresultresultGrad7_02 
this.model.teachingresultresultGrad8_02 =_teachingresultresultGrad8_02 
this.model.teachingresultresultGrad9_02 =_teachingresultresultGrad9_02 
this.model.teachingresultresultGrad10_02 =_teachingresultresultGrad10_02 
this.model.teachingresulttotalResultGrad_02 =_teachingresulttotalResultGrad_02 

//1+2
    this.model.teachingresulttotalStudent =_teachingresulttotalStudent
    this.model.teachingresultresultGrad2 =_teachingresultresultGrad2 
    this.model.teachingresultresultGrad1 =_teachingresultresultGrad1 
    this.model.teachingresultresultGrad3 =_teachingresultresultGrad3 
    this.model.teachingresultresultGrad4 =_teachingresultresultGrad4 
    this.model.teachingresultresultGrad5 =_teachingresultresultGrad5 
    this.model.teachingresultresultGrad6 =_teachingresultresultGrad6 
    this.model.teachingresultresultGrad7 =_teachingresultresultGrad7 
    this.model.teachingresultresultGrad8 =_teachingresultresultGrad8 
    this.model.teachingresultresultGrad9 =_teachingresultresultGrad9 
    this.model.teachingresultresultGrad10 =_teachingresultresultGrad10 
    this.model.teachingresulttotalResultGrad =_teachingresulttotalResultGrad 

    this.model.teachingresultresultGrad2Persent =  ((_teachingresultresultGrad2/_teachingresulttotalStudent )*100).toFixed(2);
    this.model.teachingresultresultGrad1Persent = ((_teachingresultresultGrad1  /_teachingresulttotalStudent )*100).toFixed(2);
    this.model.teachingresultresultGrad3Persent =((_teachingresultresultGrad3/_teachingresulttotalStudent )*100 ).toFixed(2);
    this.model.teachingresultresultGrad4Persent =((_teachingresultresultGrad4/_teachingresulttotalStudent )*100 ).toFixed(2);
    this.model.teachingresultresultGrad5Persent =((_teachingresultresultGrad5/_teachingresulttotalStudent )*100 ).toFixed(2);
    this.model.teachingresultresultGrad6Persent =((_teachingresultresultGrad6/_teachingresulttotalStudent )*100 ).toFixed(2);
    this.model.teachingresultresultGrad7Persent =((_teachingresultresultGrad7/_teachingresulttotalStudent )*100).toFixed(2);
    this.model.teachingresultresultGrad8Persent =((_teachingresultresultGrad8/_teachingresulttotalStudent )*100).toFixed(2);
    this.model.teachingresultresultGrad9Persent =((_teachingresultresultGrad9/_teachingresulttotalStudent )*100 ).toFixed(2);
    this.model.teachingresultresultGrad10Persent =((_teachingresultresultGrad10/_teachingresulttotalStudent )*100).toFixed(2);
    this.model.teachingresulttotalResultGradPersent =((_teachingresulttotalResultGrad/_teachingresulttotalStudent )*100).toFixed(2);
    this.model.teachingresulttotalMoreGrad3 =_teachingresulttotalMoreGrad3
    this.model.teachingresulttotalMoreGrad2 =_teachingresulttotalMoreGrad2
    this.model.teachingresulttotalMoreGrad3Persent =((_teachingresulttotalMoreGrad3/_teachingresulttotalStudent )*100).toFixed(2);
    this.model.teachingresulttotalMoreGrad2Persent =((_teachingresulttotalMoreGrad2/_teachingresulttotalStudent )*100).toFixed(2);

    if(result.sarperformingspecialduties!==undefined){
      this.sarperformingspecialdutiesObj = result.sarperformingspecialduties
      this.model.sarperformingspecialdutiesModel= result.sarperformingspecialduties
    }
    if(result.sarstudentestimateteaching!==undefined){
      this.sarstudentestimateteachingObj= result.sarstudentestimateteaching
      this.model.sarstudentestimateteachingModel= result.sarstudentestimateteaching
    }
    if(result.sarselfassessment!==undefined){
      this.sarselfassessmentObj= result.sarselfassessment
      this.model.sarselfassessmentModel= result.sarselfassessment
    }
    var _sarqualityoflearners_total_P5=0;
    var _sarqualityoflearners_total_P4=0;
    var _sarqualityoflearners_total_P3=0;
    var _sarqualityoflearners_total_P2=0;
    var _sarqualityoflearners_total_P1=0;
    if(result.sarqualityoflearners!==undefined){
      this.sarqualityoflearnersObj= result.sarqualityoflearners
      this.model.sarqualityoflearnersModel= result.sarqualityoflearners
      if(this.model.sarqualityoflearnersModel.choice1 == 5 ){
        _sarqualityoflearners_total_P5+=5;
      }
      if(this.model.sarqualityoflearnersModel.choice1 == 4 ){
        _sarqualityoflearners_total_P4+=4;
      }
      if(this.model.sarqualityoflearnersModel.choice1 == 3 ){
        _sarqualityoflearners_total_P3+=3;
      }
      if(this.model.sarqualityoflearnersModel.choice1 == 2 ){
        _sarqualityoflearners_total_P2+=2;
      }
      if(this.model.sarqualityoflearnersModel.choice1 == 1 ){
        _sarqualityoflearners_total_P1+=1;
      }
      if(this.model.sarqualityoflearnersModel.choice2 == 5 ){
        _sarqualityoflearners_total_P5+=5;
      }
      if(this.model.sarqualityoflearnersModel.choice2 == 4 ){
        _sarqualityoflearners_total_P4+=4;
      }
      if(this.model.sarqualityoflearnersModel.choice2 == 3 ){
        _sarqualityoflearners_total_P3+=3;
      }
      if(this.model.sarqualityoflearnersModel.choice2 == 2 ){
        _sarqualityoflearners_total_P2+=2;
      }
      if(this.model.sarqualityoflearnersModel.choice2 == 1 ){
        _sarqualityoflearners_total_P1+=1;
      }
      if(this.model.sarqualityoflearnersModel.choice3 == 5 ){
        _sarqualityoflearners_total_P5+=5;
      }
      if(this.model.sarqualityoflearnersModel.choice3 == 4 ){
        _sarqualityoflearners_total_P4+=4;
      }
      if(this.model.sarqualityoflearnersModel.choice3 == 3 ){
        _sarqualityoflearners_total_P3+=3;
      }
      if(this.model.sarqualityoflearnersModel.choice3 == 2 ){
        _sarqualityoflearners_total_P2+=2;
      }
      if(this.model.sarqualityoflearnersModel.choice3 == 1 ){
        _sarqualityoflearners_total_P1+=1;
      }
      if(this.model.sarqualityoflearnersModel.choice4 == 5 ){
        _sarqualityoflearners_total_P5+=5;
      }
      if(this.model.sarqualityoflearnersModel.choice4 == 4 ){
        _sarqualityoflearners_total_P4+=4;
      }
      if(this.model.sarqualityoflearnersModel.choice4 == 3 ){
        _sarqualityoflearners_total_P3+=3;
      }
      if(this.model.sarqualityoflearnersModel.choice4 == 2 ){
        _sarqualityoflearners_total_P2+=2;
      }
      if(this.model.sarqualityoflearnersModel.choice4 == 1 ){
        _sarqualityoflearners_total_P1+=1;
      }
      if(this.model.sarqualityoflearnersModel.choice5 == 5 ){
        _sarqualityoflearners_total_P5+=5;
      }
      if(this.model.sarqualityoflearnersModel.choice5 == 4 ){
        _sarqualityoflearners_total_P4+=4;
      }
      if(this.model.sarqualityoflearnersModel.choice5 == 3 ){
        _sarqualityoflearners_total_P3+=3;
      }
      if(this.model.sarqualityoflearnersModel.choice5 == 2 ){
        _sarqualityoflearners_total_P2+=2;
      }
      if(this.model.sarqualityoflearnersModel.choice5 == 1 ){
        _sarqualityoflearners_total_P1+=1;
      }
      if(this.model.sarqualityoflearnersModel.choice6 == 5 ){
        _sarqualityoflearners_total_P5+=5;
      }
      if(this.model.sarqualityoflearnersModel.choice6 == 4 ){
        _sarqualityoflearners_total_P4+=4;
      }
      if(this.model.sarqualityoflearnersModel.choice6 == 3 ){
        _sarqualityoflearners_total_P3+=3;
      }
      if(this.model.sarqualityoflearnersModel.choice6 == 2 ){
        _sarqualityoflearners_total_P2+=2;
      }
      if(this.model.sarqualityoflearnersModel.choice6 == 1 ){
        _sarqualityoflearners_total_P1+=1;
      }
      if(this.model.sarqualityoflearnersModel.choice7 == 5 ){
        _sarqualityoflearners_total_P5+=5;
      }
      if(this.model.sarqualityoflearnersModel.choice7 == 4 ){
        _sarqualityoflearners_total_P4+=4;
      }
      if(this.model.sarqualityoflearnersModel.choice7 == 3 ){
        _sarqualityoflearners_total_P3+=3;
      }
      if(this.model.sarqualityoflearnersModel.choice7 == 2 ){
        _sarqualityoflearners_total_P2+=2;
      }
      if(this.model.sarqualityoflearnersModel.choice7 == 1 ){
        _sarqualityoflearners_total_P1+=1;
      }
      if(this.model.sarqualityoflearnersModel.choice8 == 5 ){
        _sarqualityoflearners_total_P5+=5;
      }
      if(this.model.sarqualityoflearnersModel.choice8 == 4 ){
        _sarqualityoflearners_total_P4+=4;
      }
      if(this.model.sarqualityoflearnersModel.choice8 == 3 ){
        _sarqualityoflearners_total_P3+=3;
      }
      if(this.model.sarqualityoflearnersModel.choice8 == 2 ){
        _sarqualityoflearners_total_P2+=2;
      }
      if(this.model.sarqualityoflearnersModel.choice8 == 1 ){
        _sarqualityoflearners_total_P1+=1;
      }
      if(this.model.sarqualityoflearnersModel.choice9 == 5 ){
        _sarqualityoflearners_total_P5+=5;
      }
      if(this.model.sarqualityoflearnersModel.choice9 == 4 ){
        _sarqualityoflearners_total_P4+=4;
      }
      if(this.model.sarqualityoflearnersModel.choice9 == 3 ){
        _sarqualityoflearners_total_P3+=3;
      }
      if(this.model.sarqualityoflearnersModel.choice9 == 2 ){
        _sarqualityoflearners_total_P2+=2;
      }
      if(this.model.sarqualityoflearnersModel.choice9 == 1 ){
        _sarqualityoflearners_total_P1+=1;
      }
      if(this.model.sarqualityoflearnersModel.choice10 == 5 ){
        _sarqualityoflearners_total_P5+=5;
      }
      if(this.model.sarqualityoflearnersModel.choice10 == 4 ){
        _sarqualityoflearners_total_P4+=4;
      }
      if(this.model.sarqualityoflearnersModel.choice10 == 3 ){
        _sarqualityoflearners_total_P3+=3;
      }
      if(this.model.sarqualityoflearnersModel.choice10 == 2 ){
        _sarqualityoflearners_total_P2+=2;
      }
      if(this.model.sarqualityoflearnersModel.choice10 == 1 ){
        _sarqualityoflearners_total_P1+=1;
      }
    }
    this.model.sarqualityoflearners_total_P5=_sarqualityoflearners_total_P5;
    this.model.sarqualityoflearners_total_P4=_sarqualityoflearners_total_P4;
    this.model.sarqualityoflearners_total_P3=_sarqualityoflearners_total_P3;
    this.model.sarqualityoflearners_total_P2=_sarqualityoflearners_total_P2;
    this.model.sarqualityoflearners_total_P1=_sarqualityoflearners_total_P1;
    this.model.sarqualityoflearners_total_result= (_sarqualityoflearners_total_P5+_sarqualityoflearners_total_P4+_sarqualityoflearners_total_P3+_sarqualityoflearners_total_P2+_sarqualityoflearners_total_P1)/10;
   if( this.model.sarqualityoflearners_total_result>=5){
        this.model.sarqualityoflearners_total_result_value = "ยอดเยี่ยม"
   }
   if( this.model.sarqualityoflearners_total_result>=4 &&this.model.sarqualityoflearners_total_result<5 ){
    this.model.sarqualityoflearners_total_result_value = "ดีเลิศ"
}
if( this.model.sarqualityoflearners_total_result>=3&&this.model.sarqualityoflearners_total_result<4 ){
  this.model.sarqualityoflearners_total_result_value = "ดี"
}
if( this.model.sarqualityoflearners_total_result>=2 &&this.model.sarqualityoflearners_total_result<3){
  this.model.sarqualityoflearners_total_result_value = "ปานกลาง"
}
if( (this.model.sarqualityoflearners_total_result>=1&&this.model.sarqualityoflearners_total_result<2) || this.model.sarqualityoflearners_total_result<1){
  this.model.sarqualityoflearners_total_result_value = "กำลังพัฒนา"
}
   /* if(result.sarqualityevidenceStandard1Good.length!==0){
      this.sarqualityevidenceStandard1GoodObj= result.sarqualityevidenceStandard1Good
    }
    if(result.sarqualityevidenceStandard1Bad.length!==0){
      this.sarqualityevidenceStandard1BadObj= result.sarqualityevidenceStandard1Bad
    }
    if(result.sarqualityevidenceStandard2Good.length!==0){
      this.sarqualityevidenceStandard2GoodObj= result.sarqualityevidenceStandard2Good
    }
    if(result.sarqualityevidenceStandard2Bad.length!==0){
      this.sarqualityevidenceStandard2BadObj= result.sarqualityevidenceStandard2Bad
    }
    if(result.sarqualityevidenceStandard3Good.length!==0){
      this.sarqualityevidenceStandard3GoodObj= result.sarqualityevidenceStandard3Good
    }
    if(result.sarqualityevidenceStandard3Bad.length!==0){
      this.sarqualityevidenceStandard3BadObj= result.sarqualityevidenceStandard3Bad
    }
    if(result.sarqualityevidenceStandard4Good.length!==0){
      this.sarqualityevidenceStandard4GoodObj= result.sarqualityevidenceStandard4Good
    }
    if(result.sarqualityevidenceStandard4Bad.length!==0){
      this.sarqualityevidenceStandard4BadObj= result.sarqualityevidenceStandard4Bad
    }*/
    var _sarstandard2_total_P5=0;
    var _sarstandard2_total_P4=0;
    var _sarstandard2_total_P3=0;
    var _sarstandard2_total_P2=0;
    var _sarstandard2_total_P1=0;

    if(result.sarstandard2!==undefined){
      this.sarstandard2Obj= result.sarstandard2
      this.model.sarstandard2Model= result.sarstandard2
      if(this.model.sarqualityoflearnersModel.choice1 == 5 ){
        _sarstandard2_total_P5+=5;
      }
      if(this.model.sarstandard2Model.choice1 == 4 ){
        _sarstandard2_total_P4+=4;
      }
      if(this.model.sarstandard2Model.choice1 == 3 ){
        _sarstandard2_total_P3+=3;
      }
      if(this.model.sarstandard2Model.choice1 == 2 ){
        _sarstandard2_total_P2+=2;
      }
      if(this.model.sarstandard2Model.choice1 == 1 ){
        _sarstandard2_total_P1+=1;
      }
      if(this.model.sarstandard2Model.choice2 == 5 ){
        _sarstandard2_total_P5+=5;
      }
      if(this.model.sarstandard2Model.choice2 == 4 ){
        _sarstandard2_total_P4+=4;
      }
      if(this.model.sarstandard2Model.choice2 == 3 ){
        _sarstandard2_total_P3+=3;
      }
      if(this.model.sarstandard2Model.choice2 == 2 ){
        _sarstandard2_total_P2+=2;
      }
      if(this.model.sarstandard2Model.choice2 == 1 ){
        _sarstandard2_total_P1+=1;
      }
      if(this.model.sarstandard2Model.choice3 == 5 ){
        _sarstandard2_total_P5+=5;
      }
      if(this.model.sarstandard2Model.choice3 == 4 ){
        _sarstandard2_total_P4+=4;
      }
      if(this.model.sarstandard2Model.choice3 == 3 ){
        _sarstandard2_total_P3+=3;
      }
      if(this.model.sarstandard2Model.choice3 == 2 ){
        _sarstandard2_total_P2+=2;
      }
      if(this.model.sarstandard2Model.choice3 == 1 ){
        _sarstandard2_total_P1+=1;
      }
      if(this.model.sarstandard2Model.choice4 == 5 ){
        _sarstandard2_total_P5+=5;
      }
      if(this.model.sarstandard2Model.choice4 == 4 ){
        _sarstandard2_total_P4+=4;
      }
      if(this.model.sarstandard2Model.choice4 == 3 ){
        _sarstandard2_total_P3+=3;
      }
      if(this.model.sarstandard2Model.choice4 == 2 ){
        _sarstandard2_total_P2+=2;
      }
      if(this.model.sarstandard2Model.choice4 == 1 ){
        _sarstandard2_total_P1+=1;
      }
      if(this.model.sarstandard2Model.choice5 == 5 ){
        _sarstandard2_total_P5+=5;
      }
      if(this.model.sarstandard2Model.choice5 == 4 ){
        _sarstandard2_total_P4+=4;
      }
      if(this.model.sarstandard2Model.choice5 == 3 ){
        _sarstandard2_total_P3+=3;
      }
      if(this.model.sarstandard2Model.choice5 == 2 ){
        _sarstandard2_total_P2+=2;
      }
      if(this.model.sarstandard2Model.choice5 == 1 ){
        _sarstandard2_total_P1+=1;
      }
      if(this.model.sarstandard2Model.choice6 == 5 ){
        _sarstandard2_total_P5+=5;
      }
      if(this.model.sarstandard2Model.choice6 == 4 ){
        _sarstandard2_total_P4+=4;
      }
      if(this.model.sarstandard2Model.choice6 == 3 ){
        _sarstandard2_total_P3+=3;
      }
      if(this.model.sarstandard2Model.choice6 == 2 ){
        _sarstandard2_total_P2+=2;
      }
      if(this.model.sarstandard2Model.choice6 == 1 ){
        _sarstandard2_total_P1+=1;
      }
    }
    this.model.sarstandard2_total_P5=_sarstandard2_total_P5;
    this.model.sarstandard2_total_P4=_sarstandard2_total_P4;
    this.model.sarstandard2_total_P3=_sarstandard2_total_P3;
    this.model.sarstandard2_total_P2=_sarstandard2_total_P2;
    this.model.sarstandard2_total_P1=_sarstandard2_total_P1;
    this.model.sarstandard2_total_result= (_sarstandard2_total_P5+_sarstandard2_total_P4+_sarstandard2_total_P3+_sarstandard2_total_P2+_sarstandard2_total_P1)/6;
   if( this.model.sarstandard2_total_result>=5){
        this.model.sarstandard2_total_result_value = "ยอดเยี่ยม"
   }
   if( this.model.sarstandard2_total_result>=4 &&this.model.sarstandard2_total_result<5 ){
    this.model.sarstandard2_total_result_value = "ดีเลิศ"
}
if( this.model.sarstandard2_total_result>=3&&this.model.sarstandard2_total_result<4 ){
  this.model.sarstandard2_total_result_value = "ดี"
}
if( this.model.sarstandard2_total_result>=2 &&this.model.sarstandard2_total_result<3){
  this.model.sarstandard2_total_result_value = "ปานกลาง"
}
if( (this.model.sarstandard2_total_result>=1&&this.model.sarstandard2_total_result<2) || this.model.sarstandard2_total_result<1){
  this.model.sarstandard2_total_result_value = "กำลังพัฒนา"
}

var _sarstandard3_total_P5=0;
var _sarstandard3_total_P4=0;
var _sarstandard3_total_P3=0;
var _sarstandard3_total_P2=0;
var _sarstandard3_total_P1=0;

      if(result.sarstandard3!==undefined){
      this.sarstandard3Obj= result.sarstandard3
      this.model.sarstandard3Model= result.sarstandard3
      if(this.model.sarqualityoflearnersModel.choice1 == 5 ){
        _sarstandard3_total_P5+=5;
      }
      if(this.model.sarstandard3Model.choice1 == 4 ){
        _sarstandard3_total_P4+=4;
      }
      if(this.model.sarstandard3Model.choice1 == 3 ){
        _sarstandard3_total_P3+=3;
      }
      if(this.model.sarstandard3Model.choice1 == 2 ){
        _sarstandard3_total_P2+=2;
      }
      if(this.model.sarstandard3Model.choice1 == 1 ){
        _sarstandard3_total_P1+=1;
      }
      if(this.model.sarstandard3Model.choice2 == 5 ){
        _sarstandard3_total_P5+=5;
      }
      if(this.model.sarstandard3Model.choice2 == 4 ){
        _sarstandard3_total_P4+=4;
      }
      if(this.model.sarstandard3Model.choice2 == 3 ){
        _sarstandard3_total_P3+=3;
      }
      if(this.model.sarstandard3Model.choice2 == 2 ){
        _sarstandard3_total_P2+=2;
      }
      if(this.model.sarstandard3Model.choice2 == 1 ){
        _sarstandard3_total_P1+=1;
      }
      if(this.model.sarstandard3Model.choice3 == 5 ){
        _sarstandard3_total_P5+=5;
      }
      if(this.model.sarstandard3Model.choice3 == 4 ){
        _sarstandard3_total_P4+=4;
      }
      if(this.model.sarstandard3Model.choice3 == 3 ){
        _sarstandard3_total_P3+=3;
      }
      if(this.model.sarstandard3Model.choice3 == 2 ){
        _sarstandard3_total_P2+=2;
      }
      if(this.model.sarstandard3Model.choice3 == 1 ){
        _sarstandard3_total_P1+=1;
      }
      if(this.model.sarstandard3Model.choice4 == 5 ){
        _sarstandard3_total_P5+=5;
      }
      if(this.model.sarstandard3Model.choice4 == 4 ){
        _sarstandard3_total_P4+=4;
      }
      if(this.model.sarstandard3Model.choice4 == 3 ){
        _sarstandard3_total_P3+=3;
      }
      if(this.model.sarstandard3Model.choice4 == 2 ){
        _sarstandard3_total_P2+=2;
      }
      if(this.model.sarstandard3Model.choice4 == 1 ){
        _sarstandard3_total_P1+=1;
      }
      if(this.model.sarstandard3Model.choice5 == 5 ){
        _sarstandard3_total_P5+=5;
      }
      if(this.model.sarstandard3Model.choice5 == 4 ){
        _sarstandard3_total_P4+=4;
      }
      if(this.model.sarstandard3Model.choice5 == 3 ){
        _sarstandard3_total_P3+=3;
      }
      if(this.model.sarstandard3Model.choice5 == 2 ){
        _sarstandard3_total_P2+=2;
      }
      if(this.model.sarstandard3Model.choice5 == 1 ){
        _sarstandard3_total_P1+=1;
      }
    }

    this.model.sarstandard3_total_P5=_sarstandard3_total_P5;
    this.model.sarstandard3_total_P4=_sarstandard3_total_P4;
    this.model.sarstandard3_total_P3=_sarstandard3_total_P3;
    this.model.sarstandard3_total_P2=_sarstandard3_total_P2;
    this.model.sarstandard3_total_P1=_sarstandard3_total_P1;
    this.model.sarstandard3_total_result= (_sarstandard3_total_P5+_sarstandard3_total_P4+_sarstandard3_total_P3+_sarstandard3_total_P2+_sarstandard3_total_P1)/5;
   if( this.model.sarstandard3_total_result>=5){
        this.model.sarstandard3_total_result_value = "ยอดเยี่ยม"
   }
   if( this.model.sarstandard3_total_result>=4 &&this.model.sarstandard3_total_result<5 ){
    this.model.sarstandard3_total_result_value = "ดีเลิศ"
}
if( this.model.sarstandard3_total_result>=3&&this.model.sarstandard3_total_result<4 ){
  this.model.sarstandard3_total_result_value = "ดี"
}
if( this.model.sarstandard3_total_result>=2 &&this.model.sarstandard3_total_result<3){
  this.model.sarstandard3_total_result_value = "ปานกลาง"
}
if( (this.model.sarstandard3_total_result>=1&&this.model.sarstandard3_total_result<2) || this.model.sarstandard3_total_result<1){
  this.model.sarstandard3_total_result_value = "กำลังพัฒนา"
}


   /*   if(result.sarstandard4!==undefined){
      this.sarstandard4Obj= result.sarstandard4
      this.model.sarstandard4Model= result.sarstandard4
    }*/
   
    if(result.sacompetencyassessment.length!==0){

      this.sacompetencyassessmentObj=result.sacompetencyassessment
    }
     
    if(result.sarcrudassessment.length!==0){

      this.sarcrudassessmentObj=result.sarcrudassessment
    }  
    var _sarcrudassessmentTerm1_totalStudent =0;
    var _sarcrudassessmentTerm1_assessment1 =0;
    var _sarcrudassessmentTerm1_assessment2 =0;
    var _sarcrudassessmentTerm1_assessment3 =0;
    var _sarcrudassessmentTerm1_assessment4 =0;
    if(result.sarcrudassessmentTerm1.length!==0){
      this.sarcrudassessmentTerm1Obj=result.sarcrudassessmentTerm1
      if(this.sarcrudassessmentTerm1Obj.length >0){
        for(var i=0;i<this.sarcrudassessmentTerm1Obj.length; i++){     
          _sarcrudassessmentTerm1_totalStudent += this.sarcrudassessmentTerm1Obj[i].totalStudent;
          _sarcrudassessmentTerm1_assessment1+= this.sarcrudassessmentTerm1Obj[i].assessment1;
          _sarcrudassessmentTerm1_assessment2+= this.sarcrudassessmentTerm1Obj[i].assessment2;
          _sarcrudassessmentTerm1_assessment3+= this.sarcrudassessmentTerm1Obj[i].assessment3;
          _sarcrudassessmentTerm1_assessment4+= this.sarcrudassessmentTerm1Obj[i].assessment4;
         }
        
        }
    }
    this.model.sarcrudassessmentTerm1_assessment1=_sarcrudassessmentTerm1_assessment1;
    this.model.sarcrudassessmentTerm1_assessment2=_sarcrudassessmentTerm1_assessment2;
    this.model.sarcrudassessmentTerm1_assessment3=_sarcrudassessmentTerm1_assessment3;
    this.model.sarcrudassessmentTerm1_assessment4=_sarcrudassessmentTerm1_assessment4;
    this.model.sarcrudassessmentTerm1_totalStudent=_sarcrudassessmentTerm1_totalStudent;  
    this.model.sarcrudassessmentTerm1_assessment1_persent=((_sarcrudassessmentTerm1_assessment1/_sarcrudassessmentTerm1_totalStudent )*100).toFixed(2);
    this.model.sarcrudassessmentTerm1_assessment2_persent=((_sarcrudassessmentTerm1_assessment2/_sarcrudassessmentTerm1_totalStudent )*100).toFixed(2);
    this.model.sarcrudassessmentTerm1_assessment3_persent=((_sarcrudassessmentTerm1_assessment3/_sarcrudassessmentTerm1_totalStudent )*100).toFixed(2);
    this.model.sarcrudassessmentTerm1_assessment4_persent=((_sarcrudassessmentTerm1_assessment4/_sarcrudassessmentTerm1_totalStudent )*100).toFixed(2);

    var _sarcrudassessmentTerm2_totalStudent =0;
    var _sarcrudassessmentTerm2_assessment1 =0;
    var _sarcrudassessmentTerm2_assessment2 =0;
    var _sarcrudassessmentTerm2_assessment3 =0;
    var _sarcrudassessmentTerm2_assessment4 =0;
    if(result.sarcrudassessmentTerm2.length!==0){
      this.sarcrudassessmentTerm2Obj=result.sarcrudassessmentTerm2
      if(this.sarcrudassessmentTerm2Obj.length >0){
        for(var i=0;i<this.sarcrudassessmentTerm2Obj.length; i++){     
          _sarcrudassessmentTerm2_totalStudent += this.sarcrudassessmentTerm2Obj[i].totalStudent;
          _sarcrudassessmentTerm2_assessment1+= this.sarcrudassessmentTerm2Obj[i].assessment1;
          _sarcrudassessmentTerm2_assessment2+= this.sarcrudassessmentTerm2Obj[i].assessment2;
          _sarcrudassessmentTerm2_assessment3+= this.sarcrudassessmentTerm2Obj[i].assessment3;
          _sarcrudassessmentTerm2_assessment4+= this.sarcrudassessmentTerm2Obj[i].assessment4;
         }
        
        }
    }
    this.model.sarcrudassessmentTerm2_assessment1=_sarcrudassessmentTerm2_assessment1;
    this.model.sarcrudassessmentTerm2_assessment2=_sarcrudassessmentTerm2_assessment2;
    this.model.sarcrudassessmentTerm2_assessment3=_sarcrudassessmentTerm2_assessment3;
    this.model.sarcrudassessmentTerm2_assessment4=_sarcrudassessmentTerm2_assessment4;
    this.model.sarcrudassessmentTerm2_totalStudent=_sarcrudassessmentTerm2_totalStudent;  
    this.model.sarcrudassessmentTerm2_assessment1_persent=((_sarcrudassessmentTerm2_assessment1/_sarcrudassessmentTerm2_totalStudent )*100).toFixed(2);
    this.model.sarcrudassessmentTerm2_assessment2_persent=((_sarcrudassessmentTerm2_assessment2/_sarcrudassessmentTerm2_totalStudent )*100).toFixed(2);
    this.model.sarcrudassessmentTerm2_assessment3_persent=((_sarcrudassessmentTerm2_assessment3/_sarcrudassessmentTerm2_totalStudent )*100).toFixed(2);
    this.model.sarcrudassessmentTerm2_assessment4_persent=((_sarcrudassessmentTerm2_assessment4/_sarcrudassessmentTerm2_totalStudent )*100).toFixed(2);
 
    if(result.saractivities.length!==0){

      this.saractivitiesObj=result.saractivities
    }  
    if(result.saradviseclass.length!==0){

      this.saradviseclassObj=result.saradviseclass
    } 

    var _sacompetencyassessmentTerm1_totalStudent =0;
    var _sacompetencyassessmentTerm1_assessment1 =0;
    var _sacompetencyassessmentTerm1_assessment2 =0;
    var _sacompetencyassessmentTerm1_assessment3 =0;
    var _sacompetencyassessmentTerm1_assessment4 =0;
    if(result.sacompetencyassessmentTerm1.length!==0){
      this.sacompetencyassessmentTerm1Obj=result.sacompetencyassessmentTerm1
      if(this.sacompetencyassessmentTerm1Obj.length >0){
        for(var i=0;i<this.sacompetencyassessmentTerm1Obj.length; i++){     
          _sacompetencyassessmentTerm1_totalStudent += this.sacompetencyassessmentTerm1Obj[i].totalStudent;
          _sacompetencyassessmentTerm1_assessment1+= this.sacompetencyassessmentTerm1Obj[i].assessment1;
          _sacompetencyassessmentTerm1_assessment2+= this.sacompetencyassessmentTerm1Obj[i].assessment2;
          _sacompetencyassessmentTerm1_assessment3+= this.sacompetencyassessmentTerm1Obj[i].assessment3;
          _sacompetencyassessmentTerm1_assessment4+= this.sacompetencyassessmentTerm1Obj[i].assessment4;
         }
        
        }
    }
    this.model.sacompetencyassessmentTerm1_assessment1=_sacompetencyassessmentTerm1_assessment1;
    this.model.sacompetencyassessmentTerm1_assessment2=_sacompetencyassessmentTerm1_assessment2;
    this.model.sacompetencyassessmentTerm1_assessment3=_sacompetencyassessmentTerm1_assessment3;
    this.model.sacompetencyassessmentTerm1_assessment4=_sacompetencyassessmentTerm1_assessment4;
    this.model.sacompetencyassessmentTerm1_totalStudent=_sacompetencyassessmentTerm1_totalStudent;  
    this.model.sacompetencyassessmentTerm1_assessment1_persent=((_sacompetencyassessmentTerm1_assessment1/_sacompetencyassessmentTerm1_totalStudent )*100).toFixed(2);
    this.model.sacompetencyassessmentTerm1_assessment2_persent=((_sacompetencyassessmentTerm1_assessment2/_sacompetencyassessmentTerm1_totalStudent )*100).toFixed(2);
    this.model.sacompetencyassessmentTerm1_assessment3_persent=((_sacompetencyassessmentTerm1_assessment3/_sacompetencyassessmentTerm1_totalStudent )*100).toFixed(2);
    this.model.sacompetencyassessmentTerm1_assessment4_persent=((_sacompetencyassessmentTerm1_assessment4/_sacompetencyassessmentTerm1_totalStudent )*100).toFixed(2);


    var _sacompetencyassessmentTerm2_totalStudent =0;
    var _sacompetencyassessmentTerm2_assessment1 =0;
    var _sacompetencyassessmentTerm2_assessment2 =0;
    var _sacompetencyassessmentTerm2_assessment3 =0;
    var _sacompetencyassessmentTerm2_assessment4 =0;
    if(result.sacompetencyassessmentTerm2.length!==0){
      this.sacompetencyassessmentTerm2Obj=result.sacompetencyassessmentTerm2
      if(this.sacompetencyassessmentTerm2Obj.length >0){
        for(var i=0;i<this.sacompetencyassessmentTerm2Obj.length; i++){     
          _sacompetencyassessmentTerm2_totalStudent += this.sacompetencyassessmentTerm2Obj[i].totalStudent;
          _sacompetencyassessmentTerm2_assessment1+= this.sacompetencyassessmentTerm2Obj[i].assessment1;
          _sacompetencyassessmentTerm2_assessment2+= this.sacompetencyassessmentTerm2Obj[i].assessment2;
          _sacompetencyassessmentTerm2_assessment3+= this.sacompetencyassessmentTerm2Obj[i].assessment3;
          _sacompetencyassessmentTerm2_assessment4+= this.sacompetencyassessmentTerm2Obj[i].assessment4;
         }
        
        }
    }
    this.model.sacompetencyassessmentTerm2_assessment1=_sacompetencyassessmentTerm2_assessment1;
    this.model.sacompetencyassessmentTerm2_assessment2=_sacompetencyassessmentTerm2_assessment2;
    this.model.sacompetencyassessmentTerm2_assessment3=_sacompetencyassessmentTerm2_assessment3;
    this.model.sacompetencyassessmentTerm2_assessment4=_sacompetencyassessmentTerm2_assessment4;
    this.model.sacompetencyassessmentTerm2_totalStudent=_sacompetencyassessmentTerm2_totalStudent;  
    this.model.sacompetencyassessmentTerm2_assessment1_persent=((_sacompetencyassessmentTerm2_assessment1/_sacompetencyassessmentTerm2_totalStudent )*100).toFixed(2);
    this.model.sacompetencyassessmentTerm2_assessment2_persent=((_sacompetencyassessmentTerm2_assessment2/_sacompetencyassessmentTerm2_totalStudent )*100).toFixed(2);
    this.model.sacompetencyassessmentTerm2_assessment3_persent=((_sacompetencyassessmentTerm2_assessment3/_sacompetencyassessmentTerm2_totalStudent )*100).toFixed(2);
    this.model.sacompetencyassessmentTerm2_assessment4_persent=((_sacompetencyassessmentTerm2_assessment4/_sacompetencyassessmentTerm2_totalStudent )*100).toFixed(2);


     
    if(result.saruploadimg.length!==0){

      this.saruploadimgObj=result.saruploadimg
    }  
    if(result.sarorderedposition.length!==0){

      this.sarorderedpositionObj=result.sarorderedposition
    }  
    })
  }
  onSave(): void {
    this.onSubmit(this.validateField())
  }
  ngOnInit(): void {
   this.setInitialCreatingData()
  } 
  async onSubmit(isValid:boolean){    
    if(isValid){
      if(this.isUpdateMode){
        this.model.refId= this.model.schoolyear+'-'+ this.model.teacherId;
        this.service.update(this.id,this.model).subscribe(value=>{
          this.backTolist()
        })
      }else{
        this.model.refId= this.model.schoolyear+'-'+ this.model.teacherId;
        this.service.create(this.model).subscribe(value=>{
          this.backTolist()
        })
      }
    }
  }
  backTolist(){    
    this.toList('sar-input')
  }
}
