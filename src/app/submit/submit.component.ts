import { Component, Input } from '@angular/core';
import { ConfessionService } from '../confession.service';
import { Confession } from '../confession';

@Component({
  selector: 'app-submit',
  templateUrl: './submit.component.html',
  styleUrls: ['./submit.component.css']
})
export class SubmitComponent {
  confessiondata: Confession[];
  confession: Confession;
  submission: string;
  date: Date;

  constructor(private confessionService: ConfessionService) {}

  addConfession(){
    const newConfession ={
      submission: this.submission,
      date: this.date
    }

    this.confessionService.addConfession(newConfession).then((newConfession: Confession) => {
      this.confessiondata.push(newConfession);
    });

  }

}
