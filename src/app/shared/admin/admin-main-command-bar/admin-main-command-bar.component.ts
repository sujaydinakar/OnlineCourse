import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-admin-main-command-bar',
  templateUrl: './admin-main-command-bar.component.html',
  styleUrls: ['./admin-main-command-bar.component.scss']
})
export class AdminMainCommandBarComponent implements OnInit {

  @Input() name:any;
  @Input() buttonText:any;
  @Input() searchDialog:any;
  @Input() process:boolean;
  @Input() tabData: any[];
  
  @Output() onPress = new EventEmitter();

  constructor() { }

  ngOnInit() {
   
  }

}
