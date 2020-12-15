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

  private activePost: BehaviorSubject<Post>  = new BehaviorSubject<Post>(null);
  private error: BehaviorSubject<string>  = new BehaviorSubject<string>(null);
  activePost$: Observable<Post>;
  error$: Observable<string>;
  constructor(private api: ApiService , private router: Router) {
    this.activePost$ = this.activePost.asObservable();
    this.error$ = this.error.asObservable();
  }

  getPost(id: number):Observable<PostResponse> {
    return this.api.get(id).pipe(
      tap((res:PostResponse) => {
        if(res.status) {
          this.error.next(res.status);
        } else {
          this.error.next(null);
          this.router.navigateByUrl(`detail/${id}`);
        }
      }),
      catchError( err => {
        this.error.next('You are trying to reach a post that does not exist');
        return throwError(err)
      })
    )
  };

  setActivePost(post: Post): void {
    this.activePost.next(post);
  }
}
