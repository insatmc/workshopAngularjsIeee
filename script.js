var app = angular.module("app",['ngRoute'])

app.config(function($routeProvider) {
  $routeProvider.when("/person/:name",{
    templateUrl: "partiels/page1.html",
    controller: "page1Ctrl"
  }).when("/listPerson",{
    templateUrl: "partiels/page2.html",
    controller: "firstCtrl"
  }).when("/addPerson",{
    templateUrl: "partiels/addperson.html",
    controller: "addPersonCtrl"
  })
});

app.controller("addPersonCtrl",function($scope) {
  $scope.person = {}
  $scope.addPerson = function() {
    console.log($scope.person)
    // TODO: add request to web service
  }
})

app.controller("page1Ctrl",function($scope,$routeParams,personService) {
  var name = $routeParams.name;
  personService.listPerson().then(function(response) {
      $scope.people = response.data;
      console.log(response)
      $scope.person = {}
      for (var i = 0; i < $scope.people.length; i++) {
        if ($scope.people[i].name.toUpperCase() == name.toUpperCase()){
          $scope.person = $scope.people[i];
          break;
        }
      }
  });

});

app.service("personService",function($http){
  this.listPerson = function() {
    return $http.get("fake-backend/people.json")
  }
})

app.filter("uppercase",function(){
  return function(x,p1,p2) {
    return x.toUpperCase() + p1 + p2
  }

})
app.controller("firstCtrl",function($scope,personService) {
  $scope.person = {}
  personService.listPerson().then(function(response) {
    $scope.people = response.data
    $scope.delete = function(name) {
      console.log(name	)
      for (var i = 0; i < $scope.people.length; i++) {
        if ( $scope.people[i].name == name ){
          $scope.people.splice(i,1)
        }
      }
    }
  })
});
