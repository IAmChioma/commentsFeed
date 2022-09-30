import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, mergeMap, Observable, shareReplay } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Comment } from './comment/comment-list/comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  baseUrl = environment.baseUrl;
  private _commentData$ = new BehaviorSubject<void>(undefined);
  apiRequest$ = this._http.get<any[]>(`${this.baseUrl}/getComments`).pipe(
    map((value: any) => {
      return value;
    }),
    shareReplay(1),
  );
  public comments$ = this._commentData$.pipe(
    mergeMap(() => this.apiRequest$),
    shareReplay(1)
  );
  constructor(private _http:HttpClient) { }
  updateData() {
    this._commentData$.next();
  }
  getComments():Observable<Comment[]>{
    // return this.comments$;
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
