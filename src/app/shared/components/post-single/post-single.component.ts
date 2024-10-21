import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostsService } from '../../services/posts.service';
import { Ipost } from '../../interfaces/posts.interface';

@Component({
  selector: 'app-post-single',
  templateUrl: './post-single.component.html',
  styleUrls: ['./post-single.component.scss']
})
export class PostSingleComponent implements OnInit {
postId !: string;
postObj !: Ipost
arrCat : Array<string> = ['city', 'food', 'nature']
private _postService = inject(PostsService)
  constructor(
    private _route : ActivatedRoute,
    private _router : Router
  ) { }

  ngOnInit(): void {
    this.postId = this._route.snapshot.params['postId'];
    this._postService.getSinglePost(this.postId)
                     .subscribe(res => {
                      console.log(res);
                      
                      if(res){

                        this.postObj = {...res, id : this.postId}
                        console.log(this.postObj);
                      }
                      
                     })
  }

  get getCatg(){
    return this.arrCat[Math.floor(Math.random() * 4)]
  }

  onDeletePost(){
   let getConfirm = confirm(`Are you sure to delete this post`)
   if(getConfirm){
    this._postService.deletePost(this.postId)
                    .subscribe((res : null)=> {
                      console.log(res);
                      this._router.navigate(['/home'])
                    })
   }
  }

}

