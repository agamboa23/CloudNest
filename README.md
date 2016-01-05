#CLoudNest 

## Synopsis

CloudNest is a service that makes it easy to integrate monitoring systems for biologic research. From the **custom** devices to the researchers, it simplifies the comunication between them and the managment of the **collected data**, **devices configuration**, **new devices and measurments integration.** The main purpose of CloudNest is to offer a integrated system that allows the use of actual and future devices based on a standard of comunication, following the IoT trends around monitoring systems. 

## Code Example
**Once authenticated:**
```js
>GET https://cloudnest.herokuapp.com/user?lastName=gi
[
  {
    "name": "joe",
    "lastName": "Gi",
    "createdAt": "2015-12-16T01:11:21.198Z",
    "updatedAt": "2015-12-16T01:11:21.198Z",
    "id": "5670ba3912ef9f8f2734ca25"
  }
]
```

## Motivation

The development of monitoring systems from different projects presents a big challange, integration. Most of them use specific data structures and representation, making it very difficult to integrate them and get an incremental benefit from different systems developed. Some of the devices use different communication and protocols, and would work just within the system is was developed. CloudNest uses new technologies around the common problems of monitoring systems, and allows for future researchers and project developers to work on the same platform. 

## API Authentication

TODO
## API Reference

TODO
## Contributors

The project is originated thank to the agreement between the Cooperative University of Karlsruhe and the Technical Institute of Costa Rica. The developement of CloudNest is contributed to Alexis Gamboa, with the counseling of Dr. César Gartia from the ITCR and the Dr. Thomas Haalboom form the DHBW Karlsruhe. 

## License

[MIT License](http://choosealicense.com/licenses/mit/)  Copyright © 2015-2016 Alexis Gamboa Soto
