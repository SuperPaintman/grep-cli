#!/usr/bin/env node
var os = require("os");
var grep_1 = require("../grep");
var argv = process.argv.slice(2);
var pattern = argv[0];
process.stdin.on('data', function (data) {
    data = data.toString("utf8");
    var gdata = grep_1.default(data, pattern, [
        'cyan',
        'bold'
    ]);
    process.stdout.write(gdata, "utf8");
    process.stdout.write(os.EOL, "utf8");
});
