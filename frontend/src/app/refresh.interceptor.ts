import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthService } from 'src/services/auth.service';


@Injectable()
export class RefreshInterceptor implements HttpInterceptor {
  token!: Object;
  constructor(private service:AuthService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse) {
          if (error.error instanceof ErrorEvent) {
            console.log('error Event');
          } else {
            switch (error.status) {
              case 419:

                this.service.getAccessToken().subscribe({
                  next:(res:any)=>{
                         localStorage.setItem("token" , res.token)
                  },
                  error:(error)=>{
                    console.log("error in interceptor"+error)
                  }
                })
            }
          }
        } else {
          console.log('error occured');
        }
        return throwError(() => {
          new Error(error.statusText);
        });
      })
    );
  }
}
