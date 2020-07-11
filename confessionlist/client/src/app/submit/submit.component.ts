import { Component, OnInit } from '@angular/core';
import { ConfessionService } from '../confession.service';
import { Confession } from '../confession';

@Component({
  selector: 'app-submit',
  templateUrl: './submit.component.html',
  styleUrls: ['./submit.component.css']
})
export class SubmitComponent implements OnInit {

  constructor(private confessionService: ConfessionService) {}
  public confessionData = [];
  confession : Confession;
  submission : string;

  addConfession(){
    const newConfession ={
      submission: this.submission
    }
    this.confessionService.addConfession(newConfession)
      .subscribe(confession => {
        this.confessionData.push(confession);
        this.confessionData.pop();
        console.log(this.confessionData);
      })
  }

  ngOnInit(): void {
  }

}
