import { Component, Input, OnInit } from '@angular/core';
import { Ipost } from '../../interfaces/posts.interface';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss']
})
export class PostCardComponent implements OnInit {
@Input() fromDashBoard !: Ipost
  constructor() { }

  ngOnInit(): void {
  }

}
