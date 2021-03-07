import { Component, OnInit } from '@angular/core';
import { tabs } from 'src/app/dummy/tabs';

@Component({
  selector: 'app-admin-slideshow',
  templateUrl: './admin-slideshow.component.html',
  styleUrls: ['./admin-slideshow.component.scss']
})
export class AdminSlideshowComponent implements OnInit {

  TABS = tabs.slideshow;

  constructor() { }

  ngOnInit(): void {
  }

  openAddSlideshowDialog() {

  }

}
