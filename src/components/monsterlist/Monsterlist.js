import DB from "../../DB";
import Monster from "../monster/Monster";
import getTemplate from "./template";

export default class MonsterList {
  constructor() {
    this.monsters = [];
    this.searchQuery = "";
  }

  get filteredMonsters() {
    if (!this.searchQuery) return this.monsters;
    const q = this.searchQuery.toLowerCase();
    return this.monsters.filter(
      (m) =>
        m.name.toLowerCase().includes(q) || m.type.toLowerCase().includes(q)
    );
  }

  async loadMonsters() {
    const data = await DB.findAll();
    this.monsters = data.map((item) => new Monster(item));
  }

  render() {
    return getTemplate(this);
  }

  bindEvents(container, onUpdateCallback) {
    // Ricerca in tempo reale
    const searchInput = container.querySelector("#search-input");
    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        this.searchQuery = e.target.value;
        onUpdateCallback();
      });
    }

    // Gestione azioni della tabella (Modifica, Salva, Elimina)
    const tbody = container.querySelector("#monsters-table-body");
    if (tbody) {
      tbody.addEventListener("click", async (e) => {
        const tr = e.target.closest("tr.monster-row");
        if (!tr) return;
        const id = tr.dataset.id;

        // Tasto Modifica
        if (e.target.closest(".btn-edit")) {
          tr.classList.add("isEditing");
        }

        // Tasto Salva
        if (e.target.closest(".btn-check")) {
          const updatedData = {
            name: tr.querySelector(".input-name").value,
            type: tr.querySelector(".input-type").value,
            dangerLevel: Number(tr.querySelector(".input-danger").value),
            year: Number(tr.querySelector(".input-year").value),
          };

          await DB.update(id, updatedData);
          const monster = this.monsters.find((m) => m.id === id);
          if (monster) {
            Object.assign(monster, updatedData);
          }
          tr.classList.remove("isEditing");
          onUpdateCallback();
        }

        // Tasto Elimina
        if (e.target.closest(".btn-delete")) {
          await DB.delete(id);
          this.monsters = this.monsters.filter((m) => m.id !== id);
          onUpdateCallback();
        }
      });
    }
  }

  async addMonster(monsterData) {
    const createdData = await DB.store(monsterData);
    this.monsters.push(new Monster(createdData));
  }
}