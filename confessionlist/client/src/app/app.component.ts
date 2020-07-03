import { Component } from '@angular/core';
import { ConfessionService } from './confession.service';
import { Confession } from './confession';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ConfessionLib';
  todaydate;
  componentproperty;
  constructor(private confessionservice: ConfessionService) {}
  public confessiondata = [];
  item : Confession;
  ngOnInit() {
    this.todaydate = this.confessionservice.showTodayDate();
    console.log(this.confessionservice.serviceproperty); 
    this.confessionservice.serviceproperty = "component created"; 
    this.componentproperty = this.confessionservice.serviceproperty;
    this.confessionservice.getConfessionList().subscribe((data) => {
      this.confessiondata = Array.from(Object.keys(data), k=>data[k]);
      console.log(this.confessiondata);
      this.item = this.confessiondata[Math.floor(Math.random() * Math.floor(this.confessiondata.length))];
    });
  }
  
}

