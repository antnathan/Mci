app.directive('discDrag', function() { 
  return { 
    restrict: 'E', 
    scope: { 
      info: '=' 
    }, 
    templateUrl: 'js/directives/discdrag.html' 
  }; 
});