import { Component, OnInit } from '@angular/core';
import { Ipost } from '../../interfaces/posts.interface';
import { PostsService } from '../../services/posts.service';
import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'app-post-dashboard',
  templateUrl: './post-dashboard.component.html',
  styleUrls: ['./post-dashboard.component.scss']
})
export class PostDashboardComponent implements OnInit {
allPosts !: Array<Ipost>
  constructor(private _postsService : PostsService,
              private _loaderService : LoaderService
  ) { }

  ngOnInit(): void {
    this._postsService.getAllPosts()
                      .subscribe(res => {
                        console.log(res);
                        this.allPosts = res;
                        this._loaderService.loadingStatus$

                        .next(false)
                      })
  }

}
