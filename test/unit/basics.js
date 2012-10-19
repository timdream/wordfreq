'use strict';

var wordfreq;

test('WordFreq object exists', function () {
  equal(typeof WordFreq, 'function', 'Passed!');
});

test('WordFreq.supported is truthy', function () {
  ok(WordFreq.supported, 'Passed!');
});

module('Basics', {
  setup: function () {
    wordfreq = WordFreq({
      worker: '../src/wordfreq.worker.js'
    });
  },
  teardown: function () {
    wordfreq = null;
  }
});

test('wordfreq.processText function exists', function () {
  equal(typeof wordfreq.processText, 'function', 'Passed!');
});

test('wordfreq.terminate function exists', function () {
  equal(typeof wordfreq.terminate, 'function', 'Passed!');
});

test('wordfreq.empty function exists', function () {
  equal(typeof wordfreq.empty, 'function', 'Passed!');
});

test('wordfreq.getList function exists', function () {
  equal(typeof wordfreq.getList, 'function', 'Passed!');
});

test('wordfreq.getSortedList function exists', function () {
  equal(typeof wordfreq.getSortedList, 'function', 'Passed!');
});

test('wordfreq.analyizeVolume function exists', function () {
  equal(typeof wordfreq.analyizeVolume, 'function', 'Passed!');
});
