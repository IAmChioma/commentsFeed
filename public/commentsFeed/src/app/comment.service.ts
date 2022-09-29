import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Comment } from './comment/comment-list/comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  baseUrl = environment.baseUrl;
  constructor(private _http:HttpClient) { }

  getComments():Observable<Comment[]>{
      return this._http.get<Comment[]>(`${this.baseUrl}/getComments`);
  }
  getComment(id:number):Observable<Comment>{
    return this._http.get<Comment>(`${this.baseUrl}/getComment/${id}`);
}
  createComment(comment:Comment):Observable<Comment>{
    return this._http.post<Comment>(`${this.baseUrl}/createComment`,comment);
}

  deleteComments():Observable<any>{
    return this._http.delete<any>(`${this.baseUrl}/deleteComments`);
  }
}
