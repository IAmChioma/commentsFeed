import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Comment } from '../comment-list/comment';
import { CommentService } from '../../comment.service';

@Component({
  selector: 'app-comment-details',
  templateUrl: './comment-details.component.html',
  styleUrls: ['./comment-details.component.css']
})
export class CommentDetailsComponent implements OnInit {
  comment= new Comment();
  constructor(private _commentService:CommentService,
     private _route:ActivatedRoute,
     private _location:Location) { }

  ngOnInit(): void {
    const id = this._route.snapshot.params["id"];
    this.getComment(id);
  }

  getComment(id:number):void{
    this._commentService.getComment(id).subscribe(response=>{
      this.comment=response;
      console.log(response);
    });
  }

  goBack(){
    this._location.back();
  }
  
}
