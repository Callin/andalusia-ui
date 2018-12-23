export class Organization {

  id: number;

  name: string;

  description: string;


  constructor(id: number,
              name: string,
              description: string) {
    this.id = id;
    this.name = name;
    this.description = description;
  }

  static getBlankOrganization(): Organization {
    return new Organization(
      null,
      null,
      null);
  }
}
