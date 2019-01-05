import {Organization} from "./organization";
import {User} from "./user";
import {Project} from "./project";

export class Sprint {

  id: number;

  name: number;

  startDate: Date;

  endDate: Date;

  project: Project;

  constructor(id: number,
              name: number,
              startDate: Date,
              endDate: Date,
              project: Project) {
    this.id = id;
    this.name = name;
    this.startDate = startDate;
    this.endDate = endDate;
    this.project = project;
  }

  static getBlankUser(): Sprint {
    return new Sprint(
      null,
      null,
      null,
      null,
      null);
  }
}
