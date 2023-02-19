import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { SelectFieldOption } from "../models/configs";
import { SearchParameter } from "../models/search-param-model";
import { NotificationService } from "./notification.service";
import { UserDataService } from "./user-data.service";

@Injectable({
    providedIn: 'root',
  })
  export class GatewayService{
      base_url:string=environment.API_URL
    constructor(private http: HttpClient,private readonly notificationService:NotificationService,
        private readonly userDateService:UserDataService
        ){
        
    }
    getHeader():HttpHeaders{
      const token = this.userDateService.getToken()

        const header = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        })
        return header
    }
    getUrl(url:string){
      return this.base_url + url
    }
    get(url: string): Observable<any> {
        // this.getFilterUrlToRelatedKey(url);
        // return this.http.get(apiUrl, )
        const $result = this.http.get(this.base_url + url,{ headers: this.getHeader() });
        return new Observable((observer) => {
          $result.subscribe(
            {
              complete: () => {  
                observer.complete()
              },
              error: (err) => {     
                observer.next(err)
  
                this.notificationService.showErrorMessageFromResponse(err);
              },  
              next: (res:any) => {             
                observer.next(res.data)
            }
          }
          );
        });
      }
    getPdf(url: string): Observable<any> {
        // this.getFilterUrlToRelatedKey(url);
        // return this.http.get(apiUrl, )
        const $result = this.http.get(this.base_url + url,{responseType: 'arraybuffer', headers: this.getHeader() });
        return new Observable((observer) => {
          $result.subscribe(
            {
              complete: () => {  
                observer.complete()
              },
              error: (err) => {     
                observer.next(err)
  
                this.notificationService.showErrorMessageFromResponse(err);
              },  
              next: (res:any) => {             
                observer.next(res)
            }
          }
          );
        });
      }
      postPdf(url: string, data: any): Observable<any> {
        const $result = this.http.post(this.base_url + url, data,{responseType: 'arraybuffer', headers: this.getHeader() });
        return new Observable((observer) => {
          $result.subscribe(
            {
              complete: () => {  
                observer.complete()
              },
              error: (err) => {     
                observer.next(err)
  
                this.notificationService.showErrorMessageFromResponsePdf(err);
              },  
              next: (res:any) => {             
                observer.next(res)
              this.notificationService.showMessageFromResponse(res)
            }
          }
          );
        });
      }
    create(url: string, data: any): Observable<any> {
      const $result = this.http.post(this.base_url + url, data,{ headers: this.getHeader() });
      return new Observable((observer) => {
        $result.subscribe(
          {
            complete: () => {  
              observer.complete()
            },
            error: (err) => {     
              observer.next(err)

              this.notificationService.showErrorMessageFromResponse(err);
            },  
            next: (res:any) => {             
              observer.next(res.data)
            this.notificationService.showMessageFromResponse(res)
          }
        }
        );
      });
    }
    
    validate(url: string, data: any): Observable<any> {
      const $result = this.http.post(this.base_url + url, data,{ headers: this.getHeader() });
      return new Observable((observer) => {
        $result.subscribe(
          {
            complete: () => {  
              observer.complete()
            },
            error: (err) => {     
              observer.next(err)

              this.notificationService.showErrorMessageFromResponse(err);
            },  
            next: (res:any) => {             
              observer.next(res.data)
          }
        }
        );
      });
    }
    update(url: string, data: any): Observable<any> {
      const $result = this.http.put(this.base_url + url, data,{ headers: this.getHeader() });
      return new Observable((observer) => {
        $result.subscribe(
          {
            complete: () => {  
              observer.complete()
            },
            error: (err) => {     
              observer.next(err)

              this.notificationService.showErrorMessageFromResponse(err);
            },  
            next: (res:any) => {             
              observer.next(res.data)
            this.notificationService.showMessageFromResponse(res)
          }
        }
        );
      });
    }
    delete(url: string): Observable<any> {
      
      const $result = this.http.delete(this.base_url + url,{ headers: this.getHeader() });
      return new Observable((observer) => {
        $result.subscribe(
          {
            complete: () => {  
              observer.complete()
            },
            error: (err) => {     
              observer.next(err)

              this.notificationService.showErrorMessageFromResponse(err);
            },  
            next: (res:any) => {             
              observer.next(res.data)
            this.notificationService.showMessageFromResponse(res)
          }
        }
        );
      });
    }
    list(url: string, searchParameter: SearchParameter): Observable<any> {    
      const $result = this.http.post(this.base_url + url, searchParameter,{ headers: this.getHeader() });
      return new Observable((observer) => {
        $result.subscribe(
          {
            complete: () => {  
              observer.complete()
            },
            error: (err) => {     
              observer.next(err)

              this.notificationService.showErrorMessageFromResponse(err);
            },  
            next: (res:any) => {             
              observer.next(res.data)
          }
        }
        );
      });
    }
    listExcelTh(url: string, searchParameter: SearchParameter,bindingField:SelectFieldOption[]): Observable<any> {    
      const $result = this.http.post(this.base_url + url, {...searchParameter,bindingField:bindingField},{ headers: this.getHeader() });
      return new Observable((observer) => {
        $result.subscribe(
          {
            complete: () => {  
              observer.complete()
            },
            error: (err) => {     
              observer.next(err)

              this.notificationService.showErrorMessageFromResponse(err);
            },  
            next: (res:any) => {             
              observer.next(res.data)
          }
        }
        );
      });
    }
  }