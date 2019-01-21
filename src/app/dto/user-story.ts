import {User} from "./user";
import {Sprint} from "./sprint";
import {Project} from "./project";
import {Task} from './task';
import {Bug} from "./bug";

export class UserStory {

  id: number;

  name: string;

  description: string;

  status: string;

  priority: number;

  estimation: number;

  project: Project;

  sprint: Sprint;

  user: User;

  tasks: Task[];

  bugs: Bug[];


  constructor(id: number, name: string, description: string, status: string, priority: number, estimation: number,
              project: Project, sprint: Sprint, user: User, tasks: Task[], bugs: Bug[]) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.status = status;
    this.priority = priority;
    this.estimation = estimation;
    this.project = project;
    this.sprint = sprint;
    this.user = user;
    this.tasks = tasks;
    this.bugs = bugs;
  }

  static getBlankUserStory(): UserStory {
    return new UserStory(
      null,
      null,
      null,
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
