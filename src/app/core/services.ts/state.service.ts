import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Post } from 'src/app/models/post.model';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  private activePost: BehaviorSubject<Post>  = new BehaviorSubject<Post>(null);

  activePost$: Observable<Post>;

  constructor() {
    this.activePost$ = this.activePost.asObservable();
  }

  setActivePost(post: Post): void {
    this.activePost.next(post);
  }
}
