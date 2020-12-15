import { PostResponse } from './../../../models/post.model';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ApiService } from 'src/app/core/services.ts/api.service';
import { StateService } from 'src/app/core/services.ts/state.service';
import { Post, PostFormModel } from 'src/app/models/post.model';

@Component({
  selector: 'blog-home-entry',
  templateUrl: './home-entry.component.html',
  styleUrls: ['./home-entry.component.scss']
})
export class HomeEntryComponent implements OnInit {

  form: FormGroup = new FormGroup({
    postId: new FormControl(null , [Validators.required , Validators.min(0)]),
  });

  msg$: Observable<string>;
  constructor(private state: StateService) { }

  ngOnInit() {
    this.msg$ = this.state.error$.pipe(
      tap(() => this.form.get('postId').patchValue(null))
    );
  }

  onSubmit(formValue: PostFormModel) {
    this.state.getPost(formValue.postId).subscribe();
  }
}
