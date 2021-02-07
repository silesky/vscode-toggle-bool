import * as vscode from "vscode";
import { swapText } from "./utils";

const hasActiveSelections = (editor: vscode.TextEditor): boolean => {
  if (editor.selections.length > 1) {
    return true;
  }
  return !editor.selection.isEmpty;
};

const swapBoolFromSelection = (editor: vscode.TextEditor): void => {
  const selectedText = editor.document.getText(editor.selection);
  const newText = swapText(selectedText);
  editor.edit((e) => {
    editor.selections.forEach((selection) => e.replace(selection, newText));
  });
};

const swapBoolFromCursor = (editor: vscode.TextEditor): void => {
  const { end } = editor.selection;
  const wordRange = editor.document.getWordRangeAtPosition(end);
  const wordUnderCursor = editor.document.getText(wordRange);
  const newWordUnderCursor = swapText(wordUnderCursor);
  editor.edit((e) => {
    if (!wordRange) return undefined;
    e.replace(wordRange, newWordUnderCursor);
  });
};

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand(
    "extension.toggleBool",
    () => {
      const editor = vscode.window.activeTextEditor;
      //  executed every time the command is executed
      if (!editor || editor.document.isClosed) return;
      if (hasActiveSelections(editor)) {
        swapBoolFromSelection(editor);
      } else {
        swapBoolFromCursor(editor);
      }
    }
  );
  context.subscriptions.push(disposable);
}

// method called when extension is deactivated
export function deactivate() {}
