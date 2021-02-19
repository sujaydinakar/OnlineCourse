import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCourseElementDialogComponent } from './edit-course-element-dialog.component';

describe('EditCourseElementDialogComponent', () => {
  let component: EditCourseElementDialogComponent;
  let fixture: ComponentFixture<EditCourseElementDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCourseElementDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCourseElementDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
