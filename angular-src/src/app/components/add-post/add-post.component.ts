import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ApiService } from '@services';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent {

  postForm = new FormGroup({
    title: new FormControl(''),
    content: new FormControl('')
  });

  constructor(private apiService: ApiService, private toastyService: ToastrService,
  ) { }

  onSubmit(): void {
    this.apiService.addPost(this.postForm.value)
      .subscribe(() => {
        this.toastyService.success('Post successfully added!');
        this.postForm.reset();
      }, (error) => {
        this.toastyService.error(error.error.message);
      });
  }

}
