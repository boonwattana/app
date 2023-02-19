import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ElementRef, Renderer2 } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';
import { BaseItemComponent } from 'src/app/shared/component/base-item/base-item.component';
import { BaseItemInterface } from 'src/app/shared/interface/base-item-interface';

import { Observable } from 'rxjs';
import { UserDataService } from 'src/app/shared/services/user-data.service';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable()

export class TokenInterceptor implements HttpInterceptor {

  constructor(public userDataService: UserDataService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.userDataService.getToken()}`
      }
    });

    return next.handle(request);
  }
}


@Component({
  selector: 'app-t01',
  templateUrl: './t01.component.html',
  styleUrls: ['./t01.component.scss']
})
export class T01Component implements OnInit {

  username: any;
  password: any;
  tk: any;
  constructor(
    private http: HttpClient,
    private router: Router,
    private readonly userDataService: UserDataService
  ) { }


  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.userDataService.getToken()}`
      }
    });

    return next.handle(request);
  }


  ngOnInit(): void {
    this.username = "bwnadmin";
    this.password = "adminbwn";
    this.tk = this.userDataService.getToken();
    const authToken = this.userDataService.getToken();



  }
  login() {
    let jsonFrm = { username: "bwnadmin", password: "adminbwn" };

    //     public headers = new Headers({ 'Content-Type': 'application/json' });
    // public options = new RequestOptions({ headers: headers }); 

    this.http.get('http://203.159.93.121:3000/api/teacher/item/1')
      .subscribe(
        data => {
        },
        error => {
        }
      );
  }
}
