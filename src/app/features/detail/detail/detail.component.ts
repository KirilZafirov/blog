import { ActivatedRoute, ParamMap } from '@angular/router';
import { PostResponse } from './../../../models/post.model';
import { Observable } from 'rxjs';
import { Component } from '@angular/core';
import { StateService } from 'src/app/core/services.ts/state.service';
import { Post } from 'src/app/models/post.model';
import { concatMap, map, switchMap } from 'rxjs/operators';
import { Location } from '@angular/common';
@Component({
  selector: 'blog-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent {

  /**
   * post$ Observable which is going to serve as a placeholder for the active/selected post
   */
  post$: Observable<Post>;


  /**
   * Initialize the post$ Observable in the constructor with using the route params to get the id for the current post
   *
   *  When we get the param id from the route param we make request to get the active post details
   *
   * and we are mapping the PostResponse to be of type post
   */
  constructor(private state: StateService , private route : ActivatedRoute , private location: Location) {
    this.post$ = this.route.paramMap.pipe(
        map((params: ParamMap) => +params.get('id')),
        concatMap((id) => this.state.getPost(id)),
        map((post: PostResponse) => post.post)
      )
  }

   /**
   * Use location service to navigate back
   */
  goBack() {
    this.location.back();
  }
}
