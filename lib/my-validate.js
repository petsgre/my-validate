/**
 * 染色地图的'样式'Tab配置
 * @since 2017-08-04
 */
'use babel';

import MyValidateView from './my-validate-view';
import {
  CompositeDisposable
} from 'atom';
export default {

  myValidateView: null,
  modalPanel: null,
  subscriptions: null,

  initialize(state) {
    this.idisposable = atom.workspace.observeActivePaneItem(editor => {
      if (!editor || !editor.getText) return;
      let ochangeTitle = editor.onDidChangeTitle(() => {
        // this.initVue(editor);
      })
      editor.onDidDestroy(() => {
        ochangeTitle.dispose();
      })
      // this.initVue(editor)
      ;
    })

  },
  serialize() {
    return {
      initFileViewState: this.initFileView.serialize()
    }
  },

  activate(state) {
    var hasNotes = function(text) {
      text = text.trim()
      if (text && text.length > 2) {
        console.log(text.substring(0, 3)==='/**');
      }
    }
    this.myValidateView = new MyValidateView(state.myValidateViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.myValidateView.getElement(),
      visible: false
    });
    var modalPanel = this.modalPanel
    this.modalPanel.item.addEventListener("click", function() {
      modalPanel.hide()
    })
    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'my-validate:toggle': () => this.toggle()
    }));
    this.subscriptions.add(atom.workspace.observeTextEditors((editor) => {
      editor.onDidSave(() => {
        // console.log(editor.getTitle());
        var fileName = editor.getTitle()
        var postfix = /\.[^\.]+/.exec(fileName); //获取文件的后缀

        console.log(postfix);

        if (postfix && postfix[0] === '.js') {
          hasNotes(editor.getText())
          atom.notifications.addSuccess("检查成功")
        }
        // console.log(editor.getText());
        // if (hasValidScope(editor, scopes)
        //   && atom.config.get('linter-eslint.fixOnSave')
        // ) {
        //   await this.fixJob(true)
        // }
      })
    }))
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
    isVisible = this.modalPanel.isVisible()
    if (isVisible) {
      return (this.modalPanel.hide())
    } else {
      editor = atom.workspace.getActiveTextEditor()
      words = editor.getText().split(/\s+/).length
      this.myValidateView.setCount(words)
      return (this.modalPanel.show())

    }
    // return (
    //   this.modalPanel.isVisible() ?
    //   this.modalPanel.hide() :
    //   this.modalPanel.show()
    // );
  }

};
