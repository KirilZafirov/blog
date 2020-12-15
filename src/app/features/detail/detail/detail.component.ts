import { ActivatedRoute, ParamMap } from '@angular/router';
import { PostResponse } from './../../../models/post.model';
import { Observable } from 'rxjs';
import { Component } from '@angular/core';
import { StateService } from 'src/app/core/services.ts/state.service';
import { Post } from 'src/app/models/post.model';
import { map, switchMap } from 'rxjs/operators';
import { Location } from '@angular/common';
@Component({
  selector: 'blog-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent {

  post$: Observable<Post>;

  constructor(private state: StateService , private route : ActivatedRoute , private location: Location) {
    this.post$ = this.route.paramMap.pipe(
        map((params: ParamMap) => +params.get('id')),
        switchMap((id) => this.state.getPost(id)),
        map((post: PostResponse) => post.post)
      )
  }

  goBack() {
    this.location.back();
  }
}
