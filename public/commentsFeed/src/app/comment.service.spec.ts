import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from'@angular/common/http/testing';
import { CommentService } from './comment.service';
import { Comment } from './comment/comment-list/comment';
import { environment } from 'src/environments/environment';
import { response } from 'express';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';

describe('CommentService', () => {

  let service: CommentService;
  let httpMock: HttpTestingController;

  let httpClientSpy : jasmine.SpyObj<HttpClient>;
  let commentService: CommentService;


 
  beforeEach(()=>{
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    commentService = new CommentService(httpClientSpy);
  });
  it('should return expected comments (HttpClient called Once)',(done:DoneFn)=>{
    const comment =  new Comment;
    comment.name = "Chioma Peace";
    comment.message = "This is my first post"

    const expectedComment:Comment[]=[];
    expectedComment.push(comment);
    httpClientSpy.get.and.returnValues(of(expectedComment));
    commentService.getComments().subscribe({
      next: comments =>{
        expect(comments).withContext('expected comments').toEqual(expectedComment);
        done();
      },
      error: done.fail
    });
    expect(httpClientSpy.get.calls.count()).withContext('one call').toBe(1);
  });



  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        HttpClientTestingModule,
      ],
      providers:[
        CommentService
      ]
    });
    service = TestBed.inject(CommentService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch Comments as an Observable', async () => {

    service.getComments().subscribe((comments:Comment[])=>{
        expect(comments.length).toBe(1);
    })

    let req = httpMock.expectOne(`${environment.baseUrl}/getComments`);
    expect(req.request.method).toBe("GET");

    httpMock.verify();

  });
  it("should create a comment", async() => {
    const comment =  new Comment;
    comment.name = "Chioma Peace";
    comment.message = "This is my first post"
    service.createComment(comment);


    service.getComments().subscribe(comment =>{
      expect(comment.length).toBeGreaterThanOrEqual(1);
    });
  });

  it("should delete all comments", () => {
    service.deleteComments();
    service.getComments().subscribe(comment =>{
      expect(comment.length).toBeLessThan(1);
    });
  });

});
