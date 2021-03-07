import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewStudentCourseSectionDialogComponent } from './view-student-course-section-dialog.component';

describe('ViewStudentCourseSectionDialogComponent', () => {
  let component: ViewStudentCourseSectionDialogComponent;
  let fixture: ComponentFixture<ViewStudentCourseSectionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewStudentCourseSectionDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewStudentCourseSectionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
