import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-admin-main',
  templateUrl: './admin-main.component.html',
  styleUrls: ['./admin-main.component.scss']
})
export class AdminMainComponent implements OnInit {

  sideNavOption = 'side';

  constructor(
    private location: Location,
  ) { 

  }

  ngOnInit(): void {

  }

  goBack() {
    this.location.back();
  }

}
