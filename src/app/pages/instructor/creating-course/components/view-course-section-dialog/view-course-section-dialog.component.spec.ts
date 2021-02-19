import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCourseSectionDialogComponent } from './view-course-section-dialog.component';

describe('ViewCourseSectionDialogComponent', () => {
  let component: ViewCourseSectionDialogComponent;
  let fixture: ComponentFixture<ViewCourseSectionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewCourseSectionDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCourseSectionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
