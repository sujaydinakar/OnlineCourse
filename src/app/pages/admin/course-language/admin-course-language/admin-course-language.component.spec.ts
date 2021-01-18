import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCourseLanguageComponent } from './admin-course-language.component';

describe('AdminCourseLanguageComponent', () => {
  let component: AdminCourseLanguageComponent;
  let fixture: ComponentFixture<AdminCourseLanguageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminCourseLanguageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCourseLanguageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
