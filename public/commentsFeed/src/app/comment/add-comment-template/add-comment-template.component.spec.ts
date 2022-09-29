import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { CommentService } from '../../comment.service';
import { Comment } from '../comment-list/comment';
import { AddCommentTemplateComponent } from './add-comment-template.component';

describe('AddCommentTemplateComponent', () => {
  let component: AddCommentTemplateComponent;
  let fixture: ComponentFixture<AddCommentTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
         FormsModule],
      declarations: [ AddCommentTemplateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCommentTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it("should use the create method from the service", async() => {
    const commentService = fixture.debugElement.injector.get(CommentService);
    const comment =  new Comment;
    comment.name = "Chioma Peace";
    comment.message = "This is my first post"
    fixture.detectChanges();
    commentService.createComment(comment).subscribe((comment)=>{
      expect(comment).toEqual(component.commentForm.value);
    })
  });
});
