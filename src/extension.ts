/**
 * Smart Search Extension
 * Author: @trystan4861
 *
 * Ctrl+Shift+F:
 *  - Uses selected text if any
 *  - Otherwise uses clipboard
 *  - Trims trailing spaces
 *  - Launches search directly
 */

import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

  const disposable = vscode.commands.registerCommand('smartSearch.find', async () => {

    let searchText: string | undefined;

    // 1️⃣ Try to get selected text from active editor
    const editor = vscode.window.activeTextEditor;
    if (editor) {
      const selection = editor.selection;
      if (!selection.isEmpty) {
        searchText = editor.document.getText(selection);
      }
    }

    // 2️⃣ Fallback to clipboard
    if (!searchText) {
      searchText = await vscode.env.clipboard.readText();
    }

    if (!searchText) {
      return;
    }

    // 3️⃣ Trim only trailing spaces
    const cleaned = searchText.trimEnd();

    // 4️⃣ Launch native search
    await vscode.commands.executeCommand('workbench.action.findInFiles', {
      query: cleaned
    });

  });

  context.subscriptions.push(disposable);
}

export function deactivate() {}
