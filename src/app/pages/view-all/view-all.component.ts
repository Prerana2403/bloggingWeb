import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PostService } from 'src/app/service/post.service';

@Component({
  selector: 'app-view-all',
  templateUrl: './view-all.component.html',
  styleUrls: ['./view-all.component.css']
})
export class ViewAllComponent {
  [x: string]: any;
  constructor(private postService: PostService,
    private snackBar : MatSnackBar
  ) {}


    allPosts: { 
        name: string;
        postedOn: string;
        date: Date;
        img: string;
        content: string;
        likeCount: number;
        commentCount: number;
        id: string;
    }[] = [
        // Example data
        {
            name: 'Madhavi',
            postedOn: 'Admin',
            date: new Date(),
            img: 'https://example.com/image.jpg',
            content: 'This is an example post.',
            likeCount: 5,
            commentCount: 3,
            id: '1'
        }
    ];


  ngOnInit(){
    this.getAllPosts();
  }

  getAllPosts(){
    this.postService.getAllPosts().subscribe(res=>{
      console.log(res);
      this['allPosts'] = res;//idhar change kiya he
    }, error=>{
      this.snackBar.open("Error while fetching posts !!","OK");
    })  
  }

}
