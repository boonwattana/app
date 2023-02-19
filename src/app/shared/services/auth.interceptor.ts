import {
  HttpClient,
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, switchMap, finalize } from 'rxjs/operators';
import { LoaderService } from './loader.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    public loaderService: LoaderService
  ) {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    this.loaderService.addLoad()
    
    return next.handle(req).pipe(
      finalize(() => {
        this.loaderService.addSuccess()

      })
    );
    
  }

}
