# Toggle Boolean

Inspired by the vim plugin, toggle-bool

- Easily toggle between booleans (i.e. true and false).
- Toggles selected boolean(s), or just the boolean that's beneath the cursor.
- Default keybinding: `alt+b` (or set a custom one).

## List of boolean values by default

- true <-> false
- yes <-> no
- on <-> off
- 0 <-> 1

## Keybinding

- Extension adds the following keybinding:

```json
{
  "key": "alt+b",
  "command": "extension.toggleBool",
  "when": "editorTextFocus"
}
```

Copy ^ to your `keybindings.json` and customize to override.

## You can override the default booleans in your `settings.json`, and even create a

```json
  ...
  "toggleboolean.mapping": {
    "true": false,
    "false": true,
    "yes": "no",
    "no": "yes",
    "on": "off",
    "off": "on"
  },
```

## You can define mappings in both directions, so you can even create a linear state machine.

```json
  ...
  "toggleboolean.mapping": {
    "0": 1,
    "1": 2,
    "2": 3,
    "3": 0
  },
```

## Links

- VS Marketplace [Link](https://marketplace.visualstudio.com/items?itemName=silesky.toggle-boolean).
- Github [Link](https://github.com/silesky/vscode-toggle-bool).
