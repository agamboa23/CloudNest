'use strict';

<<<<<<< HEAD
angular.module('cloudNestApp.logicalManagment', ['ngRoute','angularCountryState','angularUtils.directives.dirPagination','ngMaterial'])
=======
<<<<<<< HEAD
angular.module('cloudNestApp.logicalManagment', ['ngRoute','angularCountryState','angularUtils.directives.dirPagination','ngMaterial'])
=======
angular.module('cloudNestApp.logicalManagment', ['ngRoute','angularCountryState','angularUtils.directives.dirPagination'])
>>>>>>> 9c97dde2cd209287eb9d1bc1495512c4a5efcc29
>>>>>>> efca8af042c5574c02c50f1d121e2529a23afbe3

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
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> efca8af042c5574c02c50f1d121e2529a23afbe3
            when('/moduleData/:moduleID/video',{
                templateUrl: 'views/moduleData/viewModuleDataVideo.html',
                controller: 'ModuleDataCtrl',
                state: 'data'
            }).
             when('/moduleData/:moduleID/image',{
                templateUrl: 'views/moduleData/viewModuleDataImage.html',
                controller: 'ModuleDataCtrl',
                state: 'data'
            }).
            when('/moduleData/:moduleID/:dataType?',{
<<<<<<< HEAD
=======
=======
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
>>>>>>> 9c97dde2cd209287eb9d1bc1495512c4a5efcc29
>>>>>>> efca8af042c5574c02c50f1d121e2529a23afbe3
                templateUrl: 'views/moduleData/viewModuleData.html',
                controller: 'ModuleDataCtrl',
                state: 'data'
            });
}])
.controller('RegionCtrl', function($scope,$http,$location) {
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> efca8af042c5574c02c50f1d121e2529a23afbe3
	$scope.newRegion = {
        name: "",
        description: ""
    };
    $scope.selected = "";
    $scope.selectedId="";
    $scope.isEditEnable = false;
    $scope.select= function(selected){
        if (!selected.id){
            $scope.selectedId="";
            for (var property in selected){
            selected[property]= "";
            }
            $scope.isEditEnable = true;
        }
        else{
            $scope.selectedId= selected.id;
            $scope.isEditEnable = false;   
        }
        $scope.selected =selected;
        delete $scope.selected["locations"];
    }

    $scope.setEditable=function(newItem){
        $scope.isEditEnable = true;
        for (var property in newItem){
            if ($scope.selected.hasOwnProperty(property)){
                newItem[property] = $scope.selected[property];
            }
        }
        $scope.selected=newItem;
    }
    $scope.submitForm=function(){
        if ($scope.selectedId && $scope.selectedId!=''){
            console.log('update');
            $scope.updateRegion();
        }
        else{
            console.log('create')
            $scope.addRegion();
        }
    }

	$scope.getRegions = function() {
		$http.get('/region?sort=id%20DESC&organization='+$scope.user.organization).then(function (res){
<<<<<<< HEAD
=======
=======
	$scope.newRegion = "";
	$scope.getRegions = function() {
		$http.get('/region?organization='+$scope.user.organization).then(function (res){
>>>>>>> 9c97dde2cd209287eb9d1bc1495512c4a5efcc29
>>>>>>> efca8af042c5574c02c50f1d121e2529a23afbe3
			$scope.regions = res.data;
		});
		return false;
	}
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> efca8af042c5574c02c50f1d121e2529a23afbe3
    $scope.updateRegion = function() {
        var data = JSON.stringify($scope.selected);
        $http.put('/region/'+$scope.selectedId,data).then(function (res){
            $scope.getRegions(); 
        });
    }
    $scope.deleteRegion = function() {
        $http.delete('/region/'+$scope.selectedId).then(function (res){
            $scope.getRegions();
        });
        return false;
    }
<<<<<<< HEAD
=======
=======
>>>>>>> 9c97dde2cd209287eb9d1bc1495512c4a5efcc29
>>>>>>> efca8af042c5574c02c50f1d121e2529a23afbe3
	$scope.addRegion = function() {
		var data = JSON.stringify({
	            name: $scope.newRegion.name,
	            description: $scope.newRegion.description,
	            organization: $scope.user.organization
	        });
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> efca8af042c5574c02c50f1d121e2529a23afbe3
		$http.post('/region',data).then(function(res){
            $scope.getRegions();
        });
		$scope.getRegions();
<<<<<<< HEAD
=======
=======
		$http.post('/region',data);
		$scope.getRegions();
		return false;
>>>>>>> 9c97dde2cd209287eb9d1bc1495512c4a5efcc29
>>>>>>> efca8af042c5574c02c50f1d121e2529a23afbe3
	}
	$scope.getRegions();
})
.controller('LocationCtrl', function($scope,$http, $routeParams) {
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> efca8af042c5574c02c50f1d121e2529a23afbe3
    $scope.newLocation = {
        name: "",
        description: "",
        country: "",
        state: "",
        city: ""
    };
    $scope.selected = "";
    $scope.selectedId="";
    $scope.isEditEnable = false;
    $scope.select= function(selected){
        if (!selected.id){
            $scope.selectedId="";
            for (var property in selected){
            selected[property]= "";
            }
            $scope.isEditEnable = true;
        }
        else{
            $scope.selectedId= selected.id;
            $scope.isEditEnable = false;   
        }
        $scope.selected =selected;
        delete $scope.selected["region"];
        delete $scope.selected["spots"];
    }

    $scope.setEditable=function(newItem){
        $scope.isEditEnable = true;
        for (var property in newItem){
            if ($scope.selected.hasOwnProperty(property)){
                newItem[property] = $scope.selected[property];
            }
        }
        $scope.selected=newItem;
    }
    $scope.submitForm=function(){
        if ($scope.selectedId && $scope.selectedId!=''){
            console.log('update');
            $scope.updateLocation();
        }
        else{
            console.log('create')
            $scope.addLocation();
        }
    }
    $scope.updateLocation = function() {
        var data = JSON.stringify($scope.selected);
        $http.put('/location/'+$scope.selectedId,data).then(function (res){
            $scope.getLocations(); 
        });
    }
    $scope.deleteLocation = function() {
        $http.delete('/location/'+$scope.selectedId).then(function (res){
            $scope.getLocations();
        });
        return false;
    }
	$scope.getLocations = function() {
		$http.get('/location?sort=id%20DESC&region='+$routeParams.regionID).then(function (res){
<<<<<<< HEAD
=======
=======
	$scope.getLocations = function() {
		$http.get('/location?region='+$routeParams.regionID).then(function (res){
>>>>>>> 9c97dde2cd209287eb9d1bc1495512c4a5efcc29
>>>>>>> efca8af042c5574c02c50f1d121e2529a23afbe3
			$scope.locations = res.data;
		});
		return false;
}
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
	$scope.newLocation = "";
>>>>>>> 9c97dde2cd209287eb9d1bc1495512c4a5efcc29
>>>>>>> efca8af042c5574c02c50f1d121e2529a23afbe3
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
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> efca8af042c5574c02c50f1d121e2529a23afbe3
    $scope.newSpot = {
        name: "",
        description: "",
        space: "",
        longitude: "",
        latitude: ""
    };
    $scope.selected = "";
    $scope.selectedId="";
    $scope.isEditEnable = false;
    $scope.select= function(selected){
        if (!selected.id || selected===""){
            $scope.selectedId="";
            delete selected['longitude'];
            delete selected["latitude"];
            for (var property in selected){
            selected[property]= "";
            }
            $scope.isEditEnable = true;
        }
        else{
            $scope.selectedId= selected.id;
            $scope.isEditEnable = false;   
            $scope.pinpoint.lat=selected.latitude;
            $scope.pinpoint.lon=selected.longitude;
            $scope.gmap.update($scope.pinpoint);
        }
        $scope.selected =selected;
        delete $scope.selected["location"];
        delete $scope.selected["devices"];


    }

    $scope.setEditable=function(newItem){
        $scope.isEditEnable = true;
        for (var property in newItem){
            if ($scope.selected.hasOwnProperty(property)){
                newItem[property] = $scope.selected[property];
            }
        }
        $scope.selected=newItem;
        delete $scope.selected['longitude'];
        delete $scope.selected['latitude'];
    }
    $scope.submitForm=function(){
        if ($scope.selectedId && $scope.selectedId!=''){
            console.log('update');
            $scope.updateSpot();
        }
        else{
            console.log('create')
            $scope.addSpot();
        }
    }
    $scope.updateSpot = function() {
        $scope.selected.longitude = $scope.pinpoint.lon;
        $scope.selected.latitude = $scope.pinpoint.lat;
        var data = JSON.stringify($scope.selected);
        $http.put('/spot/'+$scope.selectedId,data).then(function (res){
            $scope.getSpots(); 
        });
    }
    $scope.deleteSpot = function() {
        $http.delete('/spot/'+$scope.selectedId).then(function (res){
            $scope.getSpots();
        });
        return false;
    }


    $scope.gmap={};
    $scope.loc = { lat: 55.165691, lon: -3.451526 };
    $scope.pinpoint={
        lat:55.165691,
        lon:-3.451526};
<<<<<<< HEAD
=======
=======
    $scope.gmap={};
    $scope.loc = { lat: 55.165691, lon: -3.451526 };
    $scope.pinpoint={};
>>>>>>> 9c97dde2cd209287eb9d1bc1495512c4a5efcc29
>>>>>>> efca8af042c5574c02c50f1d121e2529a23afbe3
    $('#createModal').on('show.bs.modal', function (e) {
    	 setTimeout(function(){
    	 $scope.gmap.reloadMap();
    		}, 300);
	});
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> efca8af042c5574c02c50f1d121e2529a23afbe3
    $('#viewModal').on('show.bs.modal', function (e) {
         setTimeout(function(){
         $scope.gmap.reloadMap();
            }, 500);
    });
<<<<<<< HEAD
=======
=======
>>>>>>> 9c97dde2cd209287eb9d1bc1495512c4a5efcc29
>>>>>>> efca8af042c5574c02c50f1d121e2529a23afbe3
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
<<<<<<< HEAD
	$http.get('/spot?sort=id%20DESC&location='+$routeParams.locationID).then(function (res){
=======
<<<<<<< HEAD
	$http.get('/spot?sort=id%20DESC&location='+$routeParams.locationID).then(function (res){
=======
	$http.get('/spot?location='+$routeParams.locationID).then(function (res){
>>>>>>> 9c97dde2cd209287eb9d1bc1495512c4a5efcc29
>>>>>>> efca8af042c5574c02c50f1d121e2529a23afbe3
		$scope.spots = res.data;
	});
	return false;
}
<<<<<<< HEAD
    $scope.addSpot = function() {

=======
<<<<<<< HEAD
    $scope.addSpot = function() {

=======
    $scope.newSpot = {};
    $scope.addSpot = function() {
>>>>>>> 9c97dde2cd209287eb9d1bc1495512c4a5efcc29
>>>>>>> efca8af042c5574c02c50f1d121e2529a23afbe3
        var data = JSON.stringify({
                name: $scope.newSpot.name,
                description: $scope.newSpot.description,
                space: $scope.newSpot.space,
<<<<<<< HEAD
                longitude: $scope.pinpoint.lon,
=======
<<<<<<< HEAD
                longitude: $scope.pinpoint.lon,
=======
                longitude: $scope.pinpoint.lng,
>>>>>>> 9c97dde2cd209287eb9d1bc1495512c4a5efcc29
>>>>>>> efca8af042c5574c02c50f1d121e2529a23afbe3
                latitude: $scope.pinpoint.lat,
                location: $routeParams.locationID
            });
        $http.post('/spot',data).success(function (data,status,headers,config){
        if (data.result){
            console.log(data.result)
<<<<<<< HEAD
            $scope.getSpots();
=======
<<<<<<< HEAD
            $scope.getSpots();
=======
>>>>>>> 9c97dde2cd209287eb9d1bc1495512c4a5efcc29
>>>>>>> efca8af042c5574c02c50f1d121e2529a23afbe3
        } else if (data.error) {
            console.log(status)
        }}).error(function(data, status, headers, config) {
         // this isn't happening:
         console.log("error, response status:", status);
    });
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
        $scope.getSpots();
>>>>>>> 9c97dde2cd209287eb9d1bc1495512c4a5efcc29
>>>>>>> efca8af042c5574c02c50f1d121e2529a23afbe3
        return false;
    }
	$scope.getSpots();
})
.controller('DeviceCtrl', function($scope,$http, $routeParams) {
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> efca8af042c5574c02c50f1d121e2529a23afbe3

    $scope.newDevice = {
        name:"",
        deviceModel: "",
        description: ""
    };
    $scope.selected = "";
    $scope.selectedId="";
    $scope.isEditEnable = false;
    $scope.select= function(selected){
        if (!selected.id){
            $scope.selectedId="";
            for (var property in selected){
            selected[property]= "";
            }
            $scope.isEditEnable = true;
        }
        else{
            $scope.selectedId= selected.id;
            $scope.isEditEnable = false;   
        }
        $scope.selected =selected;
        delete $scope.selected["spot"];
        delete $scope.selected["modules"];
        delete $scope.selected["configuration"];
    }

    $scope.setEditable=function(newItem){
        $scope.isEditEnable = true;
        for (var property in newItem){
            if ($scope.selected.hasOwnProperty(property)){
                newItem[property] = $scope.selected[property];
            }
        }
        $scope.selected=newItem;
    }
    $scope.submitForm=function(){
        if ($scope.selectedId && $scope.selectedId!=''){
            console.log('update');
            $scope.updateDevice();
        }
        else{
            console.log('create')
            $scope.addDevice();
        }
    }
    $scope.updateDevice = function() {
        var data = JSON.stringify($scope.selected);
        $http.put('/device/'+$scope.selectedId,data).then(function (res){
            $scope.getDevices(); 
        });
    }
    $scope.deleteDevice = function() {
        $http.delete('/device/'+$scope.selectedId).then(function (res){
            $scope.getDevices();
        });
        return false;
    }
	$scope.getDevices = function() {
	$http.get('/device?sort=id%20DESC&spot='+$routeParams.spotID).then(function (res){
		$scope.devices = res.data;
	});
	return false;
    }
    $scope.showModal = function(modal){
        $(modal).modal('show');
    }
    $scope.addDevice = function() {
        var data = JSON.stringify({
                name: $scope.newDevice.name,
<<<<<<< HEAD
=======
=======
	$scope.getDevices = function() {
	$http.get('/device?spot='+$routeParams.spotID).then(function (res){
		$scope.devices = res.data;
	});
	return false;
}
    $scope.newDevice = {};
    $scope.addDevice = function() {
        var data = JSON.stringify({
>>>>>>> 9c97dde2cd209287eb9d1bc1495512c4a5efcc29
>>>>>>> efca8af042c5574c02c50f1d121e2529a23afbe3
                deviceModel: $scope.newDevice.deviceModel,
                description: $scope.newDevice.description,
                spot: $routeParams.spotID,
                organization: $scope.user.organization
            });
        console.log(data);
<<<<<<< HEAD
        $http.post('/device',data).then(function(res){
            $scope.getDevices();
        });
=======
<<<<<<< HEAD
        $http.post('/device',data).then(function(res){
            $scope.getDevices();
        });
=======
        $http.post('/device',data);
        $scope.getDevices();
>>>>>>> 9c97dde2cd209287eb9d1bc1495512c4a5efcc29
>>>>>>> efca8af042c5574c02c50f1d121e2529a23afbe3
        return false;
    }
	$scope.getDevices();
})
.controller('DeviceModuleCtrl', function($scope,$http, $routeParams) {
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> efca8af042c5574c02c50f1d121e2529a23afbe3
    $scope.newModule = {
        name:"",
        model: "",
        description: ""
    };
    $scope.selected = "";
    $scope.selectedId="";
    $scope.isEditEnable = false;
    $scope.select= function(selected){
        if (!selected || !selected.id){
            $scope.selectedId="";
            for (var property in selected){
            selected[property]= "";
            }
            $scope.isEditEnable = true;
        }
        else{
            $scope.selectedId= selected.id;
            $scope.isEditEnable = false;   
        }
        $scope.selected =selected;
        delete $scope.selected["configuration"];
        delete $scope.selected["ModuleDataStructure"];
        delete $scope.selected["ModuleData"];
        delete $scope.selected["device"];
    }

    $scope.setEditable=function(newItem){
        $scope.isEditEnable = true;
        for (var property in newItem){
            if ($scope.selected.hasOwnProperty(property)){
                newItem[property] = $scope.selected[property];
            }
        }
        $scope.selected=newItem;
    }
    $scope.submitForm=function(){
        if ($scope.selectedId && $scope.selectedId!=''){
            console.log('update');
            $scope.updateModule();
        }
        else{
            console.log('create')
            $scope.addModule();
        }
    }
    $scope.updateModule = function() {
        var data = JSON.stringify($scope.selected);
        $http.put('/module/'+$scope.selectedId,data).then(function (res){
            $scope.getModules(); 
        });
    }
    $scope.deleteModule = function() {
        $http.delete('/module/'+$scope.selectedId).then(function (res){
            $scope.getModules();
        });
        return false;
    }
	$scope.getModules = function() {
	$http.get('/module?sort=id%20DESC&device='+$routeParams.deviceID).then(function (res){
		$scope.deviceModules = res.data;
	});
    $scope.showModal = function(modal){
        $(modal).modal('show');
    }
	return false;
    }
<<<<<<< HEAD
=======
=======
	$scope.getModules = function() {
	$http.get('/module?device='+$routeParams.deviceID).then(function (res){
		$scope.deviceModules = res.data;
	});
	return false;
}
    $scope.newModule = {};
>>>>>>> 9c97dde2cd209287eb9d1bc1495512c4a5efcc29
>>>>>>> efca8af042c5574c02c50f1d121e2529a23afbe3
    $scope.addModule = function() {
        var data = JSON.stringify({
                name: $scope.newModule.name,
                model: $scope.newModule.model,
                description: $scope.newModule.description,
                device: $routeParams.deviceID
            });
        console.log(data);
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> efca8af042c5574c02c50f1d121e2529a23afbe3
        $http.post('/module',data).then(function(res){
            $scope.getModules();
        });
        return false;
    }

<<<<<<< HEAD
=======
=======
        $http.post('/module',data);
        $scope.getModules();
        return false;
    }
>>>>>>> 9c97dde2cd209287eb9d1bc1495512c4a5efcc29
>>>>>>> efca8af042c5574c02c50f1d121e2529a23afbe3
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
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
            console.log(data);
>>>>>>> 9c97dde2cd209287eb9d1bc1495512c4a5efcc29
>>>>>>> efca8af042c5574c02c50f1d121e2529a23afbe3
            if (data){
                console.log(data.id);
                var newID = JSON.stringify({
                        ModuleDataStructure: data.id,
<<<<<<< HEAD
                        DataType: data.DataType
=======
<<<<<<< HEAD
                        DataType: data.DataType
=======
>>>>>>> 9c97dde2cd209287eb9d1bc1495512c4a5efcc29
>>>>>>> efca8af042c5574c02c50f1d121e2529a23afbe3
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
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> efca8af042c5574c02c50f1d121e2529a23afbe3
.controller('ModuleDataCtrl', function($scope,$http, $routeParams) {
    $scope.selected = "";
    $scope.selectedId="";
    $scope.isEditEnable = false;
    $scope.select= function(selected){
        $scope.selected =selected;
        delete $scope.selected["module"];
    }
	$scope.getModuleData = function() {

    $http.get('/moduleData/count?moduleID='+$routeParams.moduleID).then(function (resCount){
        $http.get('/moduleData?sort=id%20DESC&module='+$routeParams.moduleID+"&skip="+($scope.pagination.current-1)*$scope.dataPerPage+"&limit="+$scope.dataPerPage).then(function (res){
            $scope.totalReadings = resCount.data.count;
            $scope.readings = res.data;
<<<<<<< HEAD
=======
=======
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
>>>>>>> 9c97dde2cd209287eb9d1bc1495512c4a5efcc29
>>>>>>> efca8af042c5574c02c50f1d121e2529a23afbe3
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
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> efca8af042c5574c02c50f1d121e2529a23afbe3
    $scope.showModal = function(modal){
        $(modal).modal('show');
    }
    $scope.pageChanged = function(num) {
        $scope.getModuleData();
        console.log($scope.readings.length);
<<<<<<< HEAD
=======
=======

    $scope.pageChanged = function(num) {
        $scope.getModuleData();
>>>>>>> 9c97dde2cd209287eb9d1bc1495512c4a5efcc29
>>>>>>> efca8af042c5574c02c50f1d121e2529a23afbe3
    };


}).
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
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
>>>>>>> 9c97dde2cd209287eb9d1bc1495512c4a5efcc29
>>>>>>> efca8af042c5574c02c50f1d121e2529a23afbe3
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
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> efca8af042c5574c02c50f1d121e2529a23afbe3
            scope.internalControl.update=function(location){
                placeMarker(getLocation(location));
                centerMap(getLocation(location));

            }
<<<<<<< HEAD
=======
=======
>>>>>>> 9c97dde2cd209287eb9d1bc1495512c4a5efcc29
>>>>>>> efca8af042c5574c02c50f1d121e2529a23afbe3
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
<<<<<<< HEAD
                placeMarker(getLocation(scope.center))
=======
<<<<<<< HEAD
                placeMarker(getLocation(scope.center))
=======
>>>>>>> 9c97dde2cd209287eb9d1bc1495512c4a5efcc29
>>>>>>> efca8af042c5574c02c50f1d121e2529a23afbe3

                // listen to changes in the center property and update the scope
                google.maps.event.addListener(map, 'center_changed', function () {

                    // do not update while the user pans or zooms
                    if (toCenter) clearTimeout(toCenter);
                    toCenter = setTimeout(function () {
<<<<<<< HEAD
                        if (scope.center.latlng) {
=======
<<<<<<< HEAD
                        if (scope.center.latlng) {
=======
                        if (scope.center) {
>>>>>>> 9c97dde2cd209287eb9d1bc1495512c4a5efcc29
>>>>>>> efca8af042c5574c02c50f1d121e2529a23afbe3

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
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> efca8af042c5574c02c50f1d121e2529a23afbe3
                	placeMarker(event.latLng);
                });

            }
<<<<<<< HEAD
=======
=======
                                    console.log(scope.center);

                	placeMarker(event.latLng);
                });
>>>>>>> 9c97dde2cd209287eb9d1bc1495512c4a5efcc29
>>>>>>> efca8af042c5574c02c50f1d121e2529a23afbe3
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
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> efca8af042c5574c02c50f1d121e2529a23afbe3
                scope.pinpoint.lon = location.lng();
                scope.pinpoint.lat = location.lat();
            }
            function centerMap(location){
                map.setCenter(location)
            }
<<<<<<< HEAD
=======
=======
                scope.pinpoint.lng = location.lng();
                scope.pinpoint.lat = location.lat();
                
            }
            }


>>>>>>> 9c97dde2cd209287eb9d1bc1495512c4a5efcc29
>>>>>>> efca8af042c5574c02c50f1d121e2529a23afbe3
            // convert current location to Google maps location
            function getLocation(loc) {
                if (loc == null) return new google.maps.LatLng(40, -73);
                if (angular.isString(loc)) loc = scope.$eval(loc);
                return new google.maps.LatLng(loc.lat, loc.lon);
            }
        }
    };
<<<<<<< HEAD
})
=======
<<<<<<< HEAD
})
=======
});
>>>>>>> 9c97dde2cd209287eb9d1bc1495512c4a5efcc29
>>>>>>> efca8af042c5574c02c50f1d121e2529a23afbe3
