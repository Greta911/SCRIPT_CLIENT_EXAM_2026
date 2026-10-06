import './styles.css';
import App from './components/App';

window.monsterApp = new App({
  el: "#app",
  title: "Monster Archive",
  apiURL: "https://6aba52d35b549d818d6247a3.mockapi.io/",
});

window.monsterApp.render();