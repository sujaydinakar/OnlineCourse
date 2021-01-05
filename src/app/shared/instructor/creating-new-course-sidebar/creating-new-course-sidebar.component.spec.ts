import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatingNewCourseSidebarComponent } from './creating-new-course-sidebar.component';

describe('CreatingNewCourseSidebarComponent', () => {
  let component: CreatingNewCourseSidebarComponent;
  let fixture: ComponentFixture<CreatingNewCourseSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatingNewCourseSidebarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatingNewCourseSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
