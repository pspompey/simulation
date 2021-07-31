import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  
  toggle: boolean = false;
  container: string = 'simulation';
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

 changeContainer(container: string){
  this.container = container;
 }
}
