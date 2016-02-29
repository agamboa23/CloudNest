# CloudNest 
<a href="http://cloudnest.herokuapp.com/"><img alt="Sails.js logo" src="http://s7.postimg.org/4nnlngbjf/logo.png" title="Sails.js"/></a>

## Synopsis

CloudNest is a service that makes it easy to integrate monitoring systems for biologic research. From the **custom** devices to the researchers, it simplifies the comunication between them and the managment of the **collected data**, **devices configuration**, **new devices and measurments integration.** The main purpose of CloudNest is to offer a integrated system that allows the use of actual and future devices based on a standard of comunication, following the IoT trends around monitoring systems. 

## Code Example
**Get Module Configuration**
```js
>GET https://cloudnest.herokuapp.com/getDeviceConfiguration/dd77d3c4-da1e-4b69-83b0-2fb937358f51
{
"device": "569458f52dbb229c061ffe0e",
"night mode": "on",
"createdAt": "2016-02-18T12:38:48.757Z",
"updatedAt": "2016-02-18T12:38:57.247Z",
"id": "56c5bb58db2230310a2e4c47"
}
```

**Post Data on C**
```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <sys/stat.h>
#include <curl/curl.h>

int main(int argc, const char * argv[]) {

CURL *hnd = curl_easy_init();
char* moduleKey = "89bcd28a-6b1b-4229-99e4-aab876838d00";
char* toPost = "{\n\"data\":\"55\"\n}";
char* endPoint="https://cloudnest.herokuapp.com/postdata/";
char* fullUrl = concat(endPoint,moduleKey);

curl_easy_setopt(hnd, CURLOPT_CUSTOMREQUEST, "POST");

struct curl_slist *headers = NULL;
headers = curl_slist_append(headers, "Accept: application/json");
headers = curl_slist_append(headers, "Content-Type: application/json");
headers = curl_slist_append(headers, "charsets: utf-8");
curl_easy_setopt(hnd, CURLOPT_HTTPHEADER, headers);

curl_easy_setopt(hnd, CURLOPT_URL,fullUrl);
curl_easy_setopt(hnd, CURLOPT_POSTFIELDS, toPost);
CURLcode ret = curl_easy_perform(hnd);
curl_global_cleanup();

return 0;
}  
```

## Motivation

The development of monitoring systems from different projects presents a big challange, integration. Most of them use specific data structures and representation, making it very difficult to integrate them and get an incremental benefit from different systems developed. Some of the devices use different communication and protocols, and would work just within the system is was developed. CloudNest uses new technologies around the common problems of monitoring systems, and allows for future researchers and project developers to work on the same platform. 

## API Reference

### Device 

The device configuration can be set and accesed remotly from the own device. For these operations, the Device-Key is required. 

| Method | Http Request |   Description |
| ------ | ----------- | ---|
| Get Device Configuration | GET  https://<i></i>cloudnest.herokuapp.<i></i>com/getDeviceConfiguration/`deviceKey` | Gets the configuration set for that specific Device
| Set Device Configuration | POST https://<i></i>cloudnest.herokuapp.<i></i>com/setDeviceConfiguration/`deviceKey` Request Body: <br>  &nbsp;&nbsp;Custom Attribute1: Value1 <br> &nbsp;&nbsp;Custom Attribute2: Value2 <br>&nbsp;&nbsp;...<br> | Creates or overwrites the configuration for a given device.

### Module 

The module configuration can be set and accesed remotly from the own device. For these operations, the Module-Key is required. 

| Method | Http Request |   Description |
| ------ | ----------- | ---|
| Get Module Configuration | GET  https://<i></i>cloudnest.herokuapp.<i></i>com/getModuleConfiguration/`moduleKey` | Gets the configuration set for that specific Module
| Set Module Configuration | POST https://<i></i>cloudnest.herokuapp<i></i>.com/setModuleConfiguration/`moduleKey` Request Body: <br>  &nbsp;&nbsp;Custom Attribute1: Value1 <br> &nbsp;&nbsp;Custom Attribute2: Value2 <br>&nbsp;&nbsp;...<br> | Creates or overwrites the configuration for a given module.

### Data Post 

Data collected by the device module can be post in the system. Media or Blob data has to be uploaded using the resumable upload method. This method will post the metadata and give back an Google Drive Location to upload the file, related with the already given metada. For more information about the resumable file upload process, please reference directly to [Google Drive API Reference: Resumable Upload].
For both operations, the Module-Key is required.

[Google Drive API Reference: Resumable Upload]:https://developers.google.com/drive/v3/web/manage-uploads#upload-resumable

| Method | Http Request |   Description |
| ------ | ----------- | ---|
| Post Data | POST https://<i></i>cloudnest.herokuapp.<i></i>com/postdata/`moduleKey` <br>Request Body: <br>&nbsp;&nbsp;readingTime: `dateTime` <br>&nbsp;&nbsp;data: `dataValue` <br>  &nbsp;&nbsp;Custom Attribute1: Value1 <br> &nbsp;&nbsp;Custom Attribute2: Value2 <br>&nbsp;&nbsp;...<br> | Post data related to a specific module.
| Upload request | POST https://<i></i>cloudnest.herokuapp.<i></i>com/getResumableUploadLocation/`moduleKey` Request Body: <br>&nbsp;&nbsp;uploadContentLength: `contentLength` <br>&nbsp;&nbsp;uploadContentType: `MIME/contentType` <br>&nbsp;&nbsp;uploadTitle: `title` <br>  &nbsp;&nbsp;Custom Attribute1: Value1 <br> &nbsp;&nbsp;Custom Attribute2: Value2 <br>&nbsp;&nbsp;...<br>  | Post metadata related with a file to be uploaded. The request responds  a Location with the Google Drive resumable upload location. For more information about the file upload, please visit: [Google Drive API Reference: Resumable Upload].

## Contributors

The project is originated thank to the agreement between the Cooperative University of Karlsruhe and the Technical Institute of Costa Rica. The developement of CloudNest is contributed to Alexis Gamboa, with the counseling of Dr. César Gartia from the ITCR and the Dr. Thomas Haalboom form the DHBW Karlsruhe. 

## License

[MIT License](http://choosealicense.com/licenses/mit/)  Copyright © 2015-2016 Alexis Gamboa Soto
