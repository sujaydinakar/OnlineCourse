import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseStore } from 'src/app/stores/course.store';

@Component({
  selector: 'app-topic-description',
  templateUrl: './topic-description.component.html',
  styleUrls: ['./topic-description.component.scss']
})
export class TopicDescriptionComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    public courseStore: CourseStore
  ) { }
  
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      var id = params.get('id');
      this.courseStore.getCourseByKey(id);
      this.courseStore.getCourseSections(id);
    });
  }

}
