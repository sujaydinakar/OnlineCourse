import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatingNewCourseHeaderComponent } from './creating-new-course-header.component';

describe('CreatingNewCourseHeaderComponent', () => {
  let component: CreatingNewCourseHeaderComponent;
  let fixture: ComponentFixture<CreatingNewCourseHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatingNewCourseHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatingNewCourseHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
