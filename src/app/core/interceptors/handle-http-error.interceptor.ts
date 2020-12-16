import { StateService } from 'src/app/core/services.ts/state.service';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class HandleHttpErrorInterceptor implements HttpInterceptor {
  constructor(private state: StateService , private router: Router) {}

  /**
   * Intercept each http error and for each error fill the state error msg
   */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 404) {
          this.state.setError('You are trying to reach a post that does not exist');
          this.router.navigateByUrl('/');
          return throwError(error);
        }
         this.router.navigateByUrl('/');
         this.state.setError('There was some error with the request that you made');
          return throwError(error);
        }
        )
    );
  }
}
