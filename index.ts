export enum Level {
    DEBUG = 1,
    HELP = 2,
    INFO = 3,
    WARNING = 4,
    ERROR = 5
}

export class Logger {

    public levelMin: number;

    constructor(level: number = Level.DEBUG) {
        this.levelMin = level;
    }

    public debug(...args): Function {
        if (this.levelMin > Level.DEBUG) return () => {};
        return Logger.applyConsoleLog("color: blue;", "[DEBUG]", args);
    }

    public help(...args): Function {
        if (this.levelMin > Level.DEBUG) return () => {};
        return Logger.applyConsoleLog("color: green;", "[HELP]", args);
    }

    public info(...args): Function {
        if (this.levelMin > Level.INFO) return () => {};
        return Logger.applyConsoleLog("color: black;", "[INFO]", args);
    }

    public warning(...args): Function {
        if (this.levelMin > Level.WARNING) return () => {};
        return Logger.applyConsoleLog("color: #ef9b0f;", "[WARNING]", args);
    }

    public error(...args): Function {
        if (this.levelMin > Level.ERROR) return;
        return Logger.applyConsoleLog("color: red;", "[ERROR]", args);
    }

    private static allElementOfString(element, index, array) {
        return typeof element === "string";
    }

    private static argsToString(arg) {
        
        let argLine;
        let allString = arg.every(Logger.allElementOfString);
        
        if (allString) {
            argLine = arg;
        } else {
            try {
                argLine = Logger.JSONStringify(arg);
            } catch(e) {
                console.warn("error in ts-debbugger", e);
                argLine = arg
            }
            
        }

        return argLine;
    }

    private static applyConsoleLog(color, label, args) {
        let isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
        if (isChrome || !Logger.isIE()) {
        
            let log = Logger.argsToString(args);
            if (Array.isArray(log)) {
                log = log.join(" ");
            }
        
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

    private static JSONStringify(object) {
        let cache = [];        
        let str = JSON.stringify(object,
            // custom replacer fxn - gets around "TypeError: Converting circular structure to JSON" 
            function(key, value) {
                if (typeof value === 'object' && value !== null) {
                    if (cache.indexOf(value) !== -1) {
                        // Circular reference found, discard key
                        return;
                    }
                    // Store value in our collection
                    cache.push(value);
                }
                return value;
            }, 4);
        cache = null; // enable garbage collection
        return str;
    }


}

