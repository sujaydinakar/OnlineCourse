import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCourseSectionDialogComponent } from './edit-course-section-dialog.component';

describe('EditCourseSectionDialogComponent', () => {
  let component: EditCourseSectionDialogComponent;
  let fixture: ComponentFixture<EditCourseSectionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCourseSectionDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCourseSectionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
