import { Component, OnInit } from '@angular/core';
import { CourseStore } from 'src/app/stores/course.store';

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss']
})
export class PricingComponent implements OnInit {

  constructor(
    public courseStore: CourseStore,
  ) { }

  ngOnInit(): void {
  }

  txtPriceChanged(event) {
    this.courseStore.TempCourse = {
      ...this.courseStore.TempCourse,
      price: {
        key: "1",
        currency: "USD",
        amount: event.target.value
      }
    }
  }

  btnSaveClicked() {
    this.courseStore.submitSaveCourse();
  }
}
