import getTemplate from "./template";

export default class Monster {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.type = data.type;
    this.dangerLevel = Number(data.dangerLevel);
    this.year = Number(data.year);
    this.isEditing = false;
  }

  //Getter pour calculer les icônes de danger dynamiquement
  get dangerSkulls() {
    const level = Math.min(Math.max(this.dangerLevel, 1), 5);
    return "☠️".repeat(level);
  }

  updateData(data) {
    this.name = data.name;
    this.type = data.type;
    this.dangerLevel = Number(data.dangerLevel) || 1;
    this.year = Number(data.year);
  }

  render() {
    return getTemplate(this);
  }
}