import keys from './keys.js';
import Keyboard from './Keyboard.js';

const keyboard = new Keyboard(keys.keyRows, keys.layoutMaps, 'eng');
document.body.insertAdjacentHTML('afterbegin', keyboard.html);
