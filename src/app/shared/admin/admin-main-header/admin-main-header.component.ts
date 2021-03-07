import { Component, OnInit } from '@angular/core';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { SidenavService } from 'src/app/services/component/sidenav.service';

@Component({
  selector: 'app-admin-main-header',
  templateUrl: './admin-main-header.component.html',
  styleUrls: ['./admin-main-header.component.scss']
})
export class AdminMainHeaderComponent implements OnInit {

  ismobile = false;
  toggleSidebar: any;
  toggleActive: boolean = false;
  
  constructor(
    public localStorages: LocalStorage,
    private sideNavService: SidenavService
  ) { }

  ngOnInit(): void {

  }

  toggleChartbar() {
    this.sideNavService.toggle();
  }

  togglesidebar() {
    let body = document.getElementsByClassName("page-wrapper")[0];
    body.classList.toggle("toggled-sidebar");
    this.toggleSidebar = !this.toggleSidebar;
    this.localStorages
      .setItem("toggleSidebar", this.toggleSidebar)
      .subscribe(() => { });
  }

}
