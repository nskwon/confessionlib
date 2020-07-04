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
  constructor(private confessionservice: ConfessionService) {}
  public confessiondata = [];
  confession : Confession;
  submission : string;

  index = 0;

  nextConfession(){
    if(this.confessiondata.length > 1){
      this.confessiondata.splice(this.index,1);
      console.log("Current length of array: " + this.confessiondata.length);
      this.index = Math.floor(Math.random() * Math.floor(this.confessiondata.length))
      this.confession = this.confessiondata[this.index];
    }
    else{
      console.log("In the else statement of nextConfession");
      this.confessionservice.getConfessionList().subscribe((data) => {
        this.confessiondata = Array.from(Object.keys(data), k=>data[k]);
        this.index = Math.floor(Math.random() * Math.floor(this.confessiondata.length))
        this.confession = this.confessiondata[this.index];
      })
    }
  }

  addConfession(){
    const newConfession ={
      submission: this.submission
    }
    this.confessionservice.addConfession(newConfession)
      .subscribe(confession => {
        this.confessiondata.push(confession);
        this.confessiondata.pop();
        console.log(this.confessiondata);
      })
  }

  ngOnInit() { 
    this.confessionservice.getConfessionList().subscribe((data) => {
      this.confessiondata = Array.from(Object.keys(data), k=>data[k]);
      console.log(this.confessiondata);
      this.index = Math.floor(Math.random() * Math.floor(this.confessiondata.length))
      this.confession = this.confessiondata[this.index];
    });
  } 
}
