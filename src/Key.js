class Key {
  constructor(keyCode, text='', isControl = false, width = 0) {
    this.keyCode = keyCode;
    this.id(keyCode);
    this.text = text;
    this.isControl = isControl;
    this.setHTML(width);
  }

  set id(code) {
    this.id = code.split('').reduce((idStr, char) => {
      return idStr + char.toUpperCase() === char
        ? `-${char.toLowerCase()}`
        : char;
    }, '');
  }

  get id() {
    return this.id;
  }

  set setHTML(width) {
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
    this.htmlStr = `<div class="${classes}">${this.text}</div>`;
  }

  get getHTML(){
    return this.htmlStr;
  }

export { Key as default };
