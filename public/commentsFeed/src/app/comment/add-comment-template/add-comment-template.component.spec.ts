import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule, By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommentService } from '../../comment.service';
import { Comment } from '../comment-list/comment';
import { AddCommentTemplateComponent } from './add-comment-template.component';
import { DebugElement } from '@angular/core';

describe('AddCommentTemplateComponent', () => {
  let component: AddCommentTemplateComponent;
  let fixture: ComponentFixture<AddCommentTemplateComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        HttpClientTestingModule,
         FormsModule
        ],
      declarations: [ AddCommentTemplateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCommentTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

     de = fixture.debugElement.query(By.css('form'));
     el = de.nativeElement;
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


  it(`should call the onSubmit method`, (() => {
    spyOn(component, 'addComment');
    el = fixture.debugElement.query(By.css('button')).nativeElement;
    el.click();
    expect(component.addComment).toHaveBeenCalled();
  }));

 it(`form should be invalid`, (() => {
  component.commentForm.controls['message'].setValue('');
  component.commentForm.controls['name'].setValue('');
    expect(component.commentForm.valid).toBeFalsy();
  }));

  it(`form should be valid`, (() => {
    component.commentForm.controls['name'].setValue('Chioma');
    component.commentForm.controls['message'].setValue('Lorem ipsum');
    expect(component.commentForm.valid).toBeTruthy();
  }));
});
