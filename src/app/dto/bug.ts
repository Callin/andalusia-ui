import {User} from "./user";
import {UserStory} from "./user-story";

export class Bug {

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

  static getBlankBug(): Bug {
    return new Bug(
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
