function allowDrop(ev) {
  ev.preventDefault();    // cancel the ev event
  }
 
function some(){
  document.getElementById('voltar').style.visibility = "hidden";
}
// function called when the drag operation starts
function dragStart(ev) {
  var cheio = ev.target.parentNode.hasAttribute("cheio");
  // sets the data type and the value of the dragged data
  // This data will be returned by getData(). Here the ID of current dragged element 
  ev.dataTransfer.setData('Text', ev.target.id);
  ev.dataTransfer.setData('obje', ev.target);
  if(cheio){
    ev.dataTransfer.setData('Cheio', ev.target.parentNode.id);
  }
  document.getElementById('voltar').style.visibility = "visible";
}


// function called when the dragged element is dropped
function drop(ev) {
  var cheio = ev.target.hasAttribute("cheio");
  var objec = ev.dataTransfer.getData("obje");
  if(cheio){
    ev.preventDefault();  // the dragover event needs to be canceled to allow firing the drop event   
  } else {
  // gets data set by setData() for current drag-and-drop operation (the ID of current dragged element),
  // using for parameter a string with the same format set in setData
  var drag_data = ev.dataTransfer.getData('Text');
  var ideia = ev.dataTransfer.getData('Cheio');
  if(ideia!=''){
    document.getElementById(ideia).removeAttribute("cheio");
  }
  // adds /appends the dropped element in the specified target
  ev.target.appendChild(document.getElementById(drag_data));
  document.getElementById(drag_data).style.margin = "-5px";
  angular.element(document.getElementById('ctrl')).scope().entrou(document.getElementById(drag_data).id);
  ev.target.setAttribute("cheio", "true");
  document.getElementById('voltar').style.visibility = "hidden";
}
}

function drop2(ev) {
  ev.preventDefault();
  var ideia = ev.dataTransfer.getData('Cheio');
  if(ideia!=''){
    document.getElementById(ideia).removeAttribute("cheio");
  }
  var drag_data = ev.dataTransfer.getData('Text');
  console.log(drag_data);
  document.getElementById(drag_data).style.margin = "5px";
  angular.element(document.getElementById('ctrl')).scope().saiu(document.getElementById(drag_data).id);
  //document.getElementById(drag_data).style.display = "none";
  document.getElementById(drag_data).remove();
  document.getElementById('voltar').style.visibility = "hidden";
}

function hover(element) {
    var myimg = element.getElementsByTagName('img')[0];
    myimg.setAttribute('src', 'imagens/icon12.png');   
    myimg.style.width = '70%';
    myimg.style.height = '70%';
}
function unhover(element) {
    var myimg = element.getElementsByTagName('img')[0];
    myimg.setAttribute('src', 'imagens/icon1.png');
    myimg.style.width = '60%';
    myimg.style.height = '60%';
}
function hover2(element) {
    var myimg = element.getElementsByTagName('img')[0];
    myimg.setAttribute('src', 'imagens/icon22.png');   
    myimg.style.width = '70%';
    myimg.style.height = '70%';
}
function unhover2(element) {
    var myimg = element.getElementsByTagName('img')[0];
    myimg.setAttribute('src', 'imagens/icon2.png');
    myimg.style.width = '60%';
    myimg.style.height = '60%';
}
function hover3(element) {
    var myimg = element.getElementsByTagName('img')[0];
    myimg.setAttribute('src', 'imagens/icon32.png');   
    myimg.style.width = '70%';
    myimg.style.height = '70%';
}
function unhover3(element) {
    var myimg = element.getElementsByTagName('img')[0];
    myimg.setAttribute('src', 'imagens/icon3.png');
    myimg.style.width = '60%';
    myimg.style.height = '60%';
}