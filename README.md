# Toggle Boolean README
Inspired by the vim plugin, toggle-bool

* Easily toggle between booleans (i.e. true and false).
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



