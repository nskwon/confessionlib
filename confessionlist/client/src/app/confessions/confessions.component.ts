import { Component, OnInit } from '@angular/core';
import { ConfessionService } from '../confession.service';
import { Confession } from '../confession';

@Component({
  selector: 'app-confessions',
  templateUrl: './confessions.component.html',
  styleUrls: ['./confessions.component.css'],
})
export class ConfessionsComponent implements OnInit {

  title = 'ConfessionLib';
  constructor(private confessionService: ConfessionService) {}
  public confessionData = [];
  confession : Confession;
  _id : string
  submission : string;
  date : Date;

  index = 0;

  nextConfession(){
    if(this.confessionData.length > 1){
      this.confessionData.splice(this.index,1);
      console.log("Current length of array: " + this.confessionData.length);
      this.index = Math.floor(Math.random() * Math.floor(this.confessionData.length))
      this.confession = this.confessionData[this.index];
    }
    else{
      console.log("In the else statement of nextConfession");
      this.confessionService.getConfessionList().subscribe((data) => {
        this.confessionData = Array.from(Object.keys(data), k=>data[k]);
        this.index = Math.floor(Math.random() * Math.floor(this.confessionData.length))
        this.confession = this.confessionData[this.index];
      })
    }
  }

  ngOnInit() { 
    this.confessionService.getConfessionList().subscribe((data) => {
      this.confessionData = Array.from(Object.keys(data), k=>data[k]);
      console.log(this.confessionData);
      this.index = Math.floor(Math.random() * Math.floor(this.confessionData.length))
      this.confession = this.confessionData[this.index];
    });
  } 
}
