#!/usr/bin/env node

/*! wordfreq - Text corpus calculation in Javascript.

  Author: timdream <http://timc.idv.tw/>

  This file contains command-line interface for WordFreq.

*/

'use strict';

var optimist = require('optimist');
var fs = require('fs');
var argv = optimist.argv;

optimist.usage('Calculate text corpus from given file/stdin.\n' +
  'Usage: $0 [options] [filename]', {
  'min': {
    'description': 'Minimal count required to be included in the returned list.',
    'short': 'm'
  },
  'lang': {
    'description': 'Specify languages to process. Default: "chinese,english".',
    'short': 'l'
  },
  'stop-word-sets': {
    'description': 'Specify the built-in set of stop words to exclude in the count. ' +
                   'Default: "cjk,english1,english2"',
  },
  'stop-words': {
    'description': 'Words/phrases to exclude in the count. Case insensitive.'
  },
  'no-filter-substring': {
    'description': '(Chinese language only) Don\'t filter out the recounted substring.'
  },
  'max-length': {
    'description': '(Chinese language only) Maxium length to consider a phrase. Default to 8.'
  }
});
optimist.alias('l', 'lang');
optimist.alias('m', 'min');
optimist.boolean('filter-substring');

var WordFreqSync = require('./wordfreq.worker.js');

if (!argv._.length) {
  optimist.showHelp();
  process.exit(1);
}

var options = {};
if (argv.min) {
  options.minimumCount = argv.min;
}
if (argv.lang) {
  options.languages = argv.lang.split(',');
  console.log(argv.lang);
}

if (argv['stop-word-sets']) {
  options.stopWordSets = argv['stop-word-sets'].split(',');
}

if (typeof argv['filter-substring'] !== undefined) {
  options.filterSubstring = argv['filter-substring'];
}

if (argv['max-length']) {
  options.maxiumPhraseLength = argv['max-length'];
}

var wordfreqsync = WordFreqSync(options);

var output = function () {
  console.log(wordfreqsync.getList());
};

// Process files
argv._.forEach(function (filename) {
  // "-" means stdin
  if (filename == '-')
    return;

  var content;
  try {
    content = fs.readFileSync(filename, 'utf-8');
  } catch (e) {
    console.error('Error: unable to read ' + filename + '.');
    process.exit(1);
  }

  wordfreqsync.process(content);
});

if (argv._.indexOf('-') === -1) {
  output();
} else {
  // Process stdin
  process.stdin.resume();
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', function (chunk) {
    wordfreqsync.process(chunk);
  });

  // Release the only till stdin ended
  process.stdin.on('end', output);
}
