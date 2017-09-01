#!/usr/bin/env node

const optimist = require('optimist');
const glob = require('glob');
const fs = require('fs');
const gettextParser = require("gettext-parser");

const args = optimist.argv;
const localesPath = `${args.locales || 'locales'}/*.po`;
const inputCharset = `${args.inputCharsets || 'utf-8'}`;
const filenameToLanguageRegex = `${args.filenameToLanguageRegex || '\\.([^\\.-]+)(.*)'}`;

glob(localesPath, (err, files) => {
  files.map(function(file) {
    var po = gettextParser.po.parse(fs.readFileSync(file), inputCharset);
    if (!po.headers) { po.headers = []; }
    po.headers['charset'] = po.charset;
    po.headers['language'] = po.headers['language'] || new RegExp(filenameToLanguageRegex).exec(file)[1];
    var output = gettextParser.po.compile(po);
    fs.writeFileSync(file, output, po.charset);
    console.log("done: " + file + "(" + po.charset + ", " + po.headers['language'] + ")");
  });
});
