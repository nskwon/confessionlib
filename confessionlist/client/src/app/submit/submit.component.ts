import { Component, Input } from '@angular/core';
import { ConfessionService } from '../confession.service';
import { Confession } from '../confession';

@Component({
  selector: 'app-submit',
  templateUrl: './submit.component.html',
  styleUrls: ['./submit.component.css']
})
export class SubmitComponent {

  constructor(private confessionService: ConfessionService) {}
  @Input()
  confession: Confession;

  @Input()
  addHandler: Function;

  addConfession(confession: Confession) {
    this.confessionService.addConfession(confession).then((newConfession: Confession) => {
      this.addHandler(newConfession);
    });
  }

}
