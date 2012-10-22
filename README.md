# wordfreq

[Text corpus](https://en.wikipedia.org/wiki/Text_corpus) calculation in Javascript. 
Supports Chinese, English.

This library is a spin-off project from [HTML5 Word Cloud](https://github.com/timdream/wordcloud).

## Simple usage

Load `wordfreq.js` script to the web page, and run:

    // Create an options object for initialization
    var options = {
      workerUrl: 'path/to/wordfreq.worker.js' };
    // Initialize and run process() function
    var wordfreq = WordFreq(options).process(text, function (list) {
      // console.log the list returned in this callback.
      console.log(list);
    });

`WordFreq()` methods are chainable, for example,

    // Process 3 strings and get corpus of all the texts.
    WordFreq(options)
      .process(text).process(text2).process(text3)
      .getList(function (list) {
        console.log(list);
      });

To use this library synchronously, load `wordfreq.worker.js` and use the `WordFreqSync` interface. Check `API.md` for available options and methods.

## Algorithm 

Corpus is calculated with a simple N-gram algorithm and sub-string filter. 
Here is [an article](http://www.openfoundry.org/tw/foss-forum/8339--open-web-html5-) in Traditional Chinese on how HTML5 Word Cloud is being done.

[Porter Stemming Algorithm](http://tartarus.org/~martin/PorterStemmer/) is included for processing English.

## Demo

A simple page processing US Constitution can be served as demo.
It was used as tests for early development.

## Testing

To run tests, first you would need to pull the required QUnit library by running

    git submodule init
    git submodule update

Then, start a localhost HTTP server, for example,

    python -m SimpleHTTPServer 8009

Point your browser to [http://localhost:8009/test/](http://localhost:8009/test/) to start testing.

You will find all the information you need to write testcases on the [QUnit](http://qunitjs.com) website. All code submission are expected to accompany with testcases.

**Known Gecko issue**: The testcases will make Firefox choke; Web Worker will stop working after a few reloads. 
This was since fixed in [bug 785248](https://bugzilla.mozilla.org/show_bug.cgi?id=785248) on Oct. 3, 2012, so use Firefox 18 (currently [Aurora](https://www.mozilla.org/firefox/aurora/)) instead for testing.
