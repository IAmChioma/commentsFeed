import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommentService } from '../../comment.service';
import { Comment } from './comment';

import { CommentListComponent } from './comment-list.component';

describe('CommentListComponent', () => {
  let component: CommentListComponent;
  let fixture: ComponentFixture<CommentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      declarations: [ CommentListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should use the commentList from the service", async() => {
    const commentService = fixture.debugElement.injector.get(CommentService);
    fixture.detectChanges();
    commentService.getComments().subscribe((comments)=>{
      expect(comments).toEqual(component.allComments);
    })
  });
});
