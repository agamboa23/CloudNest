//Google Drive API handler Service
//
var http = require('https');
var querystring = require('querystring');
var google = require('googleapis');
var googleAuth = require('google-auth-library');
var SCOPES = ['https://www.googleapis.com/auth/drive'];
var clientId = sails.config.drive.clientId;
var clientSecret = sails.config.drive.clientSecret;
var redirectUrl = sails.config.drive.redirectUri;
var apiKey = sails.config.drive.appKey;
var auth = new googleAuth();
var oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);

module.exports = {
    /**
     * Get and store new token after prompting for user authorization, and then
     * execute the given callback with the authorized OAuth2 client.
     *
     * @param {google.auth.OAuth2} oauth2Client The OAuth2 client to get token for.
     * @param {getEventsCallback} callback The callback to call with the authorized
     *     client.
     */
    getTokenCode: function(organizationId,res) {
        var authUrl = oauth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: SCOPES,
            prompt: 'consent',
            state: organizationId
        });
        return res.redirect(authUrl);
    },

    saveTokenFromCode: function(code, organizationId){
        oauth2Client.getToken(code, function(err, token) {
            if (err) {
                sails.log('Error while trying to retrieve access token', err);
                return;
            }

            sails.models.credential.findOne({organization:organizationId, type: "GoogleDrive"}).exec(function (err, record){
                if (err) {
                    sails.log('Error while saving the access token', err);
                    return;
                };
                if(!record){

                    var post_data = JSON.stringify({
                    "title" : "CloudNest",
                    "mimeType": "application/vnd.google-apps.folder"
                    });

                    var post_options = {
                    host: 'www.googleapis.com',
                    path: '/drive/v2/files?key='+apiKey,
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json; charset=UTF-8',
                        'authorization': 'Bearer ' + token.access_token,
                        }
                    };
                    var create_folder = http.request(post_options, function(response) {
                    var chunks_get = [];

                    response.on("data", function (chunk) {
                        chunks_get.push(chunk);
                    });

                    response.on("end", function () {
                        var body = Buffer.concat(chunks_get);
                        var bodyObject = JSON.parse(body.toString());
                        sails.log(bodyObject.id.toString())
                        var newCredential = 
                            {type: "GoogleDrive",
                            access_token : token.access_token,
                            refresh_token : token.refresh_token,
                            organization : organizationId,
                            drive_folder : bodyObject.id
                            };
                        sails.models.credential.create(newCredential).exec(function (err,created){
                            if (err){
                                sails.log(err)
                            }
                            sails.log("Credential created" + created)});
                        var permission_options = {
                            host: 'www.googleapis.com',
                            path: '/drive/v2/files/'+bodyObject.id+'/permissions?key='+apiKey,
                            method: 'POST',
                            headers: {
                                'content-type': 'application/json; charset=UTF-8',
                                'authorization': 'Bearer ' + token.access_token
                                }
                        };
                        var permission_post = JSON.stringify({
                            "role" : "reader",
                            "type" : "anyone"
                        });
                        var post_perm = http.request(permission_options, function(permRes) {
                            var chunks_perm = [];
                            permRes.on("data", function (chunk) {
                                chunks_perm.push(chunk);
                            });
                            permRes.on("end", function (){
                                var body = Buffer.concat(chunks_perm);
                                sails.log(body.toString());
                            });
                        });
                        post_perm.write(permission_post);
                        post_perm.end();
                        });
                    });
                    create_folder.write(post_data);
                    create_folder.end();

                    return;
                };
                if (record.access_token!=token.access_token){
                    sails.models.credential.update({organization:organizationId, type: "GoogleDrive"},
                        {access_token : token.access_token,
                        refresh_token : token.refresh_token}).exec(function afterwards(err, updated){
                            if (err){
                                sails.log('Error while updating the access token', err);
                                return;
                            }
                        })
                }
            });
            });
        },
    getAccessToken: function(requiredUploadData, getLocation, refreshed, next){

        sails.models.device.findOne({id:requiredUploadData.device}).exec(function (err, deviceFound){
            if(!deviceFound){sails.log("no entiendo" + requiredUploadData.device)};
            sails.models.credential.findOne({organization:deviceFound.organization, type:"GoogleDrive"}).exec(function (err, found){
                requiredUploadData.token = found.access_token;
                requiredUploadData.folderId = found.drive_folder;
                getLocation(requiredUploadData, refreshed, next);
            })
        })
    },
    refreshAndRepost: function(requiredUploadData,getLocation, refresh, next){

        sails.models.device.findOne({id:requiredUploadData.device}).exec(function (err, deviceFound){
            sails.models.credential.findOne({organization:deviceFound.organization}).exec(function findCB(err, found){
                sails.services.driveservice.getRefreshToken(found.refresh_token, function (newToken){
                    sails.models.credential.update({organization:deviceFound.organization},{access_token:newToken}).
                    exec(function afterwards(err, updated){
                        requiredUploadData.token = updated[0].access_token;
                        getLocation(requiredUploadData, true, next);
                    })
                })
            })
        })
    },
    getRefreshToken: function(refreshToken,callback){
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
            refresh_token: refreshToken, 
            client_secret: clientSecret });

        var req = http.request(options, function (authRes) {
            var chunks = [];
            authRes.on("data", function (chunk) {
                chunks.push(chunk);
            });

            authRes.on("end", function () {
            var recievedData = Buffer.concat(chunks);
            var body = JSON.parse(recievedData.toString());
            callback(body.access_token);
            });

        });

        req.on('error', function(e) {
          sails.log('ERROR: ' + e.message);
        });

        req.write(post_data);
        req.end();
    },
    getResumableUploadLocation: function(req, res, refreshed, next) {
        var key = req.param('moduleKey');
        sails.models.module.findOne({module_key:key}).exec(function (err,moduleWithKey){
            if (err){
                return res.negotiate(err);
            }
            if(!moduleWithKey){
                res.status(403).send({error: 'moduleKey not valid'});
                return
            }
            if(!moduleWithKey.enable){
                res.status(403).send({error: 'selected module is disabled'});
            }
            var postRequiredData ={
            uploadContentType : req.body['uploadContentType'],
            uploadContentLength : req.body['uploadContentLength'],
            uploadTitle : req.body['uploadTitle'],
            module : moduleWithKey.id,
            device: moduleWithKey.device,
            moduleDataStructure : moduleWithKey.ModuleDataStructure
            };

            if (!(postRequiredData.uploadContentLength||postRequiredData.uploadContentType||postRequiredData.uploadTitle||postRequiredData.deviceKey)){
                err="Incorrect Parameters";
                next(err);
                return;
            }
            sails.services.driveservice.getAccessToken(postRequiredData,sails.services.driveservice.getDriveUploadLocation, refreshed, next);
        });
        
    },
    getDriveUploadLocation : function (uploadRequiredData,refreshed,next){
        if (!uploadRequiredData.token){
            err="Organization Drive permission required";
            next(err);
            return;
        };


        var location;

        var get_id_options = {
            host: 'www.googleapis.com',
            path: '/drive/v3/files/generateIds?count=1&key='+apiKey,
            method: 'GET',
            headers: {
                'authorization' : 'Bearer ' + uploadRequiredData.token
            }
        }

        var getId_request = http.request(get_id_options, function(response) {
            var chunks_get = [];

            response.on("data", function (chunk) {
                chunks_get.push(chunk);
            });

            response.on("end", function () {
                var body = Buffer.concat(chunks_get);
                var bodyObject = JSON.parse(body.toString());
                if( response.statusCode ===401 && !refreshed){
                    sails.services.driveservice.refreshAndRepost(uploadRequiredData,sails.services.driveservice.getDriveUploadLocation, true, next);
                    return;
                }
                if (response.statusCode!=200){
                    next(body.toString(),null);
                    return;
                    }
                var post_data = JSON.stringify({
                "title" : uploadRequiredData.uploadTitle,
                "id" : bodyObject.ids[0],
                "parents": [{"id": uploadRequiredData.folderId}],
                });

                uploadRequiredData["drive_id"]=bodyObject.ids[0];
                var post_options = {
                    host: 'www.googleapis.com',
                    path: '/upload/drive/v2/files?uploadType=resumable',
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json; charset=UTF-8',
                        'content-length': post_data.length,
                        'authorization': 'Bearer ' + uploadRequiredData.token,
                        'X-Upload-Content-Type': uploadRequiredData.uploadContentType
                                               }
                };
                var post_req = http.request(post_options, function(driveRes) {
                    var chunks = [];
                    driveRes.on("data", function (chunk) {
                        chunks.push(chunk);
                    });

                    driveRes.on("end", function () {
                        if (driveRes.statusCode===200){
                            location= driveRes.headers.location;
                            if (location){
                                var locationResponse = JSON.stringify({
                                    location: location
                                })
                               
                                delete uploadRequiredData["token"];
                                sails.models.moduledata.create(uploadRequiredData).exec(function dataLogged(err, created) {
                                })
                                next(null,locationResponse);
                            }
                            return;
                        }
                        var recievedData = Buffer.concat(chunks);
                        var body = JSON.parse(recievedData.toString());
                        if (driveRes.statusCode===401 && !refreshed){
                            sails.services.driveservice.refreshAndRepost(uploadRequiredData,sails.services.driveservice.getDriveUploadLocation, true, next);
                            return;
                        };
                        if (driveRes.statusCode!=200){
                            next(body.toString(),null);
                            return;
                            }
                        });
                });
                post_req.write(post_data);
                post_req.end();
            });
        })
        getId_request.end();
    }
}