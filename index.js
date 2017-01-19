define(["require", "exports"], function (require, exports) {
    "use strict";
    var Level;
    (function (Level) {
        Level[Level["DEBUG"] = 0] = "DEBUG";
        Level[Level["INFO"] = 1] = "INFO";
        Level[Level["WARNING"] = 2] = "WARNING";
        Level[Level["ERROR"] = 3] = "ERROR";
    })(Level = exports.Level || (exports.Level = {}));
    var Logger = (function () {
        function Logger(level) {
            if (level === void 0) { level = Level.DEBUG; }
            this.levelMin = level;
        }
        Logger.allElementOfString = function (element, index, array) {
            return typeof element === "string";
        };
        Logger.argsToString = function (arg) {
            var argLine;
            var allString = arg.every(Logger.allElementOfString);
            if (allString)
                argLine = arg;
            else
                argLine = JSON.stringify(arg, null, 4);
            return argLine;
        };
        Logger.applyConsoleLog = function (color, label, args) {
            var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
            if (isChrome || !Logger.isIE()) {
                var log = Logger.argsToString(args);
                if (Array.isArray(log))
                    log = log.join(" ");
                return window.console.log.bind(window.console, "%c" + label + " " + log, color);
            }
            else {
                return window.console.log.bind(window.console, args);
            }
        };
        Logger.isIE = function () {
            var ua = window.navigator.userAgent;
            var msie = ua.indexOf("MSIE ");
            return msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./);
        };
        Logger.prototype.debug = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            if (this.levelMin > Level.DEBUG)
                return function () { };
            return Logger.applyConsoleLog("color: blue;", "[DEBUG]", args);
        };
        Logger.prototype.info = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            if (this.levelMin > Level.INFO)
                return function () { };
            return Logger.applyConsoleLog("color: black;", "[INFO]", args);
        };
        Logger.prototype.warning = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            if (this.levelMin > Level.WARNING)
                return function () { };
            return Logger.applyConsoleLog("color: #eeac00;", "[WARNING]", args);
        };
        Logger.prototype.error = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            if (this.levelMin > Level.ERROR)
                return;
            return Logger.applyConsoleLog("color: red;", "[ERROR]", args);
        };
        return Logger;
    }());
    exports.Logger = Logger;
});
