import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  
  toggle: boolean = false;
  constructor() {
   }

  ngOnInit() {
  }

 show(){
  this.toggle = true;
 }

 hide(){
  this.toggle = false;
 }
}
