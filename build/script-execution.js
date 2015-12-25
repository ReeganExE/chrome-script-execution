'use strict';

(function () {
    function ScriptExecution(tabId) {
        this.tabId = tabId;
    }

    ScriptExecution.prototype.executeScripts = function (fileArray) {
        var _this = this;

        fileArray = Array.prototype.slice.call(arguments); // ES6: Array.from(arguments)
        return Promise.all(fileArray.map(function (file) {
            return exeScript(_this.tabId, file);
        })).then(function () {
            return _this;
        }); // 'this' will be use at next chain
    };

    ScriptExecution.prototype.executeCodes = function (fileArray) {
        var _this2 = this;

        fileArray = Array.prototype.slice.call(arguments);
        return Promise.all(fileArray.map(function (code) {
            return exeCodes(_this2.tabId, code);
        })).then(function () {
            return _this2;
        });
    };

    ScriptExecution.prototype.injectCss = function (fileArray) {
        var _this3 = this;

        fileArray = Array.prototype.slice.call(arguments);
        return Promise.all(fileArray.map(function (file) {
            return exeCss(_this3.tabId, file);
        })).then(function () {
            return _this3;
        });
    };

    function promiseTo(fn, tabId, info) {
        return new Promise(function (resolve) {
            fn.call(chrome.tabs, tabId, info, function (x) {
                return resolve();
            });
        });
    }

    function exeScript(tabId, path) {
        var info = { file: path, runAt: 'document_end' };
        return promiseTo(chrome.tabs.executeScript, tabId, info);
    }

    function exeCodes(tabId, code) {
        var info = { code: code, runAt: 'document_end' };
        return promiseTo(chrome.tabs.executeScript, tabId, info);
    }

    function exeCss(tabId, path) {
        var info = { file: path, runAt: 'document_end' };
        return promiseTo(chrome.tabs.insertCSS, tabId, info);
    }

    window.ScriptExecution = ScriptExecution;
})();