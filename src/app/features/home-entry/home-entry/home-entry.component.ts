
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { StateService } from 'src/app/core/services.ts/state.service';
import { UiMetaService } from 'src/app/core/services.ts/ui-meta.service';
import { PostFormModel } from 'src/app/models/post.model';
@Component({
  selector: 'blog-home-entry',
  templateUrl: './home-entry.component.html',
  styleUrls: ['./home-entry.component.scss'],
})
export class HomeEntryComponent implements OnInit {

  /**
   * Form group that is going to catch the user request to the a certain post with and id of integer
   */

  form: FormGroup = new FormGroup({
    postId: new FormControl(null , [Validators.required , Validators.min(0)]),
  });


  /**
   * Observable that is meant to catch if there is any error with that request or that something went wrong while making the request
   */
  msg$: Observable<string>;


  /**
   * Constructor
   *
   * Use the UiMetaService in order to setup meta tags information about the page
   */
  constructor(private state: StateService ,  private uiMeta: UiMetaService) {
    this.uiMeta.setMetaData({
      title: 'Blog post finder',
      description: 'You can search for a blog post by id and see if you can find anything that you like!'
  })
   }


  /**
   * Initialize the msg$ Observable and each time there is an error with the request update the formValue of postId with null
   * so that the user does not have to clear the value by himself
   */
  ngOnInit() {
    this.msg$ = this.state.error$.pipe(
      tap(() => this.form.get('postId').patchValue(null))
    );
  }


  /**
   * Submit function that handles the form submit event.
   *
   * It makes a call to the api to check if the post is valid.
   *
   * If the post is valid we should be successfully redirected to the detail page of the post
   *
   * *Note: We do not need to unsubscribe from this observable because it happens only once.
   */
  onSubmit(formValue: PostFormModel) {
    this.state.isValid(formValue.postId).subscribe();
  }
}
