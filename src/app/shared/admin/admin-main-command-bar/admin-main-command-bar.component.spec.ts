import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMainCommandBarComponent } from './admin-main-command-bar.component';

describe('AdminMainCommandBarComponent', () => {
  let component: AdminMainCommandBarComponent;
  let fixture: ComponentFixture<AdminMainCommandBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminMainCommandBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminMainCommandBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
