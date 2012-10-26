'use strict';

test('WordFreq function exists', function () {
  equal(typeof WordFreq, 'function', 'Passed!');
});

test('WordFreq.isSupported is truthy', function () {
  ok(WordFreq.isSupported, 'Passed!');
});

(function () {

var wordfreq;

module('WordFreq functions', {
  setup: function () {
    wordfreq = WordFreq({
      workerUrl: '../src/wordfreq.worker.js'
    });
  },
  teardown: function () {
    wordfreq = null;
  }
});

test('wordfreq.process function exists', function () {
  equal(typeof wordfreq.process, 'function', 'Passed!');
});

test('wordfreq.process(text) returns list in the callback', function () {
  stop();
  wordfreq.process('', function (list) {
    deepEqual(list, [], 'Passed!');
    start();
  });
});

test('wordfreq.empty function exists', function () {
  equal(typeof wordfreq.empty, 'function', 'Passed!');
});

test('wordfreq.stop function exists', function () {
  equal(typeof wordfreq.stop, 'function', 'Passed!');
});

test('wordfreq.stop() stops the execution', function () {
  wordfreq.process('').stop().getList(function () {

  });
  equal(typeof wordfreq.stop, 'function', 'Passed!');
});

test('wordfreq.getList function exists', function () {
  equal(typeof wordfreq.getList, 'function', 'Passed!');
});

test('wordfreq.getList() returns list', function () {
  stop();
  wordfreq.getList(function (list) {
    deepEqual(list, [], 'Passed!');
    start();
  });
});

test('wordfreq.getLength function exists', function () {
  equal(typeof wordfreq.getLength, 'function', 'Passed!');
});

test('wordfreq.getLength() returns length in the callback', function () {
  stop();
  wordfreq.getLength(function (length) {
    equal(length, 0, 'Passed!');
    start();
  });
});

test('wordfreq.getVolume function exists', function () {
  equal(typeof wordfreq.getVolume, 'function', 'Passed!');
});

test('wordfreq.getVolume() returns volume in the callback', function () {
  stop();
  wordfreq.getVolume(function (volume) {
    equal(volume, 0, 'Passed!');
    start();
  });
});

test('wordfreq functions are chainable', function () {
  strictEqual(wordfreq, wordfreq.process(''), 'Passed');
  strictEqual(wordfreq, wordfreq.empty(), 'Passed');
  strictEqual(wordfreq, wordfreq.getList(), 'Passed');
  strictEqual(wordfreq, wordfreq.getLength(), 'Passed');
  strictEqual(wordfreq, wordfreq.getVolume(), 'Passed');
});


}());
