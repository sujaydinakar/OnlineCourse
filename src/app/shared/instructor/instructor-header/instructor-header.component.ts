import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-instructor-header',
  templateUrl: './instructor-header.component.html',
  styleUrls: ['./instructor-header.component.scss']
})
export class InstructorHeaderComponent implements OnInit {

  constructor(
    private auth: AngularFireAuth,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  btnSignOutClicked() {
    this.auth.signOut();
    this.router.navigate(['/admin/login']);
  }

}
