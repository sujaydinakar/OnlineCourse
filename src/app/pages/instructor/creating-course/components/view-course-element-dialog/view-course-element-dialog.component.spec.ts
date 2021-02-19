import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCourseElementDialogComponent } from './view-course-element-dialog.component';

describe('ViewCourseElementDialogComponent', () => {
  let component: ViewCourseElementDialogComponent;
  let fixture: ComponentFixture<ViewCourseElementDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewCourseElementDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCourseElementDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
