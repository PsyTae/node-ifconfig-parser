
node-ifconfig-parser
===========================
`ifconfig` text parser

### Installation
```sh
$ npm install ifconfig-parser
```

### API

* `.parse(src)`: parsing source

```javascript
const i = require("ifconfig-json-parser");
const fs = require("fs");

file = fs.readFileSync("./ex.ifconfig", "utf8");
console.log(i.parse(file));
```

### License
MIT
