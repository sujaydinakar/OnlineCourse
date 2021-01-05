import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public images: Array<string> = [
    './assets/images/banner 1.png',
    './assets/images/banner 2.png',
    './assets/images/banner 3.jpg'
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
