import keys from './keys.js';
import Keyboard from './Keyboard.js';

const layout = localStorage.layout ? localStorage.layout : 'eng';
const keyboard = new Keyboard(keys.keyRows, keys.layoutMaps, layout);
document.body.insertAdjacentHTML('afterbegin', keyboard.html);
