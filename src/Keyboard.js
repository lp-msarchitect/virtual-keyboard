import Key from './Key.js';

class Keyboard {
  constructor(keyRows, layoutsMap, layout = 'eng') {
    this.layout = layout;
    this.keyRows = keyRows;
    this.keys = {};
    this.html = '';
    this.addRows(this.keyRows, layoutsMap[this.layout]);
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
    this.html = `<div class="keyboard">${this.html}</div>`;
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
}

export { Keyboard as default };
