const SERVER_URL = 'https://class-server.herokuapp.com/collections/cams-form/';

function FormController ($scope, $http) {
	$scope.infos = [];
	$scope.errors = {};

	function init () {
		$http.get(SERVER_URL).then(function (resp){
			console.log(resp.data);
			$scope.infos = resp.data;
		});

	};

	init();

	 $scope.validateName = function (name) {
    	if (name === '') {
     	$scope.errors.name = "Name is required!"
    };
  };


 	$scope.validateEmail = function (email) {
    	if (!email.includes('@')) {
    	$scope.errors.email = "A legit email is required!"
     		return false;
    }
    else {
    		$scope.errors.email = ''
    		return true;
    };	
  };

   	$scope.validateWebsite = function (website) {
    	if (!website.startsWith('http' || 'https')) {
    	$scope.errors.website = "A legit website is required!"
     		return false;
    }
    else {
    		$scope.errors.website = ''
    		return true;
    };	
  };

  	 $scope.validateMessage = function (message) {
    	if (message === '') {
     	$scope.errors.message = "A message is required!"
    };
  };



 	$scope.addInfo = function (info) {
    	$http.post(SERVER_URL, info).then(function (resp) {
     		let info = resp.data;
     	    $scope.infos.push(info);
    });
 };


 	  $scope.delete = function (info) {
    	$http.delete(SERVER_URL + info._id).then(function (resp) {
      		console.log(resp);
      	$scope.infos = $scope.infos.filter(function (x) {
       		 return x._id !== info._id;
      });

    });
  };

 	





}





FormController.$inject = ['$scope', '$http'];
export { FormController };