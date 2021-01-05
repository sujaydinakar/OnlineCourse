import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMain2Component } from './admin-main2.component';

describe('AdminMain2Component', () => {
  let component: AdminMain2Component;
  let fixture: ComponentFixture<AdminMain2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminMain2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminMain2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
