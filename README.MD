From Chrome v32, it supports [Promise][1]. It's easy to [chrome.tabs.executeScript][2] multiple scripts.


# Usage example:

```javascript
new ScriptExecution(tab.id)
    .executeScript("js/jquery.js", "js/script.js")
    .then(s => s.executeCodes('console.log("executes code...")'))
    .then(s => s.injectCss("css/style.css"))
    .then(s => console.log('done'));
```
OR

```javascript
let executer = new ScriptExecution(tab.id);

executer.executeScript("js/jquery.js", "js/script.js")
    .then(s => s.executeCodes('console.log("executes code...")'))
    .then(s => s.injectCss("css/style.css"))
    .then(s => console.log('done'));
```

More info: http://stackoverflow.com/questions/21535233/injecting-multiple-scripts-through-executescript-in-google-chrome/34456163#34456163

[1]: https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise
[2]: https://developer.chrome.com/extensions/tabs#method-executeScript