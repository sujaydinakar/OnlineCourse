import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupAndTestVideoComponent } from './setup-and-test-video.component';

describe('SetupAndTestVideoComponent', () => {
  let component: SetupAndTestVideoComponent;
  let fixture: ComponentFixture<SetupAndTestVideoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetupAndTestVideoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetupAndTestVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
