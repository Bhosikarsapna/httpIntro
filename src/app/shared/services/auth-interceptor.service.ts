import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, finalize, Observable } from 'rxjs';
import { LoaderService } from './loader.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor{

  constructor(
    private _loaderService : LoaderService
  ){}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this._loaderService.loadingStatus$.next(true)
    const authReqClone = req.clone({ // clone >> duplicate >> for headers

      setHeaders : {
        'AuthTokenTest' : 'JWT token from local storage',
        'Content-type' : 'application/json'
      }
    })
    return next.handle(authReqClone) // next process after headers
               .pipe(
                delay(1500),
                finalize(() => {
                  this._loaderService.loadingStatus$.next(false)
                })
               )
  }
}
