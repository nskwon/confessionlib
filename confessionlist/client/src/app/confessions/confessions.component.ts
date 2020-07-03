import { Component, OnInit } from '@angular/core';
import {ConfessionService} from '../confession.service';

@Component({
  selector: 'app-confessions',
  templateUrl: './confessions.component.html',
  styleUrls: ['./confessions.component.css'],
})
export class ConfessionsComponent implements OnInit {
  newcomponent = "Entered in new component created"; 
  todaydate; 
  newcomponentproperty; 
  newcomp = "Entered in newcomp";
  constructor(private confessionservice: ConfessionService) { }
  ngOnInit() { 
    this.todaydate = this.confessionservice.showTodayDate(); 
    this.newcomponentproperty = this.confessionservice.serviceproperty;
  } 
}
