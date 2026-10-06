import DB from "../DB";
import AddForm from "./addform/AddForm";
import MonsterList from "./monsterlist/Monsterlist";

export default class App {
  constructor(config) {
    this.container = document.querySelector(config.el);
    this.title = config.title || "Monster Archive";
    DB.setApiURL(config.apiURL);

    this.monsterList = new MonsterList();
    this.addForm = new AddForm(this.handleAddMonster.bind(this));
  }

  async init() {
    await this.monsterList.loadMonsters();
    this.render();
  }

  async handleAddMonster(newMonsterData) {
    await this.monsterList.addMonster(newMonsterData);
    this.render();
  }

  async render() {
    //Si les monstres ne sont pas encore chargés, on les charge au premier render
    if (!this.monsterList.monsters || this.monsterList.monsters.length === 0) {
      await this.monsterList.loadMonsters();
    }

    this.container.innerHTML = `
      <header class="text-center mb-10">
        <p class="text-[var(--silver)] tracking-widest text-sm">A creature feature archive</p>
        <h1 class="marquee text-6xl md:text-8xl my-3">${this.title}</h1>
        <p class="text-[var(--silver)] italic">
          They rose from the deep between 1950 and 1969. Someone had to keep the records.
        </p>
      </header>

      <main class="flex flex-col md:flex-row gap-8">
        ${this.addForm.render()}
        ${this.monsterList.render()}
      </main>

      <footer class="text-center text-[var(--silver)] text-sm mt-10 italic">
        &copy; EAFC 2026 Monster Archive. No creature was harmed during development.
      </footer>
    `;

    //Liens des événements du DOM
    this.addForm.bindEvents(this.container);
    this.monsterList.bindEvents(this.container, () => this.render());
  }
}