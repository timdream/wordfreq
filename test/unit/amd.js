'use strict';

module('AMD API conformance');

test('almond.js loads wordfreq.js', function () {
  stop();
  require(['wordfreq'], function (loaded) {
    ok(loaded && loaded.isSupported, 'Passed!');

    start();
  });
});

test('almond.js loads wordfreq.worker.js', function () {
  stop();
  require(['wordfreqsync'], function (loaded) {
    ok(loaded && loaded.isSupported, 'Passed!');

    start();
  });
});
