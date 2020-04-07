import Key from './Key.js';

class Keyboard {
  constructor(keyRows, layoutsMap, layout = 'eng') {
    this.layout = layout;
    this.keyRows = keyRows;
    this.keys = {};
    this.html = '';
    this.layoutsMap = layoutsMap;
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

      if (e.shiftKey) {
        this.redrawKeyboard(this.layout, e.shiftKey);
      }
    });
    document.addEventListener('keyup', (e) => {
      e.preventDefault();
      const key = this.keys[Key.getIdFromCode(e.code)];
      if (key) {
        key.upKey();
      }
      if (e.code.indexOf('Shift' !== -1)) {
        this.redrawKeyboard(this.layout, false);
      }
    });
  }

  redrawKeyboard(layout, isShift) {
    this.layout = layout;
    Object.keys(this.keys).forEach((k) => {
      const key = this.keys[k];
      const layoutObj = this.layoutsMap[this.layout][key.keyCode];
      const newText = isShift ? layoutObj.shiftText : layoutObj.text;
      if (newText) {
        key.redraw(newText);
      }
    });
  }
}

export { Keyboard as default };
