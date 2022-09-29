import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CommentService } from '../../comment.service';
import { Comment } from '../comment-list/comment';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-add-comment-template',
  templateUrl: './add-comment-template.component.html',
  styleUrls: ['./add-comment-template.component.css']
})
export class AddCommentTemplateComponent implements OnInit {

  @ViewChild('commentForm')  commentForm!: NgForm;
  @Output() addEventmitter : EventEmitter<Comment> = new EventEmitter<Comment>();
  successMessage!:string;
  errorMessage!:string;
  hasSucess= false;
  hasError = false;
  comment_name_required = environment.comment_name_required;
  comment_message_required=environment.comment_message_required;
  fields_cannot_be_empty=environment.fields_cannot_be_empty;
  constructor(private _commentService:CommentService) { }

  ngOnInit(): void {
  }

  checkForm(){
    for (let field in this.commentForm.value) {
        if(this.commentForm.value[field].trim() == ''){
          return false;;
        }
    }
    return true;
}
  addComment():void{
    if(!this.checkForm()){
    this.setErrorMessage(this.fields_cannot_be_empty);
      return;
    }
  
    this._commentService.createComment(this.commentForm.value).subscribe({
      next: (newComment)=>{
        this.setSuccessMessage();
        this.addEventmitter.emit(newComment);
        this.commentForm.reset();
        this.hasError = false;
        setTimeout(() => {
          this.clearSuccessMessage();
        }, 1000);
       
        
      },
      error: (err)=>{
        this.setErrorMessage(err);
      }
    })
    
  }
  clearSuccessMessage(){
    this.successMessage = '';
    this.hasSucess = false;
  }
  clearErrorMessage(){
    this.errorMessage = '';
    this.hasError = false;
  }
  setSuccessMessage(){
    this.successMessage = environment.success_message;
    this.hasSucess = true;
  }
  setErrorMessage(error:string){
    this.errorMessage = error;
    this.hasError = true;
  }
}
