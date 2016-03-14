//
//  main.c
//  RPI-connector
//
//  Created by Alexis Gamboa  on 11/5/15.
//  Copyright © 2015 Arxos cop. All rights reserved.
//

#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include "connector.h"

int main(int argc, const char * argv[]) {
    // Test with array readings
    //test readings
    //char* test_time = "1/2/2015 11:11:11";
    //char* test_ir = "[[1,2,3],[3,2,1],[0,0,0]]";
    //char buf[20];
    //size_t nbytes = strlen(buf);
    //sendReadingFromString(test_time, test_ir);
    //getLastReading();
    //unsigned short intList[]= {1,2,3234,54345,5345,63454};
    //sendReadingFromShort(test_time, intList, sizeof(intList));
    //fflush(stdout);
    //char * newString = ToStringArray(intList, sizeof(intList));
    //printf(newString);
    
    
    //Test with CloudNest API
    
    //Set Device Configuration
    //char* configuration = "{\n\"nightMode\":\"on\"\n}";
    //char* deviceKey = "d42cf231-8485-4dca-a36c-69626a00e671";
    //setDeviceConfiguration(deviceKey,configuration);
    
    //Set Module Configuration
    //char* configuration = "{\n\"nightMode\":\"on\"\n}";
    //char* moduleKey = "d42cf231-1234-4dca-a36c-809g82b70127";
    //setModuleConfiguration(moduleKey,configuration);
    
    // Get DeviceConfiguration
    //char* deviceKey = "d42cf231-8485-4dca-a36c-69626a00e671";
    //getDeviceConfiguration(deviceKey);
    
    // Get Module Configuration
    //char* moduleKey = "d42cf231-8485-4dca-a36c-69626a00e671";
    //getModuleConfiguration(moduleKey);
    
    //PostData
    //char* moduleKey = "89bcd28a-6b1b-4229-99e4-aab876838d00";
    //char* toPost = "{\n\"data\":\"55\"\n}";
    //postData(moduleKey, toPost);

    //get resumable upload link
    char* moduleKey = "017ac595-ed12-4143-bc69-63d0ab7812e2";
    char* uploadData = "{\n\"uploadContentLength\":\"443486\",\n\"uploadContentType\":\"image/jpeg\",\n\"uploadTitle\":\"upload example\"\n}";
    getUploadLink( moduleKey, uploadData);
    return 0;
}
