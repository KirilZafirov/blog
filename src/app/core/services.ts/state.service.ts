import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Post, PostResponse } from 'src/app/models/post.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  private error: BehaviorSubject<string>  = new BehaviorSubject<string>(null);
  private activePost: BehaviorSubject<PostResponse>  = new BehaviorSubject<PostResponse>(null);
  activePost$: Observable<PostResponse>;
  error$: Observable<string>;
  constructor(private api: ApiService, private router: Router) {
    this.error$ = this.error.asObservable();
    this.activePost$ = this.activePost.asObservable();
  }

  getPost(id: number):Observable<PostResponse> {
    return this.api.get(id).pipe(
      tap((res:PostResponse) => {
        this.activePost.next(res);
        if(res.status) {
          this.error.next(res.status);
          this.router.navigateByUrl('/');
        } else {
          this.error.next(null);
        }
      })
    )
  };

  setError(errorMsg: string) {
    this.error.next(errorMsg);
  }
}
