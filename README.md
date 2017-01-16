# console-logger
web emulate console.log


```typescript
export enum Level {
    DEBUG,
    INFO,
    WARNING,
    ERROR
}

export class Logger {

    public levelMin: number;

    constructor(_level: number = Level.DEBUG) {
        this.levelMin = _level;
    }

    private static allElementOfString(element, index, array) {
        return typeof element === "string";
    }

    private static argv(arg) {
        let argLine;
        let allString = arg.every(Logger.allElementOfString);
        if (allString) argLine = arg;
        else argLine = JSON.stringify(arg, null, 4);
        return argLine;
    }

    private static applyConsoleLog(color, label, arg) {
        let isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
        if (isChrome || !Logger.msieversion()) {
            let arr = [ "%c" + label].concat(Logger.argv(arg));
            console.log.apply(console.log, [arr.join(" "), color]);
        } else {
            console.log([label].concat(Logger.argv(arg)));
        }
    }

    private static msieversion() {
        let ua = window.navigator.userAgent;
        let msie = ua.indexOf("MSIE ");
        if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) { return true; }
        else { return false; }
    }

    public debug(...arg): void {
        if (this.levelMin > Level.DEBUG) return;
        Logger.applyConsoleLog("color: blue;", "[DEBUG]", arg);
    }

    public info(...arg): void {
        if (this.levelMin > Level.INFO) return;
        Logger.applyConsoleLog("color: black;", "[INFO]", arg);
    }

    public warning(...arg): void {
        if (this.levelMin > Level.WARNING) return;
        Logger.applyConsoleLog("color: #eeac00;", "[WARNING]", arg);
    }

    public error(...arg): void {
        if (this.levelMin > Level.ERROR) return;
        Logger.applyConsoleLog("color: red;", "[ERROR]", arg);
    }

}


```
