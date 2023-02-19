import { Injectable } from "@angular/core";
import { StorageKey } from "../constants/constanst";
import { LoginStat, UserType } from "../constants/enum-system";

@Injectable({
    providedIn: 'root',
  })
  export class UserDataService {
  getTermId():number {
    return +((localStorage.getItem(StorageKey.TERM_ID))?(localStorage.getItem(StorageKey.TERM_ID)):0);
  }
  setTermId(id: string) {
    localStorage.setItem(StorageKey.TERM_ID, id);
  }
  setTermName(termName: string) {
    localStorage.setItem(StorageKey.TERM_NAME, termName);
  }
  setRoomName(roomName: string) {
    localStorage.setItem(StorageKey.ROOMNAME, roomName);
  }
  setClassName(className: string) {
    localStorage.setItem(StorageKey.CLASSNAME, className);
  }
  getTermName():string {
    return localStorage.getItem(StorageKey.TERM_NAME);
  }
  getRoomName():string {
    return localStorage.getItem(StorageKey.ROOMNAME);
  }
  getClassName():string {
    return localStorage.getItem(StorageKey.CLASSNAME);
  }
  getTimeExpire():boolean{
    const timeStr = localStorage.getItem(StorageKey.TIME);
    const currentDate = new Date()
    const oldDate = new Date(timeStr)
    const dateDiff =currentDate.valueOf()-oldDate.valueOf()
    localStorage.setItem(StorageKey.TIME,currentDate.toString());
    if(dateDiff<1800000){
      
      return true
    }
    return false
    

  }
  setCurrentTime(){
    const currentDate = new Date()

    localStorage.setItem(StorageKey.TIME,currentDate.toString());

  }
  setisGuid(isGuid:boolean){
    return localStorage.setItem(StorageKey.IS_GUID,isGuid?'YES':'NO');

  }
  isGuid():boolean{
    return localStorage.getItem(StorageKey.IS_GUID) == "YES";

  }
    setMatchPassword(arg0: string) {
      localStorage.setItem(StorageKey.MATCH_PASSWORD, arg0);
    }
    getMatchPassword() {      
      return localStorage.getItem(StorageKey.MATCH_PASSWORD);
    }
    constructor(){

    }
    getToken(): string {
        return localStorage.getItem(StorageKey.TOKEN);
    }
    setToken(token: string) {      
      localStorage.setItem(StorageKey.TOKEN, token);
    }
    getLoginState(): string {
      return localStorage.getItem(StorageKey.LOGIN_STATE);
    }
    setLoginState(token: LoginStat) {
      localStorage.setItem(StorageKey.LOGIN_STATE, token);
    }
    clearStorage(){
      localStorage.clear()
    }
    getUserFLName(){
      return localStorage.getItem(StorageKey.USERFLNAME);

    }
    setUserFLName(FLName:string){
      return localStorage.setItem(StorageKey.USERFLNAME,FLName);

    }
    setInfoId(infoId:string){
      return localStorage.setItem(StorageKey.INFO_ID,infoId);
    }
    getInfoId(){
      return localStorage.getItem(StorageKey.INFO_ID);
    }
    setUserType(userType:string){
      return localStorage.setItem(StorageKey.USER_TYPE,userType);

    }
    getUserType(){
      return localStorage.getItem(StorageKey.USER_TYPE);

    }
    setCanEdit(canEdit:boolean){
      return localStorage.setItem(StorageKey.CAN_EDIT,canEdit?'YES':'NO');

    }
    getCanEdit():boolean{
      return localStorage.getItem(StorageKey.CAN_EDIT) == "YES";

    }
    getUserId():number{
      return +localStorage.getItem(StorageKey.USER_ID);
    }
    setUserId(userId:any){
       localStorage.setItem(StorageKey.USER_ID,userId.toString());
    }
    isAdmin():boolean{
     return localStorage.getItem(StorageKey.USER_TYPE) == UserType.ADMIN;
   }
   isStudent():boolean{
    return localStorage.getItem(StorageKey.USER_TYPE) ==  UserType.STUDENT;
  }
  isTeacher():boolean{
    return localStorage.getItem(StorageKey.USER_TYPE) ==  UserType.TEACHER;
  }
  isBusiness():boolean{
    return localStorage.getItem(StorageKey.USER_TYPE) ==  UserType.BUSINESS;
  }
  isHuman():boolean{
    return localStorage.getItem(StorageKey.USER_TYPE) ==  UserType.HUMAN;
  }
  isAccount():boolean{
    return localStorage.getItem(StorageKey.USER_TYPE) ==  UserType.ACCOUNT;
  }
  getClassroomTypeId(): number {
    if(localStorage.getItem(StorageKey.CLASSROMM_TYPE_ID)=='null'){
      return -1
    }else{
      return +localStorage.getItem(StorageKey.CLASSROMM_TYPE_ID);
    }

  }
  setClassroomTypeId(id: number = 0) {      
  localStorage.setItem(StorageKey.CLASSROMM_TYPE_ID, `${id}`);
  }
  getClassroomId(): number {
    if(localStorage.getItem(StorageKey.CLASSROMM_ID)=='null'){
      return -1
    }
    return +(localStorage.getItem(StorageKey.CLASSROMM_ID));
  }
  setClassroomId(id: number = 0) {      
  localStorage.setItem(StorageKey.CLASSROMM_ID, `${id}`);
  }
  }