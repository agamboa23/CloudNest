'use strict';

angular.module('cloudNestApp.login', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
  				when('/loginFalseAuthentication', {
				    templateUrl: 'views/auth/login.html',
				    controller: 'LoginCtrl',
				    wrongAttempt: 'true'
				  }). 	
  				when('/login', {
				    templateUrl: 'views/auth/login.html',
				    controller: 'LoginCtrl',
				  });
}])

.controller('LoginCtrl', function($scope,$route,$http,$location) {

$scope.userAuth = {identifier: '', password: ''};
$scope.modalMessage = "";
$scope.login = function() {
	var data = JSON.stringify({
            identifier: $scope.userAuth.identifier,
            password: $scope.userAuth.password
        });
	$http.post('/auth/local',data).success(function (data,status,headers,config){
		if (data.result){
			$scope.signIn(data.result);
			$location.path('/region');
		} else if (data.error) {
			$('#attemptModal').modal('show');
			$scope.userAuth.identifier ="";
			$scope.userAuth.password ="";
			$scope.modalMessage=data.error;	
		}
	});
	return false;
}


/**
 * parallax.js
 * @Author original @msurguy (tw) -> http://bootsnipp.com/snippets/featured/parallax-login-form
 * @Tested on FF && CH
 * @Reworked by @kaptenn_com (tw)
 * @package PARALLAX LOGIN.
 */

$(document).ready(function() {
	document.body.style.backgroundImage = "url(http://s18.postimg.org/l7yq0ir3t/pick8_1.jpg)";
    $(document).mousemove(function(event) {
        TweenLite.to($("body"), 
        .5, {
            css: {
                backgroundPosition: "" + parseInt(event.pageX / 8) + "px " + parseInt(event.pageY / '12') + "px, " + parseInt(event.pageX / '15') + "px " + parseInt(event.pageY / '15') + "px, " + parseInt(event.pageX / '30') + "px " + parseInt(event.pageY / '30') + "px",
            	"background-position": parseInt(event.pageX / 8) + "px " + parseInt(event.pageY / 12) + "px, " + parseInt(event.pageX / 15) + "px " + parseInt(event.pageY / 15) + "px, " + parseInt(event.pageX / 30) + "px " + parseInt(event.pageY / 30) + "px"
            }
        })
    })
});
$scope.$on("$destroy", function(){
	$(document).off('mousemove');
	document.body.style.backgroundImage = "";
});


});