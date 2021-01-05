import { Component, OnInit } from '@angular/core';
import { CategoryStore } from 'src/app/stores/category.store';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public categoryStore: CategoryStore) { }

  ngOnInit(): void {

  }
}
