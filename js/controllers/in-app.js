app.controller('InApp', ['$scope','userService',  function($scope,userService) { 
    $scope.user = userService;
    $scope.color = '#c0392B'
    $scope.myVar = 'on';
    $scope.nome = 'Certo!';
    $scope.coment = {
        nome: 'Digite a cadeira',
        titulo: 'Dê um título',
        livre: 'Escreva aqui',
        estru: 'Conteúdo da Disciplina:     Metodologia da Disciplina:      Professor(es):      Observações:        '
    };
    $scope.filtro = 'Professor';
    $scope.submeter = function(tit, descr){
        var titu = document.getElementsByName(tit)[0];
        var descri = document.getElementsByName(descr)[0];
        var indexi = $scope.user.selectedObject.id;
        var user = $scope.user.perfil;
        console.log(user);
        console.log($scope.user.selectedObject.id);
        console.log($scope.user.cadeiras[indexi]);
        var comenta = {
            avatar: user.avatar,
            nick: user.nick,
            numero:'0',
            titulo: titu.value,
            coment: descri.value
        }
        console.log(comenta);
        $scope.user.cadeiras[indexi].comentarios.push(comenta);
        titu.value = '',
        descri.value = ''
    };
    $scope.atualizarMatriz = function(j,i, obj){
        $scope.user.matriz[j][i] = obj;
        console.log("coloquei o "+obj+" no slot "+i+" Coluna "+j);
    };

    $scope.fill = function(vet){
        for (var j = 1; j <= 8; j++) {
            for (var i = 1; i <= 5; i++) {
                //console.log(vet[j][i]);
                var disc = document.getElementById(vet[j-1][i-1]);
                var slot = document.getElementById("sem"+j+i);
                //console.log(disc+'disc');
                //console.log(slot+'slot');
                if(disc !== null){
                document.getElementById("sem"+j+i).appendChild(disc);
                document.getElementById(vet[j-1][i-1]).style.margin = "-5px";
                document.getElementById(vet[j-1][i-1]).style.opacity = "0.7";
            }
            }
        }
    }

    $scope.clean = function(vet){
        for (var j = 1; j <= 8; j++) {
            for (var i = 1; i <= 5; i++) {
                //console.log(vet[j][i]);
                var disc = document.getElementById(vet[j-1][i-1]);
                //console.log(disc+'disc');
                //console.log(slot+'slot');
                if(disc !== null){
                document.getElementById("wrap"+vet[j-1][i-1]).appendChild(disc);
                document.getElementById(vet[j-1][i-1]).style.margin = "5px";
                document.getElementById(vet[j-1][i-1]).style.opacity = "1";
                }
            }
        }
    }

    $scope.putTrilha = function(ide) {
       var vet = $scope.user.trilhas[ide].matriz;
            $scope.fill(vet);
    };

    $scope.getTrilha = function(ide) {
        var vet = $scope.user.trilhas[ide].matriz;
        var check = $scope.user.trilhas[ide].fixa;
        if(check){
            $scope.clean(vet);    
        }        
    }

    $scope.fixTrilha = function(ide){
        var vet = $scope.user.trilhas[ide].matriz;
        $scope.user.trilhas[ide].fixa = false;
        console.log("tá errado!");
        for (var j = 1; j <= 8; j++) {
        for (var i = 1; i <= 5; i++) {
            var disc = document.getElementById(vet[j-1][i-1]);
             if(disc !== null){
                document.getElementById(vet[j-1][i-1]).style.opacity = "1";
                $scope.entrou(vet[j-1][i-1]);
            }
        }
    }
    }

    $scope.filtery = function(ide){
        $scope.user.filterBy.push(ide);
        console.log($scope.user.filterBy);
    }
    $scope.entrou = function(index){
        $scope.user.cadeiras[index].matriz = false;
    }

    $scope.saiu = function(index){
        $scope.user.cadeiras[index].matriz = true;
    }

    $scope.myFilterBy = function(cadeira) {
      return cadeira.matriz;
    }
    
    $scope.getData = function(index)
    {
        $scope.desc = $scope.user.cadeiras[index];
        $scope.user.selectedObject = $scope.desc;
        console.log("deu?"+$scope.desc);
    }
    $scope.semestres = ['sem1', 'sem2', 'sem3', 'sem4', 'sem5', 'sem6', 'sem7', 'sem8'];
    $scope.cadeiras = $scope.user.cadeiras;
    $scope.user = userService;
}])