import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/core/services.ts/api.service';
import { PostFormModel } from 'src/app/models/post.model';

@Component({
  selector: 'blog-home-entry',
  templateUrl: './home-entry.component.html',
  styleUrls: ['./home-entry.component.scss']
})
export class HomeEntryComponent implements OnInit {

  form: FormGroup = new FormGroup({
    postId: new FormControl(null , [Validators.required , Validators.min(0)]),
  });

  constructor(private api: ApiService) { }

  ngOnInit() {
  }

  onSubmit(formValue: PostFormModel) {
    this.api.get(formValue.postId);
    this.form.get('postId').patchValue(null);
  }
}
