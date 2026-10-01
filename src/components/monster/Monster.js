import getTemplate from "./template";

export default class Monster {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.type = data.type;
    this.dangerLevel = Number(data.dangerLevel);
    this.year = Number(data.year);
  }

  render() {
    return getTemplate(this);
  }
}