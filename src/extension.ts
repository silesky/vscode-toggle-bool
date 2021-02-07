import * as vscode from "vscode";
import { swapText } from "./utils";

// is anything actually selected (not simply a stray cursor)
const hasActiveSelections = (editor: vscode.TextEditor): boolean => {
  // editor.selections.length appears to always be at least 1, even if there's no text whatsoever in the editor.
  return Boolean(editor.selections.length && !editor.selection.isEmpty);
};

function exists<T>(v: T): v is NonNullable<T> {
  return v !== null && v !== undefined;
}

const getCursorSelection = (editor: vscode.TextEditor): vscode.Range[] => {
  const hasRegularSelection = hasActiveSelections(editor);
  if (hasRegularSelection) return [];
  const words = editor.selections
    .map((e) => editor.document.getWordRangeAtPosition(e.end))
    .filter(exists);
  return words;
};

const hasCursorSelection = (editor: vscode.TextEditor): boolean => {
  return !!getCursorSelection(editor).length;
};

const swapBoolFromSelection = async (editor: vscode.TextEditor) => {
  const selectedText = editor.document.getText(editor.selection);
  const newText = swapText(selectedText);
  await editor.edit((e) => {
    editor.selections.forEach((selection) => e.replace(selection, newText));
  });
};

const swapBoolFromCursor = async (editor: vscode.TextEditor) => {
  const wordRanges = getCursorSelection(editor);
  for (const range of wordRanges) {
    const wordUnderCursor = editor.document.getText(range);
    const newWordUnderCursor = swapText(wordUnderCursor);
    // the async behavior is important for _all_ of the edits to complete successfully
    // without returning a promise that is awaited on, it will only successfully complete one of the edits.
    await editor.edit((e) => {
      e.replace(range, newWordUnderCursor);
    });
  }
};

export function activate(context: vscode.ExtensionContext): void {
  const disposable = vscode.commands.registerCommand(
    "extension.toggleBool",
    async () => {
      const editor = vscode.window.activeTextEditor;
      //  executed every time the command is executed
      if (!editor || editor.document.isClosed) return;
      if (hasActiveSelections(editor)) {
        await swapBoolFromSelection(editor);
      } else if (hasCursorSelection(editor)) {
        await swapBoolFromCursor(editor);
      }
    }
  );
  context.subscriptions.push(disposable);
}

// method called when extension is deactivated
export function deactivate() {}
