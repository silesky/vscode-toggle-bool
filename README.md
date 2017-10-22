# Toggle Boolean
Inspired by the vim plugin, toggle-bool

* Easily toggle between booleans (i.e. true and false).
* Toggles selected boolean(s), or just the boolean that's beneath the cursor.
* Default keybinding: `cmd+k b` (or set a custom one).

## List of boolean values supported:
* true <-> false
* yes <-> no
* on <-> off
* 0 <-> 1

## Keybinding
* Extension adds the following keybinding:
```js
  {
    "key": "cmd+k b",
    "command": "extension.toggleBool",
    "when": "editorTextFocus"
  }
```
Copy ^ to your `keybindings.json` and modify where appropriate to override.

## Links
* VS Marketplace [Link](https://marketplace.visualstudio.com/items?itemName=silesky.toggle-boolean).
* Github [Link](https://github.com/silesky/vscode-toggle-bool).
