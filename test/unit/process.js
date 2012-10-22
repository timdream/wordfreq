'use strict';

(function () {

var wordfreq;

module('wordfreq.process()', {
  setup: function () {
    wordfreq = WordFreq({
      workerUrl: '../src/wordfreq.worker.js'
    });
  },
  teardown: function () {
    wordfreq.stop();
    wordfreq = null;
  }
});

test('works on English words', function () {
  var str = 'English\nEnglish\nEnglish';

  stop();
  wordfreq.process(str, function (list) {
    deepEqual(list, [['English', 3]], 'Passed!');

    start();
  });
});

/* TBD: Disabled because it is not currently supported

test('works on English phrases', function () {
  var str = 'New York\nNew York\nNew York';

  stop();
  wordfreq.process(str, function (list) {
    deepEqual(list, [['New York', 3]], 'Passed!');

    start();
  });
});

*/

test('normalize English word suffix', function () {
  var str = 'Books\nBook\nBooking';

  stop();
  wordfreq.process(str, function (list) {
    deepEqual(list, [['Book', 3]], 'Passed!');

    start();
  });
});

test('normalize English word caps', function () {
  var str = 'book\nBook\nbook';

  stop();
  wordfreq.process(str, function (list) {
    deepEqual(list, [['book', 3]], 'Passed!');

    start();
  });
});

test('works on Chinese phrases', function () {
  var str = '洛杉磯\n洛杉磯\n洛杉磯';

  stop();
  wordfreq.process(str, function (list) {
    deepEqual(list, [['洛杉磯', 3]], 'Passed!');

    start();
  });
});

test('works on Chinese phrases and substring phrases', function () {
  var str = '台北市\n台北市n\台北市\n台北\n台北n\台北';

  stop();
  wordfreq.process(str, function (list) {
    deepEqual(list, [['台北', 6], ['台北市', 3]], 'Passed!');

    start();
  });
});


/* TBD: Disabled because it is not currently supported

test('works on Japanese kanas', function () {
  var str = 'あ\nあ\nあ';

  stop();
  wordfreq.process(str, function (list) {
    deepEqual(list, [['あ', 3]], 'Passed!');

    start();
  });
});

*/

})();
