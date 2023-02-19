import { Injectable } from "@angular/core";
import { LoginStat } from "../constants/enum-system";
import { UserDataService } from "./user-data.service";
@Injectable()
export class AuthenService {
    constructor(private readonly userDataService:UserDataService){

    }
    isLogedIn():boolean{
        const userState = this.userDataService.getLoginState()

        const matchPassword = this.userDataService.getLoginState()
        if(userState==LoginStat.LOGIN){
            return true
        }else{
            return false
        }
    }
    isMatchPassword():boolean{
        const matchPassword = this.userDataService.getMatchPassword()
        return matchPassword=='YES'
    }
}