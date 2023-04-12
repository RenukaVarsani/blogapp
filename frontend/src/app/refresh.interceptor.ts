import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from 'src/services/auth.service';

//on working
@Injectable()
export class RefreshInterceptor implements HttpInterceptor {

  constructor(private service:AuthService) {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    return next.handle(req).pipe(

      catchError((error: HttpErrorResponse) => {

         let errorMsg = '';

         if (error.error instanceof ErrorEvent &&  error.status === 401) {

          return this.handle401Error(req, next);
        }
         }}))

  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (error.status == '403') {
      return this.service.getRefreshToken()

    }

  }
}
