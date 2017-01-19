export enum Level {
    DEBUG,
    INFO,
    WARNING,
    ERROR
}

export class Logger {

    public levelMin: number;

    constructor(level: number = Level.DEBUG) {
        this.levelMin = level;
    }

    

    private static allElementOfString(element, index, array) {
        return typeof element === "string";
    }

    private static argsToString(arg) {
        let argLine;
        let allString = arg.every(Logger.allElementOfString);
        if (allString) argLine = arg;
        else argLine = JSON.stringify(arg, null, 4);
        return argLine;
    }

    private static applyConsoleLog(color, label, args) {
        let isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
        if (isChrome || !Logger.isIE()) {
            let log = Logger.argsToString(args);
            if (Array.isArray(log)) log = log.join(" ");
            return window.console.log.bind(window.console, `%c${label} ${log}`, color)
        } else {
            return window.console.log.bind(window.console, args);
        }
    }

    private static isIE() {
        let ua = window.navigator.userAgent;
        let msie = ua.indexOf("MSIE ");
        return msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./);
    }

    public debug(...args): Function {
        if (this.levelMin > Level.DEBUG) return () => {};
        return Logger.applyConsoleLog("color: blue;", "[DEBUG]", args);
    }

    public info(...args): Function {
        if (this.levelMin > Level.INFO) return () => {};
        return Logger.applyConsoleLog("color: black;", "[INFO]", args);
    }

    public warning(...args): Function {
        if (this.levelMin > Level.WARNING) return () => {};
        return Logger.applyConsoleLog("color: #eeac00;", "[WARNING]", args);
    }

    public error(...args): Function {
        if (this.levelMin > Level.ERROR) return;
        return Logger.applyConsoleLog("color: red;", "[ERROR]", args);
    }

}

