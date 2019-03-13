
var tempo = '';

function allowDrop(ev) {
  ev.preventDefault();    // cancel the ev event
  }
 
function some(){
  document.getElementById('voltar').style.visibility = "hidden";
}

// function called when the drag operation starts
function dragStart(ev) {
  // sets the data type and the value of the dragged data
  // This data will be returned by getData(). Here the ID of current dragged element 
  var i_ant = ev.target.parentElement.getAttribute("slot");
  var j_ant = ev.target.parentElement.parentElement.getAttribute("slot");
  ev.dataTransfer.setData('Text', ev.target.id);
  ev.dataTransfer.setData('grid', ev.target.parentElement.parentElement.id);
  ev.dataTransfer.setData('i_ant', i_ant);
  ev.dataTransfer.setData('j_ant', j_ant);
  document.getElementById('voltar').style.visibility = "visible";
  clearTimeout(tempo)
}

// function called when the dragged element is dropped
function drop(ev) {
  var cheio = ev.target.hasAttribute("cheio");
  var drag_data = ev.dataTransfer.getData('Text');
  var j = ev.target.parentElement.getAttribute("slot");
  var i = ev.target.getAttribute("slot");
  var pode = angular.element(document.getElementById('ctrl')).scope().percorrerAtras(j,drag_data);
  if(ev.preventDefault) { ev.preventDefault(); }
  if(cheio||!pode){
    ev.preventDefault();  // the dragover event needs to be canceled to allow firing the drop event   
    var alert = document.getElementById("matrizAlert"+j+i);
    alert.style.visibility = "visible";
    alert.setAttribute("visible",true);
    tempo = setTimeout(function(){ hideAll(); }, 3500);
  } else {
  // gets data set by setData() for current drag-and-drop operation (the ID of current dragged element),
  // using for parameter a string with the same format set in setData
  var grid = ev.dataTransfer.getData('grid');
  var i_ant = ev.dataTransfer.getData('i_ant');
  var j_ant = ev.dataTransfer.getData('j_ant');
  // adds /appends the dropped element in the specified target
  angular.element(document.getElementById('ctrl')).scope().entrou(drag_data);
  angular.element(document.getElementById('ctrl')).scope().atualizarMatriz(j,i,drag_data);
  if(grid!="gridCadeirasMatriz")
    angular.element(document.getElementById('ctrl')).scope().atualizarMatriz(j_ant,i_ant,"");
  document.getElementById('voltar').style.visibility = "hidden";
}
}

function drop2(ev) {
  var ideia = ev.dataTransfer.getData('Cheio');
  if(ev.preventDefault) { ev.preventDefault(); }
  if(ideia!=''){
    document.getElementById(ideia).removeAttribute("cheio");
  }
  var drag_data = ev.dataTransfer.getData('Text');
  var grid = ev.dataTransfer.getData('grid');
  var i_ant = ev.dataTransfer.getData('i_ant');
  var j_ant = ev.dataTransfer.getData('j_ant');
  if(grid!="gridCadeirasMatriz")
    ev.preventDefault();
  angular.element(document.getElementById('ctrl')).scope().saiu(drag_data);
  angular.element(document.getElementById('ctrl')).scope().atualizarMatriz(j_ant,i_ant,"");
  document.getElementById('voltar').style.visibility = "hidden";
}

function KeyPress(e) {
      var evtobj = window.event? event : e
      if (evtobj.keyCode == 90 && evtobj.ctrlKey) 
        angular.element(document.getElementById('ctrl')).scope().voltar();
}

function hideAll(){
  var sumir = document.querySelector("span[visible=true");
  if(sumir!=undefined){
    sumir.style.visibility = "hidden";
    sumir.setAttribute("visible",false);
  }
}

document.onkeydown = KeyPress;

document.onmousedown = hideAll;
