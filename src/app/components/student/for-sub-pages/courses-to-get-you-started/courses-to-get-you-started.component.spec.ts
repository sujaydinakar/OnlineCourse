import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesToGetYouStartedComponent } from './courses-to-get-you-started.component';

describe('CoursesToGetYouStartedComponent', () => {
  let component: CoursesToGetYouStartedComponent;
  let fixture: ComponentFixture<CoursesToGetYouStartedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoursesToGetYouStartedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesToGetYouStartedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
