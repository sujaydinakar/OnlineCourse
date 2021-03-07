import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewStudentCourseElementDialogComponent } from './view-student-course-element-dialog.component';

describe('ViewStudentCourseElementDialogComponent', () => {
  let component: ViewStudentCourseElementDialogComponent;
  let fixture: ComponentFixture<ViewStudentCourseElementDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewStudentCourseElementDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewStudentCourseElementDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
