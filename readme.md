### Usage

```bash
$ npm install ts-debugger --save-dev
```

Logger information:

```javascript
// example.ts
import {Logger, Level} from "ts-debugger";
declare let log: Logger;

// show string, array, object
let test = {a: 1, b: 2, c: 3};
log.debug("This is object: ", test);

/*
[DEBUG] [
    "This is object: ",
    {
        "a": 1,
        "b": 2,
        "c": 3
    }
]
*/


```
<br>

<img src="https://habrastorage.org/files/b9d/cfe/f63/b9dcfef63a3e460bb9bda83ca61d943c.png"/>

<br> <br>


```javascript
log.debug("This is object: ")(test);

/* [DEBUG] This is object:  Object {a: 1, b: 2, c: 3} */
```

<br>
<img src="https://habrastorage.org/files/fd8/73f/2ac/fd873f2aceba4754a4650e8d1f20a87a.png"/>
<br>

### Warning, Error

<br>
<img src="https://habrastorage.org/files/dd5/3c0/612/dd53c061294c4b7baccbbce9428fb7a3.png"/>

<br>
<img src="https://habrastorage.org/files/634/7b8/c35/6347b8c3531e436f97c30504d6ac0588.png"/>


### Example

```javascript
// polyfills.ts

import {Logger, Level} from "ts-debugger";
import "core-js/client/shim";
import "reflect-metadata";
import "ts-helpers";
require("zone.js/dist/zone");

declare let log: Logger;
declare let window: any;

if (process.env.TYPE === "prod") {
    // Production
    window.log = new Logger(Level.INFO);
} else {
    // Development
    window.log = new Logger();
    Error["stackTraceLimit"] = Infinity;
    require("zone.js/dist/long-stack-trace-zone");
}

log.debug(
    `Level debug: ${log["levelMin"]}`,
    `TYPE = ${process.env.TYPE}`,
    `THEME = ${process.env.THEME}`
)();

```

<img src="https://habrastorage.org/files/78e/723/9cd/78e7239cdb45496ca35108997a0a03da.png"/>
