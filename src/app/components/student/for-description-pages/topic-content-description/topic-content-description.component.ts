import { Component, OnInit } from '@angular/core';
import { CourseStore } from 'src/app/stores/course.store';

@Component({
  selector: 'app-topic-content-description',
  templateUrl: './topic-content-description.component.html',
  styleUrls: ['./topic-content-description.component.scss']
})
export class TopicContentDescriptionComponent implements OnInit {

  constructor(
    public courseStore: CourseStore
  ) { }

  ngOnInit(): void {
  }

}
