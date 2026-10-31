import getTemplate from "./template";

export default class Header {
  constructor(title) {
    this.title = title;
  }

  render() {
    return getTemplate(this.title);
  }
}