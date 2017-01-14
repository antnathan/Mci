app.directive('descricao', function() { 
  return { 
    restrict: 'E', 
    scope: { 
      info: '=' 
    },
    replace: true, 
    templateUrl: 'js/directives/descricao.html' 
  }; 
});
