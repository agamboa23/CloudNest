//Google Drive API handler Service
//
var http = require('http');
module.exports = {

    /**
     * Get Google Drive Upload Link for a resumable upload
     * 
     *
     * @param {Object} uploadcontentType the type of the file to be uploaded, like video/mp4, image/jpeg.
     * @param {Object} uploadContentLength the complete size of the file to be uploaded. It can be set to 0 if unkown.
     */
  decodeJwt: function (token) {
    sails.log(token);
    var segments = token.split('.');

    if (segments.length !== 2) {
      throw new Error('Not enough or too many segments');
    }

    // All segment should be base64
    var headerSeg = segments[0];
    var payloadSeg = segments[1];

    // base64 decode and parse JSON
    var header = JSON.parse(base64urlDecode(headerSeg));
    var payload = JSON.parse(base64urlDecode(payloadSeg));
    sails.log(header);
    saiss.log(payload);
    return {
      header: header,
      payload: payload
    }

  }
};

function base64urlDecode(str) {
  return new Buffer(base64urlUnescape(str), 'base64').toString();
};

function base64urlUnescape(str) {
  str += Array(5 - str.length % 4).join('=');
  return str.replace(/\-/g, '+').replace(/_/g, '/');
}
