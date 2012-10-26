'use strict';

(function () {

var wordfreq;

module('wordfreq.get*()', {
  setup: function () {
    wordfreq = WordFreq({
      workerUrl: '../src/wordfreq.worker.js'
    });
  },
  teardown: function () {
    wordfreq = null;
  }
});

var text = '中文\n中文\n中文\nEnglish\nEnglish\nEnglish\n';

test('wordfreq.getList() return the correct list', function () {
  stop();
  wordfreq.process(text, function (list) {
    deepEqual(list, [['English', 3], ['中文', 3]], 'Passed!');

    start();
  });
});

test('wordfreq.getLength() return the correct length', function () {
  stop();
  wordfreq.process(text, function (list) {
    wordfreq.getLength(function (length) {
      equal(length, 2, 'Passed!');
      start();
    });
  });
});

test('wordfreq.getVolume() return the correct volume', function () {
  stop();
  wordfreq.process(text, function (list) {
    wordfreq.getVolume(function (volume) {
      equal(volume, 81, 'Passed!');
      start();
    });
  });
});

test('wordfreq.getList() return the correct list with 2 process()', function () {
  stop();
  wordfreq.process(text, function (list) {
    wordfreq.process(text, function (list) {
      deepEqual(list, [['English', 6], ['中文', 6]], 'Passed!');

      start();
    });
  });
});

test('wordfreq.getLength() return the correct length with 2 process()', function () {
  stop();
  wordfreq.process(text, function (list) {
    wordfreq.process(text, function (list) {
      wordfreq.getLength(function (length) {
        equal(length, 2, 'Passed!');
        start();
      });
    });
  });
});

test('wordfreq.getVolume() return the correct volume with 2 process()', function () {
  stop();
  wordfreq.process(text, function (list) {
    wordfreq.process(text, function (list) {
      wordfreq.getVolume(function (volume) {
        equal(volume, 324, 'Passed!');
        start();
      });
    });
  });
});

})();
