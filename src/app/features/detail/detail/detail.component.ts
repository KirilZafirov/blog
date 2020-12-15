import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { StateService } from 'src/app/core/services.ts/state.service';
import { Post } from 'src/app/models/post.model';

@Component({
  selector: 'blog-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  constructor(private state: StateService) { }

  post$: Observable<Post>;
  ngOnInit() {
   this.post$ = this.state.activePost$
  }

}
