import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseLandingPagesComponent } from './course-landing-pages.component';

describe('CourseLandingPagesComponent', () => {
  let component: CourseLandingPagesComponent;
  let fixture: ComponentFixture<CourseLandingPagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseLandingPagesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseLandingPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
