//
//  connector.c
//  Connector
//
//  Created by Alexis Gamboa  on 11/5/15.
//  Copyright © 2015 Arxos cop. All rights reserved.
//

#include "connector.h"
#include <fcntl.h>
#include <stdlib.h>
#include <string.h>
#include <sys/stat.h>
#include <curl/curl.h>


char* concat(char *s1, char *s2)
{
    char *result = malloc(strlen(s1)+strlen(s2)+1);//+1 for the zero-terminator
    //in real code you would check for errors in malloc here
    strcpy(result, s1);
    strcat(result, s2);
    return result;
}


char * shortToStringArray (unsigned short *shortArray, int size_array){
    char * newString = calloc((size_array/2),sizeof(char));
    int short_index = 0;
    newString[0]='[';
    int limit = size_array/2*6;
    for (int short_index = 0; short_index <size_array/2;short_index++){
        int num = strlen(newString);
        snprintf(newString+strlen(newString), 8, " %1.0f,", (double)*(shortArray+short_index));
    }
    newString[strlen(newString)-1]=']';
    return newString;
}

int sendReadings(char ** reading){
    printf("%s", reading[1]);
    printf("%s", reading[2]);
    return 0;
}

int getLastReading()
{
    curl_global_init( CURL_GLOBAL_DEFAULT );
    CURL *curl;
    CURLcode res;
    curl = curl_easy_init();
    if(curl) {
        curl_easy_setopt(curl, CURLOPT_URL, "https://ir-test-dhbw-1.herokuapp.com/getLastReading");
        /* Perform the request, res will get the return code */
        res = curl_easy_perform(curl);
        /* Check for errors */
        if(res != CURLE_OK)
        fprintf(stderr, "curl_easy_perform() failed: %s\n",
                        curl_easy_strerror(res));
        /* always cleanup */
        curl_easy_cleanup(curl);
    }
    curl_global_cleanup();
    return 0;
}
int getDeviceConfiguration(char* deviceKey)
{
    curl_global_init( CURL_GLOBAL_DEFAULT );
    CURL *curl;
    CURLcode res;
    curl = curl_easy_init();
    char* endPoint="https://cloudnest.herokuapp.com/getDeviceConfiguration/";
    char* fullUrl = concat(endPoint,deviceKey);
    if(curl) {
        curl_easy_setopt(curl, CURLOPT_URL, fullUrl);
        /* Perform the request, res will get the return code */
        res = curl_easy_perform(curl);
        /* Check for errors */
        if(res != CURLE_OK)
            fprintf(stderr, "curl_easy_perform() failed: %s\n",
                    curl_easy_strerror(res));
        /* always cleanup */
        curl_easy_cleanup(curl);
    }
    curl_global_cleanup();
    return 0;
}
int setDeviceConfiguration(char * deviceKey, char * configuration)
{
    CURL *hnd = curl_easy_init();
    char* endPoint="https://cloudnest.herokuapp.com/setDeviceConfiguration/";
    char* fullUrl = concat(endPoint,deviceKey);
    curl_easy_setopt(hnd, CURLOPT_CUSTOMREQUEST, "POST");
    struct curl_slist *headers = NULL;
    headers = curl_slist_append(headers, "Accept: application/json");
    headers = curl_slist_append(headers, "Content-Type: application/json");
    headers = curl_slist_append(headers, "charsets: utf-8");
    curl_easy_setopt(hnd, CURLOPT_HTTPHEADER, headers);
    curl_easy_setopt(hnd, CURLOPT_URL,fullUrl);
    curl_easy_setopt(hnd, CURLOPT_POSTFIELDS, configuration);
    CURLcode ret = curl_easy_perform(hnd);
    curl_global_cleanup();
    return 0;
}

int getModuleConfiguration(char* moduleKey)
{
    curl_global_init( CURL_GLOBAL_DEFAULT );
    CURL *curl;
    CURLcode res;
    curl = curl_easy_init();
    char* endPoint="https://cloudnest.herokuapp.com/getModuleConfiguration/";
    char* fullUrl = concat(endPoint,moduleKey);
    if(curl) {
        curl_easy_setopt(curl, CURLOPT_URL, fullUrl);
        /* Perform the request, res will get the return code */
        res = curl_easy_perform(curl);
        /* Check for errors */
        if(res != CURLE_OK)
            fprintf(stderr, "curl_easy_perform() failed: %s\n",
                    curl_easy_strerror(res));
        /* always cleanup */
        curl_easy_cleanup(curl);
    }
    curl_global_cleanup();
    return 0;
}

int setModuleConfiguration(char * moduleKey, char * configuration)
{
    CURL *hnd = curl_easy_init();
    char* endPoint="https://cloudnest.herokuapp.com/getModuleConfiguration/";
    char* fullUrl = concat(endPoint,moduleKey);
    curl_easy_setopt(hnd, CURLOPT_CUSTOMREQUEST, "POST");
    struct curl_slist *headers = NULL;
    headers = curl_slist_append(headers, "Accept: application/json");
    headers = curl_slist_append(headers, "Content-Type: application/json");
    headers = curl_slist_append(headers, "charsets: utf-8");
    curl_easy_setopt(hnd, CURLOPT_HTTPHEADER, headers);
    curl_easy_setopt(hnd, CURLOPT_URL,fullUrl);
    curl_easy_setopt(hnd, CURLOPT_POSTFIELDS, configuration);
    CURLcode ret = curl_easy_perform(hnd);
    curl_global_cleanup();
    return 0;
}

int postData(char * moduleKey, char * data)
{
    CURL *hnd = curl_easy_init();
    char* endPoint="https://cloudnest.herokuapp.com/postdata/";
    char* fullUrl = concat(endPoint,moduleKey);
    curl_easy_setopt(hnd, CURLOPT_CUSTOMREQUEST, "POST");
    struct curl_slist *headers = NULL;
    headers = curl_slist_append(headers, "Accept: application/json");
    headers = curl_slist_append(headers, "Content-Type: application/json");
    headers = curl_slist_append(headers, "charsets: utf-8");
    curl_easy_setopt(hnd, CURLOPT_HTTPHEADER, headers);
    curl_easy_setopt(hnd, CURLOPT_URL,fullUrl);
    curl_easy_setopt(hnd, CURLOPT_POSTFIELDS, data);
    CURLcode ret = curl_easy_perform(hnd);
    curl_global_cleanup();
    return 0;
}


char * getUploadLink(char* moduleKey, char* uploadData){
    CURL *hnd = curl_easy_init();
    char* endPoint="https://cloudnest.herokuapp.com/getResumableUploadLocation/";
    char* fullUrl = concat(endPoint,moduleKey);
    curl_easy_setopt(hnd, CURLOPT_CUSTOMREQUEST, "POST");
    struct curl_slist *headers = NULL;
    headers = curl_slist_append(headers, "Accept: application/json");
    headers = curl_slist_append(headers, "Content-Type: application/json");
    headers = curl_slist_append(headers, "charsets: utf-8");
    curl_easy_setopt(hnd, CURLOPT_HTTPHEADER, headers);
    curl_easy_setopt(hnd, CURLOPT_URL,fullUrl);
    curl_easy_setopt(hnd, CURLOPT_POSTFIELDS, uploadData);
    CURLcode ret = curl_easy_perform(hnd);
    curl_global_cleanup();
    return 0;
}

int sendReadingFromString(char * reading_time, char * ir_reading)
{
    CURL *curl;
    CURLcode res;
    char * POSTFIELDRT = "reading_time=";
    char * POSTFIELDIR = "&ir_reading=";
    
    char *ext = ".txt";
    int lenPostData   = strlen(POSTFIELDRT) + strlen(POSTFIELDIR) + strlen(reading_time) + strlen(ir_reading) + 1;
    char *PostData = malloc(lenPostData);

    /* or for conforming C99 ...  */
    strncpy(PostData, POSTFIELDRT, lenPostData);
    strncat(PostData, reading_time, lenPostData);
    strncat(PostData, POSTFIELDIR, lenPostData);
    strncat(PostData, ir_reading, lenPostData);

    printf("%s\n", PostData);
    
    /* In windows, this will init the winsock stuff */
    curl_global_init(CURL_GLOBAL_ALL);
    
    /* get a curl handle */
    curl = curl_easy_init();
    if(curl) {
        /* First set the URL that is about to receive our POST. This URL can
         just as well be a https:// URL if that is what should receive the
         data. */
        curl_easy_setopt(curl, CURLOPT_URL, "https://ir-test-dhbw-1.herokuapp.com/addReading");
        /* Now specify the POST data */
        curl_easy_setopt(curl, CURLOPT_POSTFIELDS, PostData);
        
        /* Perform the request, res will get the return code */
        res = curl_easy_perform(curl);
        /* Check for errors */
        if(res != CURLE_OK)
            fprintf(stderr, "curl_easy_perform() failed: %s\n",
                    curl_easy_strerror(res));
        
        /* always cleanup */
        curl_easy_cleanup(curl);
    }
    curl_global_cleanup();
    return 0;
}


int sendReadingFromShort(char * reading_time, unsigned short * ir_reading_short, int ir_reading_size)
{
    char * ir_reading_string = shortToStringArray(ir_reading_short, ir_reading_size);
    sendReadingFromString(reading_time,ir_reading_string);
    return 0;
}
