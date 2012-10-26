/*! wordfreq - Text corpus calculation in Javascript.

  Author: timdream <http://timc.idv.tw/>

*/

'use strict';

(function (global) {

var WordFreq = function WordFreq(options) {
  // Public API object
  var wordfreq = {};

  // options: here, we only worry about workerUrl
  options = options || {};
  options.workerUrl = options.workerUrl || 'wordfreq.worker.js';

  // start the worker
  var worker = new Worker(options.workerUrl);

  // message queue
  // Note: since Javascript Web Workers itself is a single threaded
  // first-in-first-out event queue, the management here
  // (send the next message only till the current one is processed)
  // seems to be an overkill. This should be written if we are sure of
  // the behavior is reliable.
  var messageQueue = [];
  var message;

  // stopping flag prevent looped calls when we stop()
  var stopping = false;

  // add message to queue; if there is no ongoing message,
  // start sending the message.
  var addQueue = function addQueue(msg) {
    messageQueue.push(msg);

    if (!message && !stopping)
      sendMessage();
  };
  // send message to worker
  var sendMessage = function sendMessage() {
    message = messageQueue.shift();
    worker.postMessage({
      method: message.method,
      params: message.params
    });
  };
  // process message received from worker
  worker.onmessage = function gotMessage(evt) {
    // Detach callback with global message reference
    // so it cannot be called twice in stop()
    var callback = message.callback;
    delete message.callback;

    if (callback)
      callback.call(wordfreq, evt.data);
    // Set the message to null, since we have finished processing
    message = null;
    if (messageQueue.length)
      sendMessage();
  };

  worker.onerror = function gotError(evt) {
    // Detach callback with global message reference
    // so it cannot be called twice in stop()
    var callback = message.callback;
    delete message.callback;

    if (callback)
      callback.call(wordfreq, evt.data);
    // Set the message to null, since we have finished processing
    message = null;
    if (messageQueue.length)
      sendMessage();
  };

  var methods = ['process', 'empty', 'getList', 'getLength', 'getVolume'];
  methods.forEach(function buildAPI(method) {
    wordfreq[method] = function addMessage() {
      var argLength = arguments.length;

      var callback;
      if (typeof arguments[arguments.length - 1] === 'function') {
        callback = arguments[arguments.length - 1];
        // exclude the callback from being put into params.
        argLength--;
      }

      var params = [];
      var i = 0;
      while (i < argLength) {
        params[i] = arguments[i];
        i++;
      }

      addQueue({
        method: method,
        params: params,
        callback: callback
      });

      return wordfreq;
    };
  });

  // init the worker with option data
  addQueue({
    method: 'init',
    params: [options]
  });

  // Remove reference of the option object
  options = undefined;

  wordfreq.stop = function stop(triggerCallbacks) {
    if (stopping)
      return;

    // stop the worker
    worker.terminate();

    if (!triggerCallbacks) {
      message = null;
      messageQueue = [];

      return wordfreq;
    }

    stopping = true;
    // tell all pending callbacks that the work has stopped
    if (message && message.callback)
      message.callback.call(wordfreq);
    while (messageQueue.length) {
      var msg = messageQueue.shift();
      if (msg.callback)
        msg.callback.call(wordfreq);
    }
    message = null;
    stopping = false;

    return wordfreq;
  };

  return wordfreq;
};

WordFreq.isSupported = !!(global.Worker &&
  Array.prototype.push &&
  Array.prototype.indexOf &&
  Array.prototype.forEach &&
  Array.isArray &&
  Object.create);

// Expose the library as an AMD module
if (typeof define === 'function' && define.amd) {
  define('wordfreq', [], function() { return WordFreq; });
} else {
  global.WordFreq = WordFreq;
}

})(this);
