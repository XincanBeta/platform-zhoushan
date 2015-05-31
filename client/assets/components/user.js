angular.module("user", []).service('userService', function () {
  this.setUser = function(user){
    this._user = user;
  }

  this.getUser = function(){
    return this._user;
  }


})
