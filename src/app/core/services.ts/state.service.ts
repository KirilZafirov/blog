
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { Post } from 'src/app/models/post.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  private error: BehaviorSubject<string>  = new BehaviorSubject<string>(null);
  error$: Observable<string>;

  constructor(private api: ApiService, private router: Router) {
    this.error$ = this.error.asObservable();
  }
    /**
   * Use the Api Service to Get the post by id: number/numeric value.
   *
   * filter the response based on the status message of the response,
   *
   * If there is a status message navigate the user to the Home-Entry screen , and fill in the error message
   *
   *  If there is no status message empty the error message and let the observable pass!
   */
  getPost(id: number):Observable<Post> {
    return this.api.get(id).pipe(
      filter((post:Post) => {
        if((!post.body ||!post.body.trim() || !post.title || !post.title.trim())) {
          this.error.next('Both title and body fields should exist');
          this.router.navigateByUrl('/');
          return false;
        } else {
          this.error.next(null);
          return true;
        }
      })
    )
  };

    /**
   * Get the post by id: number/numeric value and Check it's validity.
   *
   * If both Title and body exist and are not contained of only empty spaces( empty string),
   *
   * The post is valid and navigate the user to the detail screen for that post
   *
   * Else set the error message that the post is not valid
   */
  isValid(id: number):Observable<boolean> {
    return this.api.get(id).pipe(
      map((post:Post) => {
        if((!post.body ||!post.body.trim() || !post.title || !post.title.trim())) {
          this.error.next('Both title and body fields should exist');
          return false;
        } else {
          this.error.next(null);
          return true;
        }
      }),
      filter(isValid => isValid),
      tap(() => this.router.navigateByUrl(`detail/${id}`))
    )
  };

    /**
     * Set information message about required post validity.
     */

  setError(errorMsg: string) {
    this.error.next(errorMsg);
  }
}
