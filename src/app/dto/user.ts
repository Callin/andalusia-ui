import {Organization} from "./organization";
import {Project} from "./project";

export class User {

  id: number;

  name: string;

  email: string;

  organization: Organization;

  projects: Project[];

  constructor(id: number,
              name: string,
              email: string,
              organization: Organization,
              projects: Project[]) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.organization = organization;
    this.projects = projects;
  }

  static getBlankUser(): User {
    return new User(
      null,
      null,
      null,
      null,
      null);
  }
}
