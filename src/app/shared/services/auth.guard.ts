import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthenService } from "./auth.service";
import { UserDataService } from "./user-data.service";
@Injectable()
export class AuthGuard implements CanActivate{
    constructor(private readonly authService:AuthenService,private readonly router:Router,private readonly userDataService:UserDataService){
        
    }
    canActivate(route: ActivatedRouteSnapshot, 
                state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

                    // if(state.url == ''){return true}
        if(state.url == '/login'){
            if(this.authService.isLogedIn()){
                if(this.authService.isMatchPassword()){
                    return this.router.navigate(['/change-password'])

                }else{
                    return this.router.navigate(['/student'])

                }
                
            }else{
    
                return true
            }

        }else{
            if(!this.userDataService.getTimeExpire()){
            this.userDataService.clearStorage()
            this.userDataService.setCurrentTime()
            this.router.navigate(['/login'])
            setTimeout(() => {
              window.location.reload();
            }, 100);
            } 
            if(!this.authService.isLogedIn()){
                return this.router.navigate(['/dashboard'])
                
            }else{
                return true
            }
        }

    }

}