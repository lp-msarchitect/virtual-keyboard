class Key {
  constructor(keyCode, text = '', isControl = false, width = 0) {
    this.keyCode = keyCode;
    this.id = keyCode;
    this.text = text;
    this.isControl = isControl;
    this.setHtml(width);
  }

  set id(code) {
    let id = 'key';
    const codeArr = code.split('');
    for (let i = 0; i < codeArr.length; i++) {
      const char = codeArr[i];
      if (char.toUpperCase() === char) {
        id += `-${char.toLowerCase()}`;
      } else {
        id += char;
      }
    }
    this.htmlId = id;
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
}

export { Key as default };
