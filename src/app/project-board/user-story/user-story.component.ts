import {Component, Input, OnInit} from '@angular/core';
import {UserStory} from "../../dto/user-story";

@Component({
  selector: 'app-user-story',
  templateUrl: './user-story.component.html',
  styleUrls: ['./user-story.component.css']
})
export class UserStoryComponent implements OnInit {

  @Input() userStory: UserStory = UserStory.getBlankUserStory();

  constructor() { }

  ngOnInit() {
  }

}
