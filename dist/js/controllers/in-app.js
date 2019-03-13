app.controller('InApp', ['$scope','userService','$timeout',  function($scope,userService,$timeout) { 
    $scope.user = userService;
    $scope.color = '#c0392B'
    $scope.myVar = 'on';
    $scope.nome = 'Certo!';
	$scope.timer = {};
    $scope.coment = {
        nome: 'Digite a cadeira',
        titulo: 'Dê um título',
        livre: '',
        estru: 'Conteúdo da Disciplina:     Metodologia da Disciplina:      Professor(es):      Observações:        '
    };
    $scope.filtro = '';
    $scope.ordem = 'semestre';
    $scope.nomeCadeira = '';
    $scope.colorCadeira = '#000';
    $scope.count = $scope.user.cadeiras.length;
    $scope.pre = true;

    $scope.submeter = function(descr){
        var descri = document.getElementsByName(descr)[0];
        var indexi = $scope.user.selectedObject.id;
        var user = $scope.user.perfil;
        var comenta = {
            avatar: user.avatar,
            nick: user.nick,
            numero:'0',
            coment: descri.value
        }
        $scope.user.cadeiras[indexi].comentarios.push(comenta);
        descri.value = '';
    };
    $scope.atualizarMatriz = function(j,i, obj){
        $scope.user.matriz_desfazer = angular.copy($scope.user.matriz);
        $scope.user.matriz[j][i] = $scope.user.cadeiras[obj];
        if($scope.user.cadeiras[obj]==undefined)
            $scope.user.matriz[j][i] = '';
        if(obj!==''){
            $scope.user.limpo = false;
        } else {
            $scope.talimpo();
        }
        timer = $timeout(function () {
            if(obj!=""){
                $scope.user.matriz_salva = angular.copy($scope.user.matriz);
                $scope.entrou(obj);
            } else {
                $scope.user.matriz_salva = angular.copy($scope.user.matriz);
            }
        }, 1);
    };

    $scope.fill = function(vet){
        for (var j = 0; j <= 7; j++) {
            for (var i = 0; i <= 5; i++) {
                var ide = vet[j][i];
                $scope.user.matriz[j][i] = $scope.user.cadeiras[ide];
            }
        }
    }

    $scope.clean = function(vet){
        if($scope.user.limpo){
            $scope.limparMatriz();
        } else {
            for (var j = 0; j <= 7; j++) {
                for (var i = 0; i <= 5; i++) {
                    $scope.user.matriz[j][i] = $scope.user.matriz_salva[j][i];
                    }
                }
            }
        }

    $scope.putTrilha = function(ide) {
		var vet = $scope.user.trilhas[ide].matriz;
        $scope.user.desfazer = angular.copy($scope.user.matriz_desfazer);
        //$scope.user.trilhas[ide].fixa = true;
		timer = $timeout(function () {
			$scope.fill(vet);
            $scope.user.desfazer = angular.copy($scope.user.matriz_salva);
		}, 100);
    };

    $scope.getTrilha = function(ide) {
        var vet = $scope.user.trilhas[ide].matriz;
        var check = $scope.user.trilhas[ide].fixa;
		$timeout.cancel(timer);
        $scope.user.matriz_desfazer = angular.copy($scope.user.desfazer);
        $scope.clean(vet);        
    }

    $scope.fixTrilha = function(ide){
        var vet = $scope.user.trilhas[ide].matriz;
        $scope.user.trilhas[ide].fixa = false;
        for (var j = 0; j <= 7; j++) {
            for (var i = 0; i <= 5; i++) {
                var idy = $scope.user.matriz_salva[j][i];
                if(idy!=""&&idy!=undefined) {
                    $scope.saiu(idy.id);
                }
                if(vet[j][i]!=""){
                    $scope.atualizarMatriz(j,i,vet[j][i]);
                }
            }
        }
        $scope.user.matriz_desfazer = angular.copy($scope.user.desfazer);
    }

    $scope.fixSemestre = function(ide){
        var vet = $scope.user.semestre[ide];
        var verificar = false;
        for (var j = 0; j <= 5; j++)
            if($scope.user.matriz_salva[ide][j])
                verificar = true;
            if(!verificar){
                for (var i = 0; i <= 5; i++) {
                    if(vet[i]!=""&&$scope.user.cadeiras[vet[i]].matriz){
                        $scope.atualizarMatriz(ide,i,vet[i]);
                    }
                }
            } else {
                alert("Você já está planejando esse semestre!");
            }
    }


    $scope.filtery = function(ide){
        $scope.user.filterBy.push(ide);
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
    
    $scope.getData = function(index){
        $scope.desc = $scope.user.cadeiras[index];
        $scope.user.selectedObject = $scope.desc;
    }
    
    $scope.mandarMatriz = function(e){
        var num = 0;
        var jota = 0;
        while (num<1 && jota<8) {
            for (var i = 0; i < $scope.user.matriz[jota].length-1; i++) {
                var check = $scope.user.matriz[jota][i];
                if(check == '' || check == undefined){
                    var pode = $scope.percorrerAtras(jota,e);
                    if(pode){
                        $scope.entrou(e);
                        $scope.atualizarMatriz(jota,i,e);
                        num = 2;
                        break;
                    } else {
                        var alert = document.getElementById("listaAlert"+e);
                        console.log(alert);
                        alert.style.visibility = "visible";
                        alert.setAttribute("visible",true);
                        tempo = setTimeout(function(){ hideAll(); }, 3500);
                    }
                }
            } 
            jota+=1; 
        }
        jota=0;
    }

    $scope.oi = function(){
        console.log("entrei");
    }

    $scope.tirarMatriz = function(e){
        var el = document.getElementById(e);
        $scope.saiu(e);
        var i_ant = el.parentElement.getAttribute("slot");
        var j_ant = el.parentElement.parentElement.getAttribute("slot");
        $scope.atualizarMatriz(j_ant,i_ant,"");
    }

    $scope.limparMatriz = function(){
        for (var j = 0; j<$scope.user.matriz.length;j++)
            for(var i = 0; i< $scope.user.matriz[j].length; i++){
                $scope.user.matriz[j][i] = "";
            }
        for (var x = 0; x<$scope.user.cadeiras.length; x++)
            $scope.user.cadeiras[x].matriz = true;
        $scope.user.limpo = true;
    }

    $scope.talimpo = function(){
        var tangente = 0;
        for (var j = 0; j<$scope.user.matriz.length;j++)
            for(var i = 0; i< $scope.user.matriz[j].length; i++){
                if($scope.user.matriz[j][i] != ''){
                    tangente++;
                    break;
                }
            }
        if(tangente>0)
            $scope.user.limpo = false;
        else
            $scope.user.limpo = true;
    }

    $scope.voltar = function(){
        $scope.user.desfazer = angular.copy($scope.user.matriz);
        $scope.limparMatriz();
        for (var j = 0; j<$scope.user.matriz.length;j++)
            for(var i = 0; i< $scope.user.matriz[j].length; i++){
                $scope.user.matriz[j][i] = $scope.user.matriz_desfazer[j][i];
                if($scope.user.matriz[j][i]!=undefined)
                    var ideia = $scope.user.matriz[j][i].id;
                if(ideia>=0)
                    $scope.user.cadeiras[ideia].matriz = false;
            }
            $scope.talimpo();
            $scope.user.matriz_desfazer = angular.copy($scope.user.desfazer);
        timer = $timeout(function () {
            $scope.user.matriz_salva = angular.copy($scope.user.matriz);
        }, 100);
    }

    $scope.addCadeira = function(){
        var modal = document.getElementById('myModal');

        var span = document.getElementsByClassName("close")[0];

        modal.style.display = "block";

        span.onclick = function() {
            modal.style.display = "none";
        }

        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
    }

    $scope.submeterCadeira = function(){
        var modal = document.getElementById('myModal');
        var novaCadeira = {
            id: $scope.count,
            name: $scope.nomeCadeira,
            color: $scope.colorCadeira,
            existe: false,
            matriz: false,
            apar: true
         }
         $scope.user.cadeiras.push(novaCadeira);
         $scope.mandarMatriz($scope.count);
         $scope.nomeCadeira = '';
         $scope.count++;
         modal.style.display = "none";
    }

    $scope.percorrerAtras = function(j,ide){
        var prerrequisito = $scope.user.cadeiras[ide].pre1;
        var prerrequisito2 = $scope.user.cadeiras[ide].pre2;
        var permitido = false;
        var p1 = 0;
        var p2 = 0;
        if(!$scope.pre){
            permitido = true;
        } else if(prerrequisito != undefined){
            $scope.user.mensagem = 'Você não pode fazer '+$scope.user.cadeiras[ide].name+' antes de '+$scope.user.cadeiras[prerrequisito].name;
            $scope.mensagem = 'Você não pode fazer '+$scope.user.cadeiras[ide].name+' antes de '+$scope.user.cadeiras[prerrequisito].name;
            if(prerrequisito2==undefined){
                if(j>0){
                    for(var i = j-1; i>=0;i--){
                        for(var v = 0; v<6 ;v++){
                            if(prerrequisito==$scope.user.matriz[i][v].id){
                                permitido = true;
                                break;
                            }
                        }
                    }
                }
            } else {
                $scope.user.mensagem += ' e '+$scope.user.cadeiras[prerrequisito2].name;
                $scope.mensagem += ' e '+$scope.user.cadeiras[prerrequisito2].name;
                if(j>0){
                    for(var i = j; j>0;j--){
                        for(var v = 0; v<5 ;v++){
                            if(prerrequisito==$scope.user.matriz[j][v].id){
                                p1 = 1;
                            } else if(prerrequisito2==$scope.user.matriz[j][v].id){
                                p2 = 1;
                            }
                        }
                    } 
                    if(p1==1 && p2 ==1){
                        permitido= true;
                    }
                }
            }
        } else {
            permitido = true;
        }
        timer = $timeout(function () {
            console.log("");
        }, 1);
        return permitido;
    }

    $scope.semestres = ['sem1', 'sem2', 'sem3', 'sem4', 'sem5', 'sem6', 'sem7', 'sem8'];
    $scope.cadeiras = $scope.user.cadeiras;
    $scope.user = userService;
    $scope.matriz = $scope.user.matriz;
    $scope.mensagem = $scope.user.mensagem;
	$scope.bjt = {};
	
}])