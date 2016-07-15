'use strict';

var app = angular.module('myApp');

app.controller('mainCtrl', function($scope, $state, $auth, $q) {
  console.log('mainCtrl!');

  $scope.isAuthenticated = () => $auth.isAuthenticated();

  $scope.logout = () => {
    $auth.logout();
    $state.go('home');
  };

  $scope.authenticate = provider => {
    $auth.authenticate(provider)
      .then(res => {
        // console.log("res");
        $state.go('home');
      })
      .catch(err => {
        console.log('err:', err);
      })
  };
});


app.controller('loginCtrl', function($scope, $state, $auth) {
  console.log('loginCtrl!');

  $scope.login = () => {
    $auth.login($scope.user)
      .then(res => {
        console.log('res:', res);
        $state.go('profile');
      })
      .catch(err => {
        console.log('err:', err);
      });
  };

});


app.controller('registerCtrl', function($scope, $state, $auth) {
  console.log('registerCtrl!');

  $scope.register = () => {
    if($scope.user.password !== $scope.user.password2) {
      $scope.user.password = null;
      $scope.user.password2 = null;
      alert('Passwords must match.  Try again.');
    } else {

      console.log("$scope.user", $scope.user);
      $auth.signup($scope.user)
        .then(res => {
          console.log('res:', res);
          $state.go('login');
        })
        .catch(err => {
          console.log('err:', err);
        });
    }
  };

});

app.controller('profileCtrl', function($scope, Profile, User) {
  console.log('profileCtrl!');

  $scope.user = Profile;

  $scope.addPhone = () => {
    // console.log("phone: ", $scope.user.phone);
    console.log("user id: ", $scope.user._id);
    User.addPhone($scope.user._id, $scope.user.phone)
      .then(res => {
        console.log("res.data: ", res.data);
        $scope.user.phone = null;
      })
      .catch(err => {
        console.log("err: ", err);
      })
  }

  $scope.sendToken = () => {
    User.sendToken()
      .then(res => {
        console.log("res: ", res.data);
      })
      .catch(err => {
        console.log("err: ", err);
      })
    console.log("sent");
  }
});

app.controller('confirmationCtrl', function($scope, User) {
  console.log('confirmationCtrl!');
  // console.log("$stateParams: ",$stateParams.id);
  $scope.verifyCode = () => {
    console.log("code: ", $scope.code);
    User.verifyToken($scope.code)
      .then(res => {
        console.log("res: ", res);
      })
      .catch(err => {
        console.log("err: ", err);
      })
  }

})

app.controller('usersCtrl', function($scope, Users, $state, User) {
  console.log('usersCtrl!');

  $scope.users = Users;

  $scope.toggleAuthorization = (user) => {

    console.log("user: ", user);
    User.toggleAuthor(user._id)
      .then(res=>{
        console.log("res: ",res);
        user.admin = !user.admin;
      })
      .catch(err => {
        console.log("err: ",err);
      })
  }
  // $scope.toggleAuthorization = (index) => {
  //   console.log("index: ",index);
  //   console.log("user: ", $scope.users[index]);
  //   User.toggleAuthor($scope.users[index]._id)
  //     .then(res=>{
  //       console.log("res: ",res);
  //       $state.reload('users')
  //     })
  //     .catch(err => {
  //       console.log("err: ",err);
  //     })
  // }

});
