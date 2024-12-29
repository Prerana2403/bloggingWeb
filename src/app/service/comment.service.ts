import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const BASIC_URL = 'http://your-api-url.com/';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) { }
  
  createComment(postId: string, postNumber: number, postedBy: string): Observable<any> {
    const params = {
      postId: postId,
      postedBy: postedBy
    }
    return this.http.post(BASIC_URL + `api/comment/create`, ContentVisibilityAutoStateChangeEvent, {params});
  }


getAllCommentByPost(postId:number): Observable<any> {
    return this.http.get(BASIC_URL + `api/comments/${postId}`);
  }

}
