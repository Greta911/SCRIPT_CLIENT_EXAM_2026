import DB from "../../DB";
import Monster from "../monster/Monster";
import getTemplate from "./template";

export default class MonsterList {
  constructor() {
    this.monsters = [];
    this.searchQuery = "";
    //Stato per l'ordinamento (Tri)
    this.sortKey = null; //'name', 'type', 'dangerLevel', 'year'
    this.sortAsc = true;  //true = crescente, false = decrescente
  }

  async loadMonsters() {
    const data = await DB.findAll();
    this.monsters = data.map((item) => new Monster(item));
  }

   async addMonster(monsterData) {
    const createdData = await DB.store(monsterData);
    this.monsters.push(new Monster(createdData));
  }


  get filteredMonsters() {
    if (!Array.isArray(this.monsters)) return [];

    let list = [...this.monsters];
  //Recherche multimot
    if (this.searchQuery && this.searchQuery.trim()) {
      const terms = this.searchQuery.toLowerCase().trim().split(/\s+/);
      list = list.filter((m) => {
        const textToSearch = `${m.name} ${m.type}`.toLowerCase();
        return terms.every((term) => textToSearch.includes(term));
      });
    }

    //Triage (Tri)
    if (this.sortKey) {
      list.sort((a, b) => {
        let valA = a[this.sortKey];
        let valB = b[this.sortKey];

        //Si la valeur est une chaîne de charactères (es. name, type), j'utilise localeCompare
        if (typeof valA === "string") {
          return this.sortAsc
            ? valA.localeCompare(valB)
            : valB.localeCompare(valA);
        } else {
          //Si c'est un numèro (es. dangerLevel, year)
          return this.sortAsc ? valA - valB : valB - valA;
        }
      });
    }

    return list;
  }

  //Render du component principale
  render() {
    return getTemplate(this);
  }

  //Mettre à jour le tbody et le compteur totale
updateTableOnly(container) {
    const tbody = container.querySelector("#monsters-table-body");
    const countBadge = container.querySelector("#total-monsters-count");

    if (tbody) {
      tbody.innerHTML = this.filteredMonsters.map((m) => m.render()).join("");
    }
    if (countBadge) {
      countBadge.textContent = `${this.filteredMonsters.length} / ${this.monsters.length}`;
    }
  }


  //Gestion des événements: recherche, triage,modification, sauvegarde et elimination
  bindEvents(container, onUpdateCallback) {
    //Recherche 
    container.querySelector("#search-input").addEventListener("input", (e) => {
      this.searchQuery = e.target.value;
      this.updateTableOnly(container);
    });

    //Triage (Click dans les header)
    container.querySelector("thead").addEventListener("click", (e) => {
      const sortBtn = e.target.closest(".sort-btn");
      if (!sortBtn) return;

      e.preventDefault();
      const field = sortBtn.dataset.sort;

      this.sortAsc = this.sortKey === field ? !this.sortAsc : true;
      this.sortKey = field;

      onUpdateCallback();
    });

    //Delegation événements sur le tableau (Switch pour plus d'ordre)
    container.querySelector("#monsters-table-body").addEventListener("click", async (e) => {
      const btn = e.target.closest("button");
      if (!btn) return;

      const action = btn.dataset.action;
      const id = btn.dataset.id;
      const monster = this.monsters.find((m) => m.id == id);

      switch (action) {
        case "edit":
          monster.isEditing = true;
          onUpdateCallback();
          break;

        case "cancel":
          monster.isEditing = false;
          onUpdateCallback();
          break;

        case "delete":
          if (confirm(`Eliminare ${monster.name}?`)) {
            await DB.delete(id);
            this.monsters = this.monsters.filter((m) => m.id != id);
            onUpdateCallback();
          }
          break;

        case "save": {
          const tr = btn.closest("tr");

          const updatedData = {
            name: tr.querySelector(".edit-name").value.trim(),
            type: tr.querySelector(".edit-type").value.trim(),
            dangerLevel: parseInt(tr.querySelector(".edit-danger").value),
            year: parseInt(tr.querySelector(".edit-year").value),
          };

          const updatedMonsterData = await DB.update(id, updatedData);
          monster.updateData(updatedMonsterData);
          monster.isEditing = false;
          onUpdateCallback();
          break;
        }
      }
    });
  }
}