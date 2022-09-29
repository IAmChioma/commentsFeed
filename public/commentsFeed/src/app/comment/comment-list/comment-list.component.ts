import { Component, OnInit } from '@angular/core';
import { CommentService } from '../../comment.service';
import { Comment } from './comment';
@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css']
})
export class CommentListComponent implements OnInit {
  
  comments!: Comment[];
  allComments!: Comment[];
  offset = 0;
  totalComments = 0;
  count = 2;
  constructor(private _commentService: CommentService) { }

  ngOnInit(): void {
    this.getComments();
  }

  getComments():void{
    this._commentService.getComments().subscribe(response=>{
      this.allComments = response;
      this.totalComments = response.length;
      this.comments= this.allComments.slice(this.offset).slice(0, this.count)
  
    });


  }

  refreshComments(): void{
    this.getComments();
  }

  deleteComment():void{
    this._commentService.deleteComments().subscribe(response=>{
      this.comments = response;
      console.log(response);
    });
  }

  getNext():void{
    this.offset+=this.count;
    this.comments = this.allComments.slice(this.offset).slice(0, this.count)

  
  }

  getPrev():void{
    this.offset-=this.count;
    if(this.offset<=0){
      this.offset=0;
    }
  
    this.comments = this.allComments.slice(this.offset).slice(0, this.count)
    console.log( this.allComments,this.comments, this.totalComments);
  
  }
}
