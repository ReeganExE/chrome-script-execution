(function() {
    function ScriptExecution(tabId) {
        this.tabId = tabId;
    }

    ScriptExecution.prototype.executeScripts = function(fileArray) {
        fileArray = Array.prototype.slice.call(arguments); // ES6: Array.from(arguments)
        return Promise.all(fileArray.map(file => exeScript(this.tabId, file))).then(() => this); // 'this' will be use at next chain
    };

    ScriptExecution.prototype.executeCodes = function(fileArray) {
        fileArray = Array.prototype.slice.call(arguments);
        return Promise.all(fileArray.map(code => exeCodes(this.tabId, code))).then(() => this);
    };

    ScriptExecution.prototype.injectCss = function(fileArray) {
        fileArray = Array.prototype.slice.call(arguments);
        return Promise.all(fileArray.map(file => exeCss(this.tabId, file))).then(() => this);
    };

    function promiseTo(fn, tabId, info) {
        return new Promise(resolve => {
            fn.call(chrome.tabs, tabId, info, x => resolve());
        });
    }


    function exeScript(tabId, path) {
        let info = { file : path, runAt: 'document_end' };
        return promiseTo(chrome.tabs.executeScript, tabId, info);
    }

    function exeCodes(tabId, code) {
        let info = { code : code, runAt: 'document_end' };
        return promiseTo(chrome.tabs.executeScript, tabId, info);
    }

    function exeCss(tabId, path) {
        let info = { file : path, runAt: 'document_end' };
        return promiseTo(chrome.tabs.insertCSS, tabId, info);
    }

    window.ScriptExecution = ScriptExecution;
})()
