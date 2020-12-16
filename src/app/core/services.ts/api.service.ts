import { environment } from './../../../environments/environment.prod';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Post, PostResponse } from 'src/app/models/post.model';
import { StateService } from './state.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
 /**
 * Get the base url from the environment file
 */
  baseUrl = environment.baseUrl;

  constructor(protected http: HttpClient) {
  }

   /**
   * Get the post by id: number/numeric value.
   *
   * Map the response to only what we need displayed in the view which is Title and Body ,
   *
   * Map the post to a certain PostResponse with post and status if it is valid or if it is not to display the message why is not.
   */
  get(id: number):Observable<PostResponse> {
    return this.http.get(`${this.baseUrl}posts/${id}`).pipe(
      map((response:any) => ({
        title: response.title,
        body: response.body
      })),
      map(post =>  ({
        post: post,
        status: (!post.body ||!post.body.trim() || !post.title || !post.title.trim()) ? 'Both title and body fields should exist' : null
      }))
    );
  }
}
