//
//  connector.h
//  Connector
//
//  Created by Alexis Gamboa  on 11/5/15.
//  Copyright © 2015 Arxos cop. All rights reserved.
//

#ifndef connector_h
#define connector_h

#include <stdio.h>

//  Get the last ir reading added to the system

int getLastReading();

//  Send to the web service a reading
//      reading_time: char pointer (array) with the date and time
//          example: char * reading_time = "15:02:32 15/04/2015"
//      ir_reading: char pointer (array) with the reading data
//          example: char ir_reading [67]= "[12345,54321,54232,...,43231]";
//      The data from the reading should be a char array with 64 values as kelvin
//      the values are kelvin float * 100, so the final number must be an integer
//      example: 220.55 Kelvin becomes 22055
int sendReadingFromString(char * reading_time, char * ir_reading);

//  Send to the web service a reading
//      reading_time: char pointer (array) with the date and time
//          example: char * reading_time = "15:02:32 15/04/2015"
//      ir_reading: unsigned short pointer (array) with the reading data
//          example: unsigned short ir_reading [64]= "{12345,54321,54232,...,43231};
//      ir_reading_size: the size of the unsigned short array
//          example: sizeof(unsigned short ir_reading [64]= "{12345,54321,54232,...,43231});
//      The data from the reading should be a unsigned short array with 64 values as kelvin
//      the values are kelvin float * 100, so the final number must be an integer
//      example: 220.55 Kelvin becomes 22055

int sendReadingFromShort(char * reading_time, unsigned short * ir_reading_short, int ir_reading_size);

// Set Device configuration for just one attribute
int setDeviceConfiguration(char * deviceKey, char * configuration);

//get the device configuration
int getDeviceConfiguration(char* deviceKey);


// Set Module configuration for just one attribute
int setModuleConfiguration(char * deviceKey, char * configuration);

//get the module configuration
int getModuleConfiguration(char* deviceKey);
// post Data
int postData(char * moduleKey, char * data);
//get Google drive Upload location
char * getUploadLink(char* moduleKey, char* uploadData);
#endif /* connector_h */
