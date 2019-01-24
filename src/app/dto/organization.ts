import {User} from "./user";
import {Project} from "./project";

export class Organization {

  id: number;

  name: string;

  description: string;

  users: User[];

  projects: Project[];

  constructor(id: number,
              name: string,
              description: string,
              users: User[],
              projects: Project[]) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.users = users;
    this.projects = projects;
  }

  static getBlankOrganization(): Organization {
    return new Organization(
      null,
      null,
      null,
      [User.getBlankUser()],
      [Project.getBlankProject()]);
  }

  static getOrganization(id: number): Organization {
    return new Organization(
      id,
      null,
      null,
      [User.getBlankUser()],
      [Project.getBlankProject()]);
  }
}
