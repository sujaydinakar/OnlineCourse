import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-course-element-block',
  templateUrl: './course-element-block.component.html',
  styleUrls: ['./course-element-block.component.scss']
})
export class CourseElementBlockComponent implements OnInit {

  @Input() section_index: string;
  @Input() element_index: string;
  @Input() elementData: any;

  @Output() deleteElementEvent:EventEmitter<any> = new EventEmitter<any>();

  constructor(

  ) { }

  ngOnInit(): void {
  }

  btnDeleteElementClicked(section_index, element_index) {
    this.deleteElementEvent.emit({
      section_index,
      element_index
    });
  }

}
