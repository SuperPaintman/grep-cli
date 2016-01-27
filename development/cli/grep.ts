#!/usr/bin/env node

/// <reference path="typings/tds.d.ts"/>

import os = require("os");

import grep = require("../grep");

const argv = process.argv.slice(2);
const pattern = argv[0];

process.stdin.on('data', (data) => {
    data = data.toString("utf8")
    
    const gdata = grep(data, pattern, [
        'cyan',
        'bold'
    ]);

    process.stdout.write(gdata, "utf8");
    process.stdout.write(os.EOL, "utf8");
});
