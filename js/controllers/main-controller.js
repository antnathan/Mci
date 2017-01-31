app.controller('MainController', ['$scope', function($scope) { 
	$scope.promo = 'Sistemas e Mídias Digitais';	
    $scope.myVar = 'off';
	
	$scope.hover = function (eli) {
		var el = document.querySelector( '#'+eli );
		var $el = angular.element( el )
		var myimg = angular.element(el).find('img');
		myimg.attr('src', '../imagens/icon12.png');   
	}
	$scope.unhover = function (eli) {
		var el = document.querySelector( '#'+eli );
		var $el = angular.element( el )
		var myimg = angular.element(el).find('img');
		myimg.attr('src', '../imagens/icon1.png'); 
	}
	$scope.hover2 = function (eli) {
		var el = document.querySelector( '#'+eli );
		var $el = angular.element( el )
		var myimg = angular.element(el).find('img');
		myimg.attr('src', '../imagens/icon22.png'); 
	}
	$scope.unhover2 = function (eli) {
		var el = document.querySelector( '#'+eli );
		var $el = angular.element( el )
		var myimg = angular.element(el).find('img');
		myimg.attr('src', '../imagens/icon2.png'); 
	}
	$scope.hover3 = function (eli) {
		var el = document.querySelector( '#'+eli );
		var $el = angular.element( el )
		var myimg = angular.element(el).find('img');
		myimg.attr('src', '../imagens/icon32.png'); 
	}
	$scope.unhover3 = function (eli) {
		var el = document.querySelector( '#'+eli );
		var $el = angular.element( el )
		var myimg = angular.element(el).find('img');
		myimg.attr('src', '../imagens/icon3.png'); 
	}
}]);
