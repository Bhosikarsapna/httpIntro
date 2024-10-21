import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PostsService } from '../../services/posts.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Ipost } from '../../interfaces/posts.interface';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent implements OnInit {
postForm !: FormGroup;
isInEditMode : boolean = false
postId !: string; 

  constructor(
    private _postsService : PostsService,
    private _route : ActivatedRoute,
    private _router : Router) { }

  ngOnInit(): void {
    this.createPostForm()
    this.postId = this._route.snapshot.params['postId'];
    console.log(this.postId);
    if(this.postId){
      this.isInEditMode = true
      this._postsService.getSinglePost(this.postId)
                        .subscribe(res => {
                          console.log(res);
                          this.postForm.patchValue(res)
                        })
    }
  }

  createPostForm(){
    this.postForm = new FormGroup({
      title : new FormControl(null, [Validators.required]),
      body : new FormControl(null, [Validators.required]),
      userId : new FormControl(null, [Validators.required])
    })
  }

  onSubmitAddPost(){
   if(this.postForm.valid){
   let newPostAdd = this.postForm.value;
   console.log(newPostAdd);
   this._postsService.addNewPost(newPostAdd)
                     .subscribe(res => {
                      console.log(res);
                      
                     })
   this.postForm.reset()
   }
    
  }

  onPostUpdate(){
    if(this.postForm.valid){
      let updatedObj  = this.postForm.value;
      console.log(updatedObj);
      
       this._postsService.updatedPostObj(updatedObj, this.postId)  
                         .subscribe(res => {
                          console.log(res);
                          this._router.navigate(['/home'])
                         })              
    }
  }

  


}

