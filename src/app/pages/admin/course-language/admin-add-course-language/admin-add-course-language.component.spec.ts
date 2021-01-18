import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddCourseLanguageComponent } from './admin-add-course-language.component';

describe('AdminAddCourseLanguageComponent', () => {
  let component: AdminAddCourseLanguageComponent;
  let fixture: ComponentFixture<AdminAddCourseLanguageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAddCourseLanguageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAddCourseLanguageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
