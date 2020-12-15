import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { PostResponse } from './../../../models/post.model';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { StateService } from 'src/app/core/services.ts/state.service';
import { Post } from 'src/app/models/post.model';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'blog-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  post$: Observable<Post>;

  constructor(private state: StateService , private route : ActivatedRoute) {
    this.post$ = this.route.paramMap.pipe(
        map((params: ParamMap) => +params.get('id')),
        switchMap((id) => this.state.getPost(id)),
        map((post: PostResponse) => post.post)
      )
  }


  ngOnInit() {
  }

}
