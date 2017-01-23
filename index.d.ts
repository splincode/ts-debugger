export enum Level {
    DEBUG,
    INFO,
    WARNING,
    ERROR
}

export class Logger {

    public levelMin: number;

    constructor(level?: number);

    public debug(...args): Function;

    public help(...args): Function;

    public info(...args): Function;

    public error(...args): Function;

    private static allElementOfString(element, index, array);

    private static argsToString(arg);

    private static applyConsoleLog(color, label, args);

    private static isIE();

    private static JSONStringify(object);

}
