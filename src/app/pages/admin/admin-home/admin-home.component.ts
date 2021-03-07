import { Component, OnInit } from '@angular/core';
import { tabs } from 'src/app/dummy/tabs';
import { GetGreetingWordsService } from 'src/app/services/generator/get-greeting-words.service';
import { UserStore } from 'src/app/stores/user.store';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss']
})
export class AdminHomeComponent implements OnInit {

  dayTime = '';

  constructor(
    public userStore: UserStore,
    public greetingWordsService: GetGreetingWordsService
  ) { }

  async ngOnInit(): Promise<void> {
    await this.userStore.getCurrentLoggedInUser();
  }

}
