import Key from './Key.js';

class Keyboard {
  constructor(keyRows, layoutsMap, layout = 'eng') {
    this.layout = layout;
    this.keyRows = keyRows;
    this.keys = {};
    this.html = '';
    this.addRows(this.keyRows, layoutsMap[this.layout]);
    this.id = 'keyboard';
    this.addListeners();
  }

  addRows(keyRows, layout) {
    keyRows.forEach((row) => {
      let rowHtml = '';
      row.forEach((keyObj) => {
        const layoutObj = layout[keyObj.keyCode];
        rowHtml += this.addKey(keyObj, layoutObj);
      });
      this.html += `<div class="row keyboard__row">${rowHtml}</div>`;
    });
    this.html = `<div class="keyboard" id="${this.id}">${this.html}</div>`;
  }

  addKey(keyObj, layoutKeyObj) {
    const key = new Key(
      keyObj.keyCode,
      layoutKeyObj.text,
      keyObj.isControl,
      keyObj.width
    );
    this.keys[key.id] = key;
    return key.getHtml();
  }

  addListeners() {
    document.addEventListener('keydown', (e) => {
      e.preventDefault();
      const key = this.keys[Key.getIdFromCode(e.code)];
      if (key) {
        key.downKey();
      }
    });
    document.addEventListener('keyup', (e) => {
      e.preventDefault();
      const key = this.keys[Key.getIdFromCode(e.code)];
      if (key) {
        key.upKey();
      }
    });
  }
}

export { Keyboard as default };
