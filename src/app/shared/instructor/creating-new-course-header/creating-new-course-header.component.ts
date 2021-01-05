import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-creating-new-course-header',
  templateUrl: './creating-new-course-header.component.html',
  styleUrls: ['./creating-new-course-header.component.scss']
})
export class CreatingNewCourseHeaderComponent implements OnInit {

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

  }

}
