'use babel';

export default class MyValidateView {

  constructor(serializedState) {
    // Create root element
    this.element = document.createElement('div');
    this.element.classList.add('my-validate');

    // Create message element
    this.message = document.createElement('div');
    this.message.textContent = 'The MyValidate package is Alive! It\'s ALIVE!111';
    this.message.classList.add('message');
    this.element.appendChild(this.message);
  }

  // Returns an object that can be retrieved when package is activated
  serialize() {}

  // Tear down any state and detach
  destroy() {
    this.element.remove();
  }
  setCount(words){
    // var append = document.createElement('span');
    // append.textContent = '我是好人';
    // // message.classList.add('message');
    // // this.element.appendChild(message);
    // this.getElement().appendChild(append);
    this.message.textContent = '我是好人'
    this.getElement().textContent = '我是好人'
  }

  getElement() {
    return this.element;
  }

}
