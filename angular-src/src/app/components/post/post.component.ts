import { Component, OnInit } from '@angular/core';
import { ApiService } from '@services';
import { Subject, } from 'rxjs';
import { Post } from '../../../../../shared/models';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})

export class PostComponent implements OnInit {

  posts: Post[];
  search = new Subject<string>();

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getPosts().subscribe(data => {
      this.posts = data;
    }, error => {
      console.log(error);
    });
  }

  searchPosts(search: string): void {
    if (search) {
      this.apiService.getPost(search).subscribe(data => {
        this.posts = [];
        this.posts.push(data);
      }
        , error => {
          console.log(error);
        }
      );
    } else {
      this.apiService.getPosts().subscribe(data => {
        this.posts = data;
      }
        , error => {
          console.log(error);
        }
      );
    }

  }

}
