import './styles.css';
import DB from "./DB";
import AddForm from "./components/addform/AddForm";
import MonsterList from "./components/monsterlist/Monsterlist";

class App {
  constructor(elSelector, apiURL) {
    this.container = document.querySelector(elSelector);
    DB.setApiURL(apiURL);

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

  render() {
    this.container.innerHTML = `
      <header class="text-center mb-10">
        <p class="text-[var(--silver)] tracking-widest text-sm">A creature feature archive</p>
        <h1 class="marquee text-6xl md:text-8xl my-3">Monster Archive</h1>
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

    // Collegamento degli eventi DOM
    this.addForm.bindEvents(this.container);
    this.monsterList.bindEvents(this.container, () => this.render());
  }
}

const app = new App("#app", "https://6aba52d35b549d818d6247a3.mockapi.io/");
app.init();