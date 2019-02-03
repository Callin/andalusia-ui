import {Project} from "./project";
import {UserStory} from "./user-story";

export class Sprint {

  id: number;

  number: number;

  startDate: Date;

  endDate: Date;

  project: Project;

  userStories: UserStory[];

  constructor(id: number,
              number: number,
              startDate: Date,
              endDate: Date,
              userStories: UserStory[],
              project: Project) {
    this.id = id;
    this.number = number;
    this.startDate = startDate;
    this.endDate = endDate;
    this.userStories = userStories;
    this.project = project;
  }

  static getBlankSprint(): Sprint {
    return new Sprint(
      null,
      null,
      null,
      null,
      null,
      null);
  }
}
