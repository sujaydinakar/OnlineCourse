import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseElementBlockComponent } from './course-element-block.component';

describe('CourseElementBlockComponent', () => {
  let component: CourseElementBlockComponent;
  let fixture: ComponentFixture<CourseElementBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseElementBlockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseElementBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
