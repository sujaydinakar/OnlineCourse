import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewingCourseHeaderComponent } from './viewing-course-header.component';

describe('ViewingCourseHeaderComponent', () => {
  let component: ViewingCourseHeaderComponent;
  let fixture: ComponentFixture<ViewingCourseHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewingCourseHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewingCourseHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
