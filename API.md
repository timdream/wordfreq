# WordFreq APIs

## Feature detection

Both `WordFreq` and `WordFreqSync` constructors contains a `isSupported` property.
If the property evaluates to `false`, the browser/JavaScript runtime does not supply necessary functionalities for WordFreq to run.

## Initialization

     var wordfreq = WordFreq(options);

or,

     var wordfreqsync = WordFreqSync(options);

Where `options` is an object. Available options:

* `workerUrl`: (`WordFreq` only) Specify the url of `wordfreq.worker.js`.
* `languages`: Array of keywords to specify languages to process for the instance. Available keywords are `chinese`, `english`. Default to both.
* `stopWordSets`: Array of keywords to specify the built-in set of stop words to exclude in the count. Available: `cjk`, `english1`, and `english2`. Default to all.
* `stopWords`: Array of words/phrases to exclude in the count. Case insensitive.
* `filterSubstring`: (Chinese language only) Filter out the recounted substring. Default to `true`.
* `maxiumPhraseLength`: (Chinese language only) Maxium length to consider a phrase. Default to `8`.
* `minimumCount`: Minimal count required to be included in the returned list.

## Methods

`WordFreq` and `WordFreqSync` instances contains the same methods, except otherwise noted.
The only difference is that `WordFreq` methods always returns the instance itself (make it chainable), and data is available to callbacks as the last argument. 
`WordFreqSync` instances returns the data directly.

### process(text, callback)

Process the text and return the list of words/phrases (of all text processd) in the callback. 

Callback is optional. `wordfreq.process(text, callback)` is equalivent to `wordfreq.process(text).getList(callback)`.

`WordFreqSync` instances returns the list directly.

### empty(callback)

Empty the list. Returns `true` to callback.

### stop(triggerCallbacks)

Terminate the worker and remove all the pending works.
Once terminated, the instance should be discorded as it will not respond to any new queries.

If `triggerCallbacks` is set to `true`, trigger all pending callbacks without arguments. Callbacks must not attempt to append a new task when called; doing so will result a loop.

Only useful to `WordFreq` instances. For `WordFreqSync` instances this method does nothing.

### getList(callback)

Get the list of words/phrases.

`WordFreqSync` instances returns the list directly.

### getLength(callback)

Get the length of the list of words/phrases. 

### getVolume(callback)

*Volume* is defined as the sum of

    (length of the word) × (counts)²

This method returns that value.
