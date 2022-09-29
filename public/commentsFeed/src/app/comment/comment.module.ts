import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommentRoutingModule } from './comment-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddCommentTemplateComponent } from './add-comment-template/add-comment-template.component';
import { CommentDetailsComponent } from './comment-details/comment-details.component';
import { CommentListComponent } from './comment-list/comment-list.component';


@NgModule({
  declarations: [
    AddCommentTemplateComponent,
    CommentDetailsComponent,
    CommentListComponent
  ],
  imports: [
    CommonModule,
    CommentRoutingModule,
    FormsModule,
  ]
})
export class CommentModule { }
