import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Import Form-related classes
import { PostService } from 'src/app/service/post.service';
import { CommentService } from 'src/app/service/comment.service'; // Import CommentService

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.css']
})
export class ViewPostComponent implements OnInit {

  postId: string = ''; // Initialize postId
  postData: any = {}; // Provide default value
  commentForm!: FormGroup;
  comments: any;

  constructor(
    private postService: PostService,
    private activatedRoute: ActivatedRoute,
    private matSnackBar: MatSnackBar,
    private fb: FormBuilder,
    private commentService: CommentService
  ) { }

  ngOnInit() {
    // Get postId from route params
    this.postId = this.activatedRoute.snapshot.params['id'];

    // Initialize the form group
    this.commentForm = this.fb.group({
      postedBy: [null, Validators.required],
      content: [null, Validators.required],
    });

    // Fetch post data
    this.getPostById();
  }

  publishComment() {
    const postedBy = this.commentForm.get('postedBy')?.value;
    const content = this.commentForm.get('content')?.value; // Fixed content reference

    this.commentService.createComment(this.postId, postedBy, content).subscribe({
      next: () => {
        this.matSnackBar.open("Comment published successfully", "OK", { duration: 3000 });
        this.commentForm.reset(); // Reset form after publishing
      },
      error: () => {
        this.matSnackBar.open("Something went wrong!!!", "OK", { duration: 3000 });
      }
    });
  }

  getPostById() {
    this.postService.getPostById(Number(this.postId)).subscribe({
      next: (res) => {
        this.postData = res;
        this.getCommentByPost();
        console.log(res);
      },
      error: () => {
        this.matSnackBar.open("Something went wrong!!!", "OK", { duration: 3000 });
      }
    });
  }

getCommentByPost(){
  this.commentService.getAllCommentByPost(Number(this.postId)).subscribe(res=>{
    this.comments = res;
  }, error=> {
    this.matSnackBar.open("something went wrong!!!", "OK")
  })
}

likePost(){
  this.postService.likePost(Number(this.postId)).subscribe(res=>{
    this.getPostById();
  }, error=> {
    this.matSnackBar.open("something went wrong!!!", "OK")
  })
}

}
