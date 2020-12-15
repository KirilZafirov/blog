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

  baseUrl = environment.baseUrl;

  constructor(protected http: HttpClient) {
  }

  get(id: number):Observable<PostResponse> {
    return this.http.get(`${this.baseUrl}posts/${id}`).pipe(
      map((response:any) => ({
        title: response.title,
        body: response.body
      })),
      map(post =>  ({
        post: post,
        status: (!post.body || !post.title) ? 'Both title and body fields should exist' : null
      }))
    );
  }
}
