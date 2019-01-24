import {Component, Input, OnInit} from '@angular/core';
import {Bug} from "../../dto/bug";

@Component({
  selector: 'app-bug',
  templateUrl: './bug.component.html',
  styleUrls: ['./bug.component.css']
})
export class BugComponent implements OnInit {

  @Input() bug: Bug = Bug.getBlankBug();

  constructor() {
  }

  ngOnInit() {
  }

}
