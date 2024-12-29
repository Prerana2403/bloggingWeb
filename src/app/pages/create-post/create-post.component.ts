import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import {Router} from '@angular/router'
import { PostService } from 'src/app/service/post.service';
@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent {


postForm!: FormGroup;
tags: string[] = [];

constructor(private fb: FormBuilder,
  private router: Router,
  private snakBar: MatSnackBar,
  private postService: PostService
){}



ngOnit(){
  this.postForm = this.fb.group({
    name :[null, Validators.required],
    content: [null, [Validators.required, Validators.maxLength(5000)]],
    img: [null, Validators.required],
    postedBy: [null, Validators.required]
  })
}

add(event: any): void {
  // Logic to add a new tag
  const value = (event.value || '').trim();
  if (value) {
    this.tags.push(value);
  }
  event.chipInput!.clear(); // Clear the input field
}


remove(tag: any): void {
  // Logic to remove a tag
  
  const index = this.tags.indexOf(tag);
  if (index >= 0) {
    this.tags.splice(index, 1);
  }
}

createPost(){
  const data = this.postForm.value;
  data.tags = this.tags;

  this.postService.createNewPost(data).subscribe(res=>{
    this.snakBar.open("Post created Successfully !!","OK");
    this.router.navigateByUrl("/");
  }, error=>{
    this.snakBar.open("something Went wrong !!!", "OK")
  })
}


}
