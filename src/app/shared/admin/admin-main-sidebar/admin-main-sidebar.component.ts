import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-admin-main-sidebar',
  templateUrl: './admin-main-sidebar.component.html',
  styleUrls: ['./admin-main-sidebar.component.scss']
})
export class AdminMainSidebarComponent implements OnInit {

  disabled: boolean = true;
  toggleSidebar: boolean = true;

  expansions = {
    one: true,
    two: false,
  };
  
  constructor(
    public authService: AuthService,
    public router: Router,
    protected localStorages: LocalStorage,
  ) { }

  async ngOnInit(): Promise<void> {
    const expansions = JSON.parse(localStorage.getItem("expansions") || "");
    
    if (expansions) {
      this.expansions = expansions
    }

    this.localStorages.getItem("toggleSidebar").subscribe(toggleSidebar => {
      this.disabled = this.toggleSidebar;
      if (!this.toggleSidebar) {
        let body = document.getElementsByClassName("page-wrapper")[0];
        body.classList.toggle("toggled-sidebar");
      }
    });
  }

  onLogOut() {
    this.authService.signout();
  }

  onOpened(i: any) {
    const isopen = true;
    switch (i) {
      case 1:
        this.expansions.one = isopen;
        break;
      case 2:
        this.expansions.two = isopen;
        break;
      default:
        break;
    }

    localStorage.setItem('expansions', JSON.stringify(this.expansions));
  }

  onClosed(i: any) {
    const isopen = false;
    switch (i) {
      case 1:
        this.expansions.one = isopen;
        break;
      case 2:
        this.expansions.two = isopen;
        break;
      default:
        break;
    }
    localStorage.setItem('expansions', JSON.stringify(this.expansions));
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
