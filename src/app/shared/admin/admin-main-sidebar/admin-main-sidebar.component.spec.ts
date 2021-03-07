import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMainSidebarComponent } from './admin-main-sidebar.component';

describe('AdminMainSidebarComponent', () => {
  let component: AdminMainSidebarComponent;
  let fixture: ComponentFixture<AdminMainSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminMainSidebarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminMainSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
