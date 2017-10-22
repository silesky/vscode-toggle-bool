import * as vscode from 'vscode';

const hasActiveSelections = (editor: vscode.TextEditor): boolean => {
  if (editor.selections.length > 1) {
    return true;
  }
  return !editor.selection.isEmpty;
};

const swapText = textBlob => {
  const findAndReplace = (textBlob, mapObj) => {
    const re = new RegExp(Object.keys(mapObj).join("|"),"gi");
    const textBlobWithReplacements = textBlob.replace(re, matched => mapObj[matched]);
    return textBlobWithReplacements;
  }
  const boolish = {
    true: false,
    false: true,
    0: 1,
    1: 0
  };
 return findAndReplace(textBlob, boolish);
};

const swapSelectedBool = editor => {
  console.log('swap selected');
  if (!editor) return;
  const selectedText = editor.document.getText(editor.selection);
  const newText = swapText(selectedText);
  editor.edit(e => {
    editor.selections.forEach(selection => e.replace(selection, newText));
  });
};

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  console.log('extension activated.');

  const editor = vscode.window.activeTextEditor;
  let disposable = vscode.commands.registerCommand(
    'extension.toggleBool',
    () => {
      // The code you place here will be executed every time your command is executed
      // Display a message box to the user
      if (!editor) return;
      if (hasActiveSelections(editor)) {
        swapSelectedBool(editor);
      } else {
        console.log('no selection');
      }
    },
  );
  context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
