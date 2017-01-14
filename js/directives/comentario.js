app.directive('comentario', function() { 
  return { 
    restrict: 'E', 
    scope: { 
      info: '=' 
    },
    replace: true, 
    templateUrl: 'js/directives/comentario.html' 
  }; 
});