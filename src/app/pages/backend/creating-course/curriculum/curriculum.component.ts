import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-curriculum',
  templateUrl: './curriculum.component.html',
  styleUrls: ['./curriculum.component.scss']
})
export class CurriculumComponent implements OnInit {
  isShowAddSectionDialog = false;

  constructor() { }

  ngOnInit(): void {
  }

  set_isShowAddSectionDialog() {
    this.isShowAddSectionDialog = !this.isShowAddSectionDialog;
  }

  drop(event: CdkDragDrop<string[]>) {
    // moveItemInArray(this.movies, event.previousIndex, event.currentIndex);
  }
}
