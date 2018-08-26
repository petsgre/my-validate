'use babel';

import MyValidateView from './my-validate-view';
import { CompositeDisposable } from 'atom';

export default {

  myValidateView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.myValidateView = new MyValidateView(state.myValidateViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.myValidateView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'my-validate:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.myValidateView.destroy();
  },

  serialize() {
    return {
      myValidateViewState: this.myValidateView.serialize()
    };
  },

  toggle() {
    console.log('MyValidate was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
