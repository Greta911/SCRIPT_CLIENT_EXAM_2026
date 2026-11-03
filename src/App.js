import DB from "./DB";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import AddForm from "./components/addform/Addform";
import MonsterList from "./components/monsterlist/Monsterlist";

export default class App {
  constructor(config) {
    this.container = document.querySelector(config.el);
    DB.setApiURL(config.apiURL);

    // Initialisation des composants
    this.header = new Header(config.title || "Monster Archive");
    this.footer = new Footer();
    this.monsterList = new MonsterList();
    //bind(this) rappel que cette fonction appartient à App, peu importe où et par qui elle sera appelée
    //C'est le moyen de forcer le scope(portée) à rester attaché au bon objet parent pour éviter que le code ne perde le fil
    this.addForm = new AddForm(this.handleAddMonster.bind(this));
  }

  async init() {
    await this.monsterList.loadMonsters();
    this.render();
  }
  //callback qui s'occupe de l'ajout d'un monstre
  async handleAddMonster(newMonsterData) {
    await this.monsterList.addMonster(newMonsterData);
    // Au lieu de tout re-rendre, on met juste à jour la portion tableau/compteur
    this.monsterList.updateTableOnly(this.container);
  }

  render() {
    // Structure globale fixe de l'application
    this.container.innerHTML = `
      ${this.header.render()}

      <main class="flex flex-col md:flex-row gap-8">
        ${this.addForm.render()}
        ${this.monsterList.render()}
      </main>

      ${this.footer.render()}
    `;

    // Attachement des écouteurs globaux une seule fois après le premier render
    this.addForm.bindEvents(this.container);
    
    // Pour MonsterList, on passe un callback ciblé pour rafraîchir uniquement le tableau si besoin (tri, édition, suppression)
    this.monsterList.bindEvents(this.container, () => {
      this.monsterList.updateTableOnly(this.container);
    });
  }
}