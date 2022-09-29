import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommentDetailsComponent } from './comment/comment-details/comment-details.component';
import { CommentListComponent } from './comment/comment-list/comment-list.component';
import { ErrorComponent } from './error/error.component';

const routes: Routes = [
  {
    path:'', component:CommentListComponent
  },
  {
    path:'comments', loadChildren:()=>import('./comment/comment.module').then((m)=>m.CommentModule)
  },
  {
    path:'**', component:ErrorComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
