import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { CommentService } from '../../comment.service';

import { CommentDetailsComponent } from './comment-details.component';

describe('CommentDetailsComponent', () => {
  let component: CommentDetailsComponent;
  let fixture: ComponentFixture<CommentDetailsComponent>;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,],
      declarations: [ CommentDetailsComponent ],
      providers:[
        { provide:ActivatedRoute,  
          useValue: {
                snapshot: {params: {id: 1}}
      }}]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommentDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it("should get comment from the service", async() => {
    const commentService = fixture.debugElement.injector.get(CommentService);
    const route = fixture.debugElement.injector.get(ActivatedRoute);
    fixture.detectChanges();
    const id = route.snapshot.params["id"];
    expect(id).toBeGreaterThan(0);
    commentService.getComment(id).subscribe((comment)=>{
      expect(comment).toEqual(component.comment);
    })
  });
  it('should render title in a p tag', (() => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('p').textContent).toContain('Comment Details:::');
  }));
});
