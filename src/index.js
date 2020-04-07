import keys from './keys.js';
import Keyboard from './Keyboard.js';

const layout = localStorage.layout ? localStorage.layout : 'eng';
const keyboard = new Keyboard(keys.keyRows, keys.layoutMaps, layout);
document.body.insertAdjacentHTML(
  'afterbegin',
  `<textarea id="output" rows=10 cols=85></textarea>${keyboard.html}<div>Переключение раскладки Alt+Shift</div>`
);
