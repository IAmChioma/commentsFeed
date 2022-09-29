import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommentDetailsComponent } from './comment-details/comment-details.component';
import { CommentListComponent } from './comment-list/comment-list.component';

const routes: Routes = [
  {
    path:'', component:CommentListComponent
  },
  
  {
    path:':id', component:CommentDetailsComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommentRoutingModule { }
