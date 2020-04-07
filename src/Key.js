const PRESS_KEY_CLASS = 'key--pressed';

class Key {
  constructor(keyCode, text = '', isControl = false, width = 0) {
    this.keyCode = keyCode;
    this.id = keyCode;
    this.text = text;
    this.isControl = isControl;
    this.setHtml(width);
  }

  static getIdFromCode(code) {
    let id = 'key';
    const codeArr = code.split('');
    for (let i = 0; i < codeArr.length; i += 1) {
      const char = codeArr[i];
      if (char.toUpperCase() === char) {
        id += `-${char.toLowerCase()}`;
      } else {
        id += char;
      }
    }
    return id;
  }

  set id(code) {
    this.htmlId = Key.getIdFromCode(code);
  }

  get id() {
    return this.htmlId;
  }

  setHtml(width) {
    let classes = 'key';
    if (this.isControl) {
      classes += ' key--control';
    }
    switch (width) {
      case 1:
        classes += ' key--middle-long';
        break;
      case 2:
        classes += ' key--long';
        break;
      case 3:
        classes += ' key--very-long';
        break;
      default:
        break;
    }
    this.htmlStr = `<div class="${classes}" id="${this.id}">${this.text}</div>`;
  }

  getHtml() {
    return this.htmlStr;
  }

  downKey() {
    const keyElement = document.getElementById(this.id);
    if (!keyElement.classList.contains(PRESS_KEY_CLASS)) {
      keyElement.classList.add(PRESS_KEY_CLASS);
    }
  }

  upKey() {
    const keyElement = document.getElementById(this.id);
    keyElement.classList.remove(PRESS_KEY_CLASS);
  }

  redraw(text) {
    this.text = text;
    document.getElementById(this.id).innerText = this.text;
  }
}

export { Key as default };
