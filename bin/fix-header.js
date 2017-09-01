#!/usr/bin/env node

const optimist = require('optimist');
const glob = require('glob');
const fs = require('fs');
const gettextParser = require("gettext-parser");

const args = optimist.argv;
const localesPath = `${args.localesPath || 'locales'}/*.po`;
const inputCharset = `${args.inputCharsets || 'UTF-8'}`;
const filenameToLanguageRegex = `${args.filenameToLanguageRegex || '\\.([^\\.-]+)(.*)'}`;

glob(localesPath, (err, files) => {
  files.map(function(file) {
    var po = gettextParser.po.parse(fs.readFileSync(file), inputCharset);
    if (!po.headers) { po.headers = []; }
    po.headers['Content-Type'] = "text/plain; charset=" + po.charset;
    po.headers['Language'] = po.headers['Language'] || new RegExp(filenameToLanguageRegex).exec(file)[1];
    var output = gettextParser.po.compile(po);
    fs.writeFileSync(file, output, po.charset);
    console.log("done: " + file + "(" + po.charset + ", " + po.headers['language'] + ")");
  });
});
