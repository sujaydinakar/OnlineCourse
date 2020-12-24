import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicIntroHeaderComponent } from './topic-intro-header.component';

describe('TopicIntroHeaderComponent', () => {
  let component: TopicIntroHeaderComponent;
  let fixture: ComponentFixture<TopicIntroHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopicIntroHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicIntroHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
