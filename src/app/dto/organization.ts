import {User} from "./user";

export class Organization {

  id: number;

  name: string;

  description: string;

  userList: User[];

  constructor(id: number,
              name: string,
              description: string,
              userList: User[]) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.userList = userList;
  }

  static getBlankOrganization(): Organization {
    return new Organization(
      null,
      null,
      null,
      null);
  }
}
