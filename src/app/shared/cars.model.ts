export class Cars {
  public id: Number;
  public name: string;
  constructor(id: Number, name: string) {
    (this.id = id), (this.name = name);
  }
}
