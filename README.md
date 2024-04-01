# MMM-UpdateExec

> :warning: **Alpha Version**: This is an alpha version of module

Run commands on update notifications to update modules.

## Install

**Minimal node version requirement: v18**

```bash
cd ~/MagicMirror/modules
git clone https://github.com/samy-blake/MMM-UpdateExec
```

## Configuration

This module is build on top of the [updatenotification (MagicMirrorDocs)](https://docs.magicmirror.builders/modules/updatenotification.html#using-the-module) module and use this `UPDATE` broadcast notification.

```js
{
  module: "updatenotification",
  position: "top_bar",
  config: {
    sendUpdatesNotifications: true // <-- this is important
  }
},
//[...]
{
  module: "MMM-UpdateExec",
  position: 'top_bar',
  config: {
    preCmd: ["source ~/.profile"],
    defaultCmd: ["git reset --hard", "git pull", "npm ci"],
    customExecs: {
	  "MMM-Pir": [ // Modulname
		"npm run update" // cmd
      ],
    }
  }
}
```

| Parameter   | Description                                   | Type          | Default                                      |
| ----------- | --------------------------------------------- | ------------- | -------------------------------------------- |
| preCmd      | Command that run global before all other Cmds | string[]      | `["source ~/.profile"]`                      |
| defaultCmd  | Command that run in the Modul directory       | string[]      | `["git reset --hard", "git pull", "npm ci]"` |
| customExecs | Custom command for specific module            | { moduleCmd } | `["git reset --hard", "git pull", "npm ci]"` |

All commands a joined by `' && '`.

### moduleCmd Doc

```js
customExecs: {
  [moduleName: string]: string[];
}
```

## Update

only pull from main

```bash
git pull
```
