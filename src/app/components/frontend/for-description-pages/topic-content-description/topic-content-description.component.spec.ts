import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicContentDescriptionComponent } from './topic-content-description.component';

describe('TopicContentDescriptionComponent', () => {
  let component: TopicContentDescriptionComponent;
  let fixture: ComponentFixture<TopicContentDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopicContentDescriptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicContentDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
