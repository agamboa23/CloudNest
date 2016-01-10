/**
 * GoogleDriveController
 *
 * @description :: Server-side logic for managing Google Drive API functions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var https = require('https');
var querystring = require('querystring');
//var fs = require('fs');
var google = require('googleapis');
var googleAuth = require('google-auth-library');

var SCOPES = ['https://www.googleapis.com/auth/drive'];
//var TOKEN_DIR = (process.env.HOME || process.env.HOMEPATH ||
//    process.env.USERPROFILE) + '/.credentials/';
//var TOKEN_PATH = TOKEN_DIR + 'drive-nodejs-quickstart.json';

var clientId = sails.config.drive.clientId;
var clientSecret = sails.config.drive.clientSecret;
var redirectUrl = sails.config.drive.redirectUri;
var auth = new googleAuth();
var oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);

module.exports = {
	saveTokenFromCode:function(req,res){
		code = req.param('code');
		oauth2Client.getToken(code, function(err, token) {
      		if (err) {
        		sails.log('Error while trying to retrieve access token', err);
        		return;
      		}

            oauth2Client.credentials = token;
            sails.log(token.access_token);

            DriveService.decodeJwt(token.access_token);
	    });
		return res.redirect("/");
	},
	    /**
     * Create an OAuth2 client with the given credentials, and then execute the
     * given callback function.
     *
     * @param {Object} credentials The authorization client credentials.
     * @param {function} callback The callback to call with the authorized client.
     */
    authorize: function(req,res) {
        // Check if we have previously stored a token.
        /**/
        sails.controllers.googledrive.getTokenCode(req,res);
    },

    /**
     * Get and store new token after prompting for user authorization, and then
     * execute the given callback with the authorized OAuth2 client.
     *
     * @param {google.auth.OAuth2} oauth2Client The OAuth2 client to get token for.
     * @param {getEventsCallback} callback The callback to call with the authorized
     *     client.
     */
    getTokenCode: function(req,res) {
      var authUrl = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES,
        prompt: 'consent',
        state: 'Yeibor'
      });
      //sails.log('Authorize this app by visiting this url: '+ authUrl);
      return res.redirect(authUrl);
    },

    refreshToken: function(refreshToken,res){

        var options = {
          "method": "POST",
          "hostname": "www.googleapis.com",
          "path": "/oauth2/v4/token",
          "headers": {
            "content-type": "application/x-www-form-urlencoded"
          }
        };

        var post_data = querystring.stringify({ 
            client_id: clientId,
            grant_type: 'refresh_token',
            refresh_token: refreshToken, //'1/IsrGojmscXKL76d1n7X9qLLJ92u7RFDw2KHnYn0ePK8',
            client_secret: clientSecret });

        var req = http.request(options, function (authRes) {
            var chunks = [];
            authRes.on("data", function (chunk) {
                chunks.push(chunk);
            });

            authRes.on("end", function () {
            var body = Buffer.concat(chunks);
            sails.log(authRes.body.access_token);
            sails.log(body.toString());
            });
        });

        post_req.on('error', function(e) {
          sails.log('ERROR: ' + e.message);
        });

        req.write(post_data);
        req.end();
    },

    getResumableUploadLink: function(req,res) {
    	uploadContentType = req.param('uploadContentType');
    	uploadContentLength = req.param('uploadContentLength');
        var token= "ya29.YQIbxAEd3JhzLF2zrduLJCh7U9QbsGGBNsvXo7B7IQrCYEjv4KUVolK-V_Ohi5NnlKmz";
        var post_data = querystring.stringify({
		    "title" : "TestFile"
		});
		var location;
		var post_options = {
			host: 'www.googleapis.com',
			path: '/upload/drive/v2/files?uploadType=resumable',
			method: 'POST',
			headers: {
				'content-type': 'application/json; charset=UTF-8',
				'content-length': '0',
				'authorization': 'Bearer ' + token,
				'X-Upload-Content-Type': uploadContentType,
				'X-Upload-Content-Length':  uploadContentLength
			}
  		};
        var post_req = https.request(post_options, function(driveRes) {
			location= driveRes.headers.location;
			res.send(location);
			driveRes.setEncoding('utf8');
		});

        post_req.on('error', function(e) {
          sails.log('ERROR: ' + e.message);
        });
        post_req.write(post_data);
  		post_req.end();
    }

};

