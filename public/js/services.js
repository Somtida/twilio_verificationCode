'use strict';

var app = angular.module('myApp');

app.service('User', function($http, $q) {

  this.profile = () => {
    return $http.get('/api/users/profile')
      .then(res => {
        return $q.resolve(res.data);
      });
  };

  this.getAll = () => {
    return $http.get('/api/users')
      .then(res => $q.resolve(res.data));
  }
  //
  // this.toggleAuthor = (id) => {
  //   return $http.put(`/api/users/${id}/toggleAdmin`);
  // }

  this.addPhone = (id, phone) => {
    return $http.put(`/api/users/${id}`, {phone: phone});
  }

  this.sendToken = (id) => {
    return $http.post('/api/tokens/send');
  }

  this.verifyToken = (code) => {
    return $http.post('/api/tokens/verify', {code: code});
  }
});
