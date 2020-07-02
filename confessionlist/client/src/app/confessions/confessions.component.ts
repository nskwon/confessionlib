import { Component, OnInit } from '@angular/core';
import {ConfessionService} from '../confession.service';
import {Confession} from '../confession';

@Component({
  selector: 'app-confessions',
  templateUrl: './confessions.component.html',
  styleUrls: ['./confessions.component.css'],
  providers: [ConfessionService]
})
export class ConfessionsComponent implements OnInit {
  confessions: Confession[];
  confession: Confession;
  submission: string;
  date: Date; 

  constructor(private confessionService: ConfessionService) { }
  /*
  getConfessions(): void{
    this.confessionService.getConfessions()
      .subscribe(confessions => this.confessions = confessions);
  }
  */

  ngOnInit(){
    this.confessionService.getConfessions()
      .subscribe( confessions => 
      this.confessions = confessions);
      
  }

}
