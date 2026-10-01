import getTemplate from "./template";

export default class AddForm {
  constructor(onSubmitCallback) {
    this.onSubmitCallback = onSubmitCallback;
  }

  render() {
    return getTemplate();
  }

  bindEvents(container) {
    const form = container.querySelector("#add-monster-form");
    if (!form) return;

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const newMonster = {
        name: container.querySelector("#add-name").value,
        type: container.querySelector("#add-type").value,
        dangerLevel: Number(container.querySelector("#add-danger").value),
        year: Number(container.querySelector("#add-year").value),
      };

      this.onSubmitCallback(newMonster);
      form.reset();
    });
  }
}