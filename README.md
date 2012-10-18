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

## Tests

A simple page processing US Constitution can be served as demo and tests.
There are no automated or unit test for now.