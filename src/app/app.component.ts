import { Component, OnInit } from '@angular/core';
import { LoaderService } from './shared/services/loader.service';
import { AuthInterceptorService } from './shared/services/auth-interceptor.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'httpIntro';
  isLoading !: boolean 

  constructor(
    private _loaderService : LoaderService,
    private _authInterceptor : AuthInterceptorService
  ){}

  ngOnInit(): void {
    this._loaderService.loadingStatus$
                       .subscribe(res => { // observable
                        this.isLoading = res
                        // this.isLoading = true
                       })
  }
  
}
