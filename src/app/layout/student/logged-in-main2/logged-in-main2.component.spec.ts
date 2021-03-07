import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoggedInMain2Component } from './logged-in-main2.component';

describe('LoggedInMain2Component', () => {
  let component: LoggedInMain2Component;
  let fixture: ComponentFixture<LoggedInMain2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoggedInMain2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoggedInMain2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
