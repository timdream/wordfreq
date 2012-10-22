'use strict';

module('WordFreqSync');

test('WordFreqSync object exists', function () {
  equal(typeof WordFreqSync, 'function', 'Passed!');
});

(function () {

var wordfreqsync;

module('WordFreqSync functions', {
  setup: function () {
    wordfreqsync = WordFreqSync();
  },
  teardown: function () {
    wordfreqsync = undefined;
  }
});

test('process() function exists', function () {
  equal(typeof wordfreqsync.process, 'function', 'Passed!');
});

test('process(text) function returns list', function () {
  deepEqual(wordfreqsync.process(''), [], 'Passed!');
});

test('empty() function exists', function () {
  equal(typeof wordfreqsync.empty, 'function', 'Passed!');
});

test('getList() function exists', function () {
  equal(typeof wordfreqsync.getList, 'function', 'Passed!');
});

test('getList() return list', function () {
  deepEqual(wordfreqsync.getList(), [], 'Passed!');
});

test('getLength() function exists', function () {
  equal(typeof wordfreqsync.getLength, 'function', 'Passed!');
});

test('getLength() return length', function () {
  equal(wordfreqsync.getLength(), 0, 'Passed!');
});

test('getVolume() function exists', function () {
  equal(typeof wordfreqsync.getVolume, 'function', 'Passed!');
});

test('getVolume() return volume', function () {
  equal(wordfreqsync.getVolume(), 0, 'Passed!');
});

})();
