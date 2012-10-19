# wordfreq

[Text corpus](https://en.wikipedia.org/wiki/Text_corpus) calculation in Javascript. 
Supports Chinese, English, and Japanese (experimential).

This library is a spin-off project from [HTML5 Word Cloud](https://github.com/timdream/wordcloud).

## Simple usage

See tests and script source code for now.

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