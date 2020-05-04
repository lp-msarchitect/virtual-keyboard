import Key from './Key.js';

class Keyboard {
  constructor(keys, layout = 'eng') {
    this.layout = layout;
    this.keyRows = keys.keyRows;
    this.keys = {};
    this.html = '';
    this.layoutsMap = keys.layoutMaps;
    this.addRows(keys.keyRows, keys.layoutMaps[this.layout]);
    this.id = 'keyboard';
    this.handlers = [];
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

  static output(key) {
    const outputElement = document.getElementById('output');
    if (!key.isControl) {
      outputElement.value += key.text;
    } else {
      switch (key.keyCode) {
        case 'Enter':
          outputElement.value += '\n';
          break;
        case 'Tab':
          outputElement.value += '\t';
          break;
        case 'Backspace':
          outputElement.value = outputElement.value.slice(0, -1);
          break;
        default:
          break;
      }
    }
    outputElement.focus();
  }

  addListeners(rootObj) {
    if (this.handlers.length) {
      return;
    }

    const clickHandler = (e) => {
      if (e.target.id.indexOf('key') === 0) {
        Keyboard.output(this.keys[e.target.id]);
        this.keys[e.target.id].downKey();
        this.keys[e.target.id].upKey();
      }
    };

    const keydownHandler = (e) => {
      e.preventDefault();

      const key = this.keys[Key.getIdFromCode(e.code)];
      if (key) {
        key.downKey();
        Keyboard.output(key);
      }

      if (e.shiftKey) {
        this.redrawKeyboard(e.shiftKey);
      }

      if (e.shiftKey && e.altKey) {
        this.changeLayout();
      }
    };

    const keyupHandler = (e) => {
      e.preventDefault();
      const key = this.keys[Key.getIdFromCode(e.code)];
      if (key) {
        key.upKey();
      }
      if (e.code.indexOf('Shift' !== -1)) {
        this.redrawKeyboard(false);
      }
    };

    this.handlers.push(['click', clickHandler]);
    this.handlers.push(['keyup', keyupHandler]);
    this.handlers.push(['keydown', keydownHandler]);

    this.handlers.forEach((conf) => {
      rootObj.addEventListener(conf[0], conf[1]);
    });
  }

  removeListeners(rootObj) {
    this.handlers.forEach((conf) => {
      rootObj.removeEventListener(conf[0], conf[1]);
    });
  }

  changeLayout() {
    this.layout = this.layout === 'rus' ? 'eng' : 'rus';
    this.redrawKeyboard(false);
    localStorage.setItem('layout', this.layout);
  }

  redrawKeyboard(isShift) {
    // this.layout = layout;
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
