import {Organization} from "./organization";
import {User} from "./user";
import {Sprint} from "./sprint";

export class Project {

  id: number;

  name: string;

  description: string;

  organization: Organization;

  sprints: Sprint[];

  users: User[];

  constructor(id: number,
              name: string,
              description: string,
              organization: Organization,
              sprints: Sprint[],
              users: User[]) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.organization = organization;
    this.sprints = sprints;
    this.users = users;
  }

  static getBlankProject(): Project {
    return new Project(
      null,
      null,
      null,
      null,
      null,
      null);
  }
}
