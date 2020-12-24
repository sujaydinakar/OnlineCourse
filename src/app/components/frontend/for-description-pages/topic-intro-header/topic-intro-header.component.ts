import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-topic-intro-header',
  templateUrl: './topic-intro-header.component.html',
  styleUrls: ['./topic-intro-header.component.scss']
})
export class TopicIntroHeaderComponent implements OnInit {
  rate = 5;

  constructor() { }

  ngOnInit(): void {
  }

}
