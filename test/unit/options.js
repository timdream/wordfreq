'use strict';

module('options')

var workerUrl = '../src/wordfreq.worker.js';

test('languages can be set to Chinese', function () {
  var text = '中文\n中文\n中文\nEnglish\nEnglish\nEnglish\n';

  var wordfreq = WordFreq({
    workerUrl: workerUrl,
    languages: ['chinese']
  });

  stop();
  wordfreq.process(text, function (list) {
    deepEqual(list, [['中文', 3]], 'Passed!');

    start();
  });
});

test('languages can be set to English', function () {
  var text = '中文\n中文\n中文\nEnglish\nEnglish\nEnglish\n';

  var wordfreq = WordFreq({
    workerUrl: workerUrl,
    languages: ['english']
  });

  stop();
  wordfreq.process(text, function (list) {
    deepEqual(list, [['English', 3]], 'Passed!');

    start();
  });
});

test('stopWordSets can be set', function () {
  var text = 'I was happy!\n' +
    'I was happy!\n' +
    'I was happy!\n';

  var wordfreq = WordFreq({
    workerUrl: workerUrl,
    language: ['english'],
    stopWordSets: []
  });

  stop();
  wordfreq.process(text, function (list) {
    deepEqual(list, [['happy', 3], ['was', 3]], 'Passed!');

    start();
  });
});

test('stopWords can be set', function () {
  var text = 'I was happy too!\n' +
    'I was happy too!\n' +
    'I was happy too!\n';

  var wordfreq = WordFreq({
    workerUrl: workerUrl,
    stopWords: ['happy']
  });

  stop();
  wordfreq.process(text, function (list) {
    deepEqual(list, [['too', 3]], 'Passed!');

    start();
  });
});

test('minimumCount can be set', function () {
  var text = 'I was happy too!\n中文\n';

  var wordfreq = WordFreq({
    workerUrl: workerUrl,
    language: ['english'],
    minimumCount: 1
  });

  stop();
  wordfreq.process(text, function (list) {
    deepEqual(list, [['happy', 1], ['too', 1], ['中文', 1]], 'Passed!');

    start();
  });
});

test('filterSubstring can be turned off for Chinese', function () {
  var text = '洛杉磯\n洛杉磯\n洛杉磯';

  var wordfreq = WordFreq({
    workerUrl: workerUrl,
    filterSubstring: false
  });

  stop();
  wordfreq.process(text, function (list) {
    deepEqual(list, [['杉磯', 3], ['洛杉', 3], ['洛杉磯', 3]], 'Passed!');

    start();
  });
});
test('maxiumPhraseLength can be set for Chinese', function () {
  var text = '洛杉磯\n洛杉磯\n洛杉磯';

  var wordfreq = WordFreq({
    workerUrl: workerUrl,
    maxiumPhraseLength: 2
  });

  stop();
  wordfreq.process(text, function (list) {
    deepEqual(list, [['杉磯', 3], ['洛杉', 3]], 'Passed!');

    start();
  });
});
