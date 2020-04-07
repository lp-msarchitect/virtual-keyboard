import keys from './src/keys.js';
import Keyboard from './src/Keyboard.js';

const layout = localStorage.layout ? localStorage.layout : 'eng';
const keyboard = new Keyboard(keys.keyRows, keys.layoutMaps, layout);
document.body.insertAdjacentHTML(
  'afterbegin',
  `<textarea id="output" rows=10 cols=85></textarea>${keyboard.html}<br><br><div>Переключение раскладки Alt+Shift</div>`
);
