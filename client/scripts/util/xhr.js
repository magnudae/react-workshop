/**
 * Simple XHR lib.
 *
 * Calls `JSON.stringify` on data by default,
 * and also parses JSON response.
 *
 */
var promise = require('es6-promise');
var Promise = promise.Promise;

var request = function({ type, url, data, extraHeaders, processData, contentType }) {
  if (processData === void 0) {
    processData = true;
  }
  if (contentType === void 0) {
    contentType = 'application/json';
  }

  type = type.toUpperCase();
  if (['GET', 'POST', 'PUT', 'DELETE'].indexOf(type) === -1) {
    throw new Error('Unrecognized HTTP method "' + type + '"');
  }
  return new Promise(function(resolve, reject) {
    var req = new XMLHttpRequest();

    req.withCredentials = true;
    req.open(type, url);

    req.onload = function() {
      // This is called even on 404 etc so check the status 
      if (req.status >= 200 && req.status < 300) {
        // Resolve the promise with the response text, and parse JSON
        resolve(req.response);
      }
      else {
        // Otherwise reject with the status text
        // which will hopefully be a meaningful error
        reject(new Error(req.statusText));
      }
    };

    // Handle network errors
    req.onerror = function() {
      reject(new Error('Network Error'));
    };

    if (type !== 'GET' && contentType) {
      req.setRequestHeader('Content-type', contentType);
    }
    if (extraHeaders) {
      Object.keys(extraHeaders).forEach(function (key) {
        req.setRequestHeader(key, extraHeaders[key]);
      });
    }

    if (processData) {
      data = JSON.stringify(data);
    }
    req.send(data);

  }).then(JSON.parse);
};

var get = function(url) {
  return request({ type: 'GET', url: url });
};

var post = function(url, data) {
  return request({ type: 'POST', url: url, data: data });
};

var put = function(url, data) {
  return request({ type: 'PUT', url: url, data: data });
};

var del = function(url) {
  return request({ type: 'DELETE', url: url });
};

var postFiles = function(url, fileList) {
  var fd = new FormData();
  for (var i = 0; i < fileList.length; i++) {
    var file = fileList[i];
    fd.append(file.name, file);
  }
  // Set contentType to `null` to make browser set content-type,
  // to get proper boundaries for multipart form.
  return request({
    type: 'POST', url: url, data: fd, processData: false, contentType: null });
};

module.exports = {
  postFiles: postFiles,
  request  : request,
  post     : post,
  get      : get,
  put      : put,
  del      : del
};
