import { environment } from './../../../environments/environment.prod';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Post } from 'src/app/models/post.model';
import { StateService } from './state.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl = environment.baseUrl;

  constructor(protected http: HttpClient , private state: StateService) {
  }

  get(id: number):Observable<Post> {
    return this.http.get(`${this.baseUrl}posts/${id}`).pipe(
      map((response:any) => ({
        title: response.title,
        body: response.body
      })),
      tap((post:Post) => this.state.setActivePost(post))
    );
  }
}
