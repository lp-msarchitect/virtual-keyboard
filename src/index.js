import keys from './keys.js';
import Keyboard from './Keyboard.js';

const layout = localStorage.layout || 'eng';
const keyboard = new Keyboard(keys, layout);
keyboard.addListeners(document);
document.body.insertAdjacentHTML(
  'afterbegin',
  `<textarea id="output" rows=10 cols=85></textarea>${keyboard.html}<br><br><div>Переключение раскладки Alt+Shift</div>`
);
