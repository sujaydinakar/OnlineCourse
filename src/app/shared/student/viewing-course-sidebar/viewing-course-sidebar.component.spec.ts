import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewingCourseSidebarComponent } from './viewing-course-sidebar.component';

describe('ViewingCourseSidebarComponent', () => {
  let component: ViewingCourseSidebarComponent;
  let fixture: ComponentFixture<ViewingCourseSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewingCourseSidebarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewingCourseSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
