import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwiperByTabComponent } from './swiper-by-tab.component';

describe('SwiperByTabComponent', () => {
  let component: SwiperByTabComponent;
  let fixture: ComponentFixture<SwiperByTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SwiperByTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SwiperByTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
