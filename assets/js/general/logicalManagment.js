'use strict';

angular.module('cloudNestApp.logicalManagment', ['ngRoute','angularCountryState','angularUtils.directives.dirPagination'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
  			when('/region', {
			    templateUrl: 'views/region/viewRegions.html',
			    controller: 'RegionCtrl',
			    state: 'regions'
			  }).
  			when('/locations/:regionID',{
  				templateUrl: 'views/location/viewLocations.html',
  				controller: 'LocationCtrl',
  				state: 'locations'
  			}).
  			when('/spots/:locationID',{
  				templateUrl: 'views/spot/viewSpots.html',
  				controller: 'SpotCtrl',
  				state: 'spots'
  			}).
   			when('/devices/:spotID',{
  				templateUrl: 'views/device/viewDevices.html',
  				controller: 'DeviceCtrl',
  				state: 'devices'
  			}).
   			when('/deviceModules/:deviceID',{
  				templateUrl: 'views/deviceModule/viewDeviceModules.html',
  				controller: 'DeviceModuleCtrl',
  				state: 'modules'
  			}).
   			when('/configuration/:ownerID/:ownerType/:configurationID?',{
  				templateUrl: 'views/configuration/viewConfiguration.html',
  				controller: 'ConfigurationCtrl',
  				state: 'configuration'
  			}).
            when('/dataStructure/:moduleID/:structureID?',{
                templateUrl: 'views/dataStructure/viewDataStructure.html',
                controller: 'DataStructureCtrl',
                state: 'dataStructure'
            }).
   			when('/moduleData/:moduleID',{
  				templateUrl: 'views/moduleData/viewModuleData.html',
  				controller: 'ModuleDataCtrl',
  				state: 'data'
  			}).
            when('/moduleDataImage/:moduleID',{
                templateUrl: 'views/moduleData/viewModuleData.html',
                controller: 'ModuleDataCtrl',
                state: 'data'
            }).
             when('/moduleDataVideo/:moduleID',{
                templateUrl: 'views/moduleData/viewModuleData.html',
                controller: 'ModuleDataCtrl',
                state: 'data'
            });
}])
.controller('RegionCtrl', function($scope,$http,$location) {
	$scope.newRegion = "";
	$scope.getRegions = function() {
		$http.get('/region?organization='+$scope.user.organization).then(function (res){
			$scope.regions = res.data;
		});
		return false;
	}
	$scope.addRegion = function() {
		var data = JSON.stringify({
	            name: $scope.newRegion.name,
	            description: $scope.newRegion.description,
	            organization: $scope.user.organization
	        });
		$http.post('/region',data);
		$scope.getRegions();
		return false;
	}
	$scope.getRegions();
})
.controller('LocationCtrl', function($scope,$http, $routeParams) {
	$scope.getLocations = function() {
		$http.get('/location?region='+$routeParams.regionID).then(function (res){
			$scope.locations = res.data;
		});
		return false;
}
	$scope.newLocation = "";
	$scope.addLocation = function() {
		var data = JSON.stringify({
	            name: $scope.newLocation.name,
	            country: $scope.newLocation.country,
	            state: $scope.newLocation.state,
	            city: $scope.newLocation.city,
	            description: $scope.newLocation.description,
	            region: $routeParams.regionID
	        });
		$http.post('/location',data);
		$scope.getLocations();
		return false;
	}
	$scope.getLocations();
})
.controller('SpotCtrl', function($scope,$http, $routeParams) {
    $scope.gmap={};
    $scope.loc = { lat: 55.165691, lon: -3.451526 };
    $scope.pinpoint={};
    $('#createModal').on('show.bs.modal', function (e) {
    	 setTimeout(function(){
    	 $scope.gmap.reloadMap();
    		}, 300);
	});
    $scope.gotoCurrentLocation = function () {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(function (position) {
                var c = position.coords;
                $scope.gotoLocation(c.latitude, c.longitude);
            });
            return true;
        }
        return false;
    };
    $scope.updateMap = function(){
    	$scope.updateGmap();
    };
    $scope.gotoLocation = function (lat, lon) {
        if ($scope.lat != lat || $scope.lon != lon) {
            $scope.loc = { lat: lat, lon: lon };
            if (!$scope.$$phase) $scope.$apply("loc");
        }
    };

    // geo-coding
    $scope.search = "";
    $scope.geoCode = function () {
        if ($scope.search && $scope.search.length > 0) {
            if (!this.geocoder) this.geocoder = new google.maps.Geocoder();
            this.geocoder.geocode({ 'address': $scope.search }, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    var loc = results[0].geometry.location;
                    $scope.search = results[0].formatted_address;
                    $scope.gotoLocation(loc.lat(), loc.lng());
                } else {
                    alert("Sorry, this search produced no results.");
                }
            });
        }
    };
	$scope.getSpots = function() {
	$http.get('/spot?location='+$routeParams.locationID).then(function (res){
		$scope.spots = res.data;
	});
	return false;
}
    $scope.newSpot = {};
    $scope.addSpot = function() {
        var data = JSON.stringify({
                name: $scope.newSpot.name,
                description: $scope.newSpot.description,
                space: $scope.newSpot.space,
                longitude: $scope.pinpoint.lng,
                latitude: $scope.pinpoint.lat,
                location: $routeParams.locationID
            });
        $http.post('/spot',data).success(function (data,status,headers,config){
        if (data.result){
            console.log(data.result)
        } else if (data.error) {
            console.log(status)
        }}).error(function(data, status, headers, config) {
         // this isn't happening:
         console.log("error, response status:", status);
    });
        $scope.getSpots();
        return false;
    }
	$scope.getSpots();
})
.controller('DeviceCtrl', function($scope,$http, $routeParams) {
	$scope.getDevices = function() {
	$http.get('/device?spot='+$routeParams.spotID).then(function (res){
		$scope.devices = res.data;
	});
	return false;
}
    $scope.newDevice = {};
    $scope.addDevice = function() {
        var data = JSON.stringify({
                deviceModel: $scope.newDevice.deviceModel,
                description: $scope.newDevice.description,
                spot: $routeParams.spotID,
                organization: $scope.user.organization
            });
        console.log(data);
        $http.post('/device',data);
        $scope.getDevices();
        return false;
    }
	$scope.getDevices();
})
.controller('DeviceModuleCtrl', function($scope,$http, $routeParams) {
	$scope.getModules = function() {
	$http.get('/module?device='+$routeParams.deviceID).then(function (res){
		$scope.deviceModules = res.data;
	});
	return false;
}
    $scope.newModule = {};
    $scope.addModule = function() {
        var data = JSON.stringify({
                name: $scope.newModule.name,
                model: $scope.newModule.model,
                description: $scope.newModule.description,
                device: $routeParams.deviceID
            });
        console.log(data);
        $http.post('/module',data);
        $scope.getModules();
        return false;
    }
	$scope.getModules();
})
.controller('ConfigurationCtrl', function($scope,$http, $routeParams, $location) {
	$scope.getConfiguration = function() {
	$http.get('/configuration/'+$routeParams.configurationID).then(function (res){
        if (res.data){
		  $scope.configuration = res.data;
        }
	});
	return false;
}
	$scope.newAttribute = {};
	$scope.configuration = {}
    $scope.getConfiguration();
  	$scope.addAttribute = function(){
		$scope.configuration[$scope.newAttribute.key]=$scope.newAttribute.value;
	}

    $scope.removeAttribute = function(key){
        delete $scope.configuration[key];
    }
    $scope.setConfiguration = function(){
        $scope.configuration[$routeParams.ownerType]=$routeParams.ownerID;
        var postData = JSON.stringify($scope.configuration);
        $http.post('/configuration',postData).success(function (data,status,headers,config){
            console.log(data);
            if (data){
                console.log(data.id);
                var newID = JSON.stringify({
                        configuration: data.id,
                    });
                console.log('/'+$routeParams.ownerType+'/'+$routeParams.ownerID);
                $http.delete('/configuration/'+$routeParams.configurationID);
                $http.put('/'+$routeParams.ownerType+'/'+$routeParams.ownerID,newID);
                $location.path("configuration/"+$routeParams.ownerID+'/'+$routeParams.ownerType+'/'+data.id);
            } else if (data.error) {
                $scope.modalMessage=data.error; 
                console.log(data.error);
            }
        });
    }
})
.controller('DataStructureCtrl', function($scope,$http,$routeParams,$location) {
    $scope.getDataStructure = function() {
    $http.get('/ModuleDataStructure/'+$routeParams.structureID).then(function (res){
        if(res.data){
            $scope.dataStructure = res.data;
        }
    });
    return false;
}
    $scope.newAttribute = {};
    $scope.dataStructure={};
    $scope.addAttribute = function(){
        $scope.dataStructure[$scope.newAttribute.key]=$scope.newAttribute.value;
    }
    $scope.removeAttribute = function(key){
        delete $scope.dataStructure[key];
    }
    $scope.setDataStructure = function(){
        $scope.dataStructure["module"]=$routeParams.moduleID;
        var postData = JSON.stringify($scope.dataStructure);
        $http.post('/ModuleDataStructure',postData).success(function (data,status,headers,config){
            console.log(data);
            if (data){
                console.log(data.id);
                var newID = JSON.stringify({
                        ModuleDataStructure: data.id,
                    });
                $http.put('/module/'+$routeParams.moduleID,newID);
                $location.path("dataStructure/"+$routeParams.moduleID+'/'+data.id);
            } else if (data.error) {
                $scope.modalMessage=data.error; 
                console.log(data.error);
            }
        });
    }
    $scope.getDataStructure();
})
.controller('ModuleDataStructureCtrl', function($scope,$http, $routeParams) {
	$scope.getDataStructure = function() {
	$http.get('/spot?location='+$routeParams.locationID).then(function (res){
		$scope.spots = res.data;
	});
	return false;
}
	$scope.getSpots();
})
.controller('ModuleDataCtrl', function($scope,$http, $routeParams) {
	$scope.getModuleData = function() {

    $http.get('/moduleData/count?moduleID='+$routeParams.moduleID).then(function (res){
        $scope.totalReadings = res.data.count;
        console.log(res);
        $http.get('/moduleData?module='+$routeParams.moduleID+"&skip="+($scope.pagination.current-1)*$scope.dataPerPage+"&limit="+$scope.dataPerPage).then(function (res){
            $scope.readings = res.data;
            console.log(res.data);
        });
    })
	return false;
    }
    $scope.readings = [];
    $scope.totalReadings = 0;
    $scope.dataPerPage = 5;
    $scope.pagination = {
        current: 1
    };
    $scope.getModuleData();

    $scope.pageChanged = function(num) {
        $scope.getModuleData();
    };


}).
filter('display', function () {
    return function (input, decimals) {
        if (!decimals) decimals = 0;
        input = input * 1;
        var ns = input > 0 ? "N" : "S";
        input = Math.abs(input);
        var deg = Math.floor(input);
        var min = Math.floor((input - deg) * 60);
        var sec = ((input - deg - min / 60) * 3600).toFixed(decimals);
        return deg + "°" + min + "'" + sec + '"' + ns;
    }
}).
filter('lat', function () {
    return function (input, decimals) {
        if (!decimals) decimals = 0;
        input = input * 1;
        var ns = input > 0 ? "N" : "S";
        input = Math.abs(input);
        var deg = Math.floor(input);
        var min = Math.floor((input - deg) * 60);
        var sec = ((input - deg - min / 60) * 3600).toFixed(decimals);
        return deg + "°" + min + "'" + sec + '"' + ns;
    }
}).

// formats a number as a longitude (e.g. -80.02... => "80°1'24"W")
filter('lon', function () {
    return function (input, decimals) {
        if (!decimals) decimals = 0;
        input = input * 1;
        var ew = input > 0 ? "E" : "W";
        input = Math.abs(input);
        var deg = Math.floor(input);
        var min = Math.floor((input - deg) * 60);
        var sec = ((input - deg - min / 60) * 3600).toFixed(decimals);
        return deg + "°" + min + "'" + sec + '"' + ew;
    }
}).
// - Documentation: https://developers.google.com/maps/documentation/
directive("appMap", function () {
    return {
        restrict: "E",
        replace: true,
        template: "<div></div>",
        scope: {
            center: "=",        // Center point on the map (e.g. <code>{ latitude: 10, longitude: 10 }</code>).
            pinpoint: "=",       //  map markers (e.g. <code>{ lat: 10, lon: 10, name: "hello" }</code>).
            width: "@",         // Map width in pixels.
            height: "@",        // Map height in pixels.
            zoom: "@",          // Zoom level (one is totally zoomed out, 25 is very much zoomed in).
            mapTypeId: "@",     // Type of tile to show on the map (roadmap, satellite, hybrid, terrain).
            panControl: "@",    // Whether to show a pan control on the map.
            zoomControl: "@",   // Whether to show a zoom control on the map.
            scaleControl: "@",   // Whether to show scale control on the map.
            control: "="
        },
        link: function (scope, element, attrs) {
            var toResize, toCenter;
            var map;
            var marker;
            // listen to changes in scope variables and update the control
            var arr = ["width", "height", "markers", "mapTypeId", "panControl", "zoomControl", "scaleControl"];
            for (var i = 0, cnt = arr.length; i < arr.length; i++) {
                scope.$watch(arr[i], function () {
                    cnt--;
                    if (cnt <= 0) {
                        updateControl();
                    }
                });
            }

            // update zoom and center without re-creating the map
            scope.$watch("zoom", function () {
                if (map && scope.zoom)
                    map.setZoom(scope.zoom * 1);
            });
            scope.$watch("center", function () {
                if (map && scope.center)
                    map.setCenter(getLocation(scope.center));
            });
            scope.internalControl = scope.control || {};
            scope.internalControl.reloadMap= function(){
            	google.maps.event.trigger(map, 'resize');
            };
            // update the control
            function updateControl() {

                // update size
                if (scope.width) element.width(scope.width);
                if (scope.height) element.height(scope.height);

                // get map options
                var options =
                {
                    center: new google.maps.LatLng(1, 1),
                    zoom: 5,
                    mapTypeId: "roadmap"
                };
                if (scope.center) options.center = getLocation(scope.center);
                if (scope.zoom) options.zoom = scope.zoom * 1;
                if (scope.mapTypeId) options.mapTypeId = scope.mapTypeId;
                if (scope.panControl) options.panControl = scope.panControl;
                if (scope.zoomControl) options.zoomControl = scope.zoomControl;
                if (scope.scaleControl) options.scaleControl = scope.scaleControl;

                // create the map
                map = new google.maps.Map(element[0], options);

                // listen to changes in the center property and update the scope
                google.maps.event.addListener(map, 'center_changed', function () {

                    // do not update while the user pans or zooms
                    if (toCenter) clearTimeout(toCenter);
                    toCenter = setTimeout(function () {
                        if (scope.center) {

                            // check if the center has really changed
                            if (map.center.lat() != scope.center.lat ||
                                map.center.lng() != scope.center.lon) {

                                // update the scope and apply the change
                                scope.center = { lat: map.center.lat(), lon: map.center.lng() };
                                if (!scope.$$phase) scope.$apply("center");
                            }
                        }
                    }, 100);
                });
                google.maps.event.addListener(map, 'click', function(event) {
                                    console.log(scope.center);

                	placeMarker(event.latLng);
                });
            function placeMarker(location) {
                if (!marker){
                    marker = new google.maps.Marker({
                        position: location, 
                        map: map
                    });
                }
                else{
                    marker.setPosition(location);
                }
                scope.pinpoint.lng = location.lng();
                scope.pinpoint.lat = location.lat();
                
            }
            }


            // convert current location to Google maps location
            function getLocation(loc) {
                if (loc == null) return new google.maps.LatLng(40, -73);
                if (angular.isString(loc)) loc = scope.$eval(loc);
                return new google.maps.LatLng(loc.lat, loc.lon);
            }
        }
    };
});