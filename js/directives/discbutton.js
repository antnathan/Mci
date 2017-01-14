app.directive('discButton', function() { 
  return { 
    restrict: 'E', 
    scope: { 
      info: '=' 
    }, 
    templateUrl: 'js/directives/discbutton.html' 
  }; 
});