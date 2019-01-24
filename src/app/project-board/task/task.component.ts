import {Component, Input, OnInit} from '@angular/core';
import {Task} from "../../dto/task";

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  @Input() task: Task = Task.getBlankTask();

  constructor() { }

  ngOnInit() {
  }

}
