
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { StateService } from 'src/app/core/services.ts/state.service';
import { PostFormModel } from 'src/app/models/post.model';
import { Router } from '@angular/router';

@Component({
  selector: 'blog-home-entry',
  templateUrl: './home-entry.component.html',
  styleUrls: ['./home-entry.component.scss'],
})
export class HomeEntryComponent implements OnInit {

  form: FormGroup = new FormGroup({
    postId: new FormControl(null , [Validators.required , Validators.min(0)]),
  });

  msg$: Observable<string>;
  constructor(private state: StateService, private router: Router) { }

  ngOnInit() {
    this.msg$ = this.state.error$.pipe(
      tap(() => this.form.get('postId').patchValue(null))
    );
  }

  onSubmit(formValue: PostFormModel) {
    this.state.isValid(formValue.postId).subscribe();
  }
}
