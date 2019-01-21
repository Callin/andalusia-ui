import {Project} from "./project";
import {UserStory} from "./user-story";

export class Sprint {

  id: number;

  name: number;

  startDate: Date;

  endDate: Date;

  project: Project;

  userStories: UserStory[];

  constructor(id: number,
              name: number,
              startDate: Date,
              endDate: Date,
              userStories: UserStory[],
              project: Project) {
    this.id = id;
    this.name = name;
    this.startDate = startDate;
    this.endDate = endDate;
    this.userStories = userStories;
    this.project = project;
  }

  static getBlankUser(): Sprint {
    return new Sprint(
      null,
      null,
      null,
      null,
      null,
      null);
  }
}
