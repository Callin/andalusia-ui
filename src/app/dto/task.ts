import {User} from "./user";
import {UserStory} from "./user-story";

export class Task {

  id: number;

  name: string;

  description: string;

  status: string;

  priority: number;

  estimation: number;

  user: User;

  userStory: UserStory;


  constructor(id: number, name: string, description: string, status: string, priority: number,
              estimation: number, user: User, userStory: UserStory) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.status = status;
    this.priority = priority;
    this.estimation = estimation;
    this.user = user;
    this.userStory = userStory;
  }

  static getBlankTask(): Task {
    return new Task(
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null);
  }
}
