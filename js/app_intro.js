var width = window.innerWidth;
var height = window.innerHeight;
var fichas=[];
var imgFondo = './imgs/fondo.jpg';
var numPosX = 280;
var numPosY = 170;
var timeSonido=100;

var sources = {
    uno: 'uno.png',
    dos: 'dos.png',
    tres: 'tres.png',
    cuatro: 'cuatro.png',
    cinco: 'cinco.png',
    seis: 'seis.png',
    siete: 'siete.png',
    ocho: 'ocho.png',
    nueve: 'nueve.png',
    diez: 'diez.png',
    nada: 'limpio.png'
}

var tiempoIntro=[
    {inicial:"0", final:"0.28"},
    {inicial:"0.53", final:"0.72"}
]

var timeCarga1=[  
    {inicial:"0.28", final:"0.30"},
    {inicial:"0.30", final:"0.32"},
    {inicial:"0.32", final:"0.34"},
    {inicial:"0.34", final:"0.36"},
    {inicial:"0.36", final:"0.38"},
    {inicial:"0.38", final:"0.41"},
    {inicial:"0.41", final:"0.43"},
    {inicial:"0.43", final:"0.46"},
    {inicial:"0.46", final:"0.48"},
    {inicial:"0.48", final:"0.53"}
]

var timeCarga2=[  
    {inicial:"0.73", final:"0.75"},
    {inicial:"0.75", final:"0.77"},
    {inicial:"0.77", final:"0.79"},
    {inicial:"0.79", final:"0.82"},
    {inicial:"0.82", final:"0.84"},
    {inicial:"0.84", final:"0.86"},
    {inicial:"0.86", final:"0.89"},
    {inicial:"0.89", final:"0.91"},
    {inicial:"0.91", final:"0.93"},
    {inicial:"0.93", final:"1.00"}
]

function iniciarIntro(){
    loadImages(sources, initStage);
}

function loadImages(sources, callback) {
    var imgsDir = './imgs/';
    var images = {};
    var loadedImages = 0;
    var numImages = 0;
    for (var src in sources) {
        numImages++;
    }
    var i=0;
    for (var src in sources) {
        images[src] = new Image();
        images[src].onload = function () {
            if (++loadedImages >= numImages) {
                callback(images);
            }
        };
        images[src].src = imgsDir + sources[src];
        fichas[i]=src;i++;
    } 
}

function initStage(images) { 
//1. crear el escenario
    var stage = new Konva.Stage({
        container: 'container',
        width: width,
        height: height,
        x:10,
        y:10
    });
    var background = new Konva.Layer();
    var fichasLayer = new Konva.Layer();
    control_AudioCancion();
    
    stage.add(background);
    cargarFondo(background, imgFondo, 0, 0);

    intro(fichasLayer, images, numPosX, numPosY, fichas)
    stage.add(fichasLayer);
    cargarNumeros1(fichasLayer, images, numPosX, numPosY, fichas, timeCarga1);
    cargarNumeros1(fichasLayer, images, numPosX, numPosY, fichas, timeCarga2);


 

//*********** fin muestra los números de acuerdo a la canción */  
}
//cargar tres veces los números [1, 10]
function intro(fichasLayer, images, numPosX, numPosY, fichas){
    var i=0, canImagenes= fichas.length-1, repeticion=1;   
    var inicial1 = parseFloat(tiempoIntro[0].inicial)*100;   
    var final1 = parseFloat(tiempoIntro[0].final)*100;  
    var inicial2 = parseFloat(tiempoIntro[1].inicial)*100;   
    var final2 = parseFloat(tiempoIntro[1].final)*100;
    var interIntro = setInterval(function(){
        tiempoActual=currentTimeSg_cancion;    
        if((tiempoActual>=inicial1 && tiempoActual<final1) || (tiempoActual>=inicial2 && tiempoActual<final2)){
            src = fichas[i];
            cargarImagen(fichasLayer, images[src], numPosX, numPosY);  
            if(i>=canImagenes) {i=0;repeticion++}
            else i++ 
//**********no se puede ejecutar  clearInterval(interIntro)--> porque no funciona en el segundo llamado
/*             if(repeticion>3)  {
                clearInterval(interIntro);
            } */
        }
    }, 850);
}

//*********** muestra los números de acuerdo a la canción */   
function cargarNumeros1(fichasLayer, images, numPosX, numPosY, fichas, timeCarga){
    var ultimoTiempo = parseFloat(timeCarga[timeCarga.length-1].final)*100+2;
    var interNumeros = setInterval(function(){      
        tiempoActual=currentTimeSg_cancion;
        for(let ind=0; ind<timeCarga.length; ind++){
            inicial = parseFloat(timeCarga[ind].inicial)*100;   
            final = parseFloat(timeCarga[ind].final)*100;
            if(tiempoActual>=inicial && tiempoActual<final){
                var src = fichas[ind];
                cargarImagen(fichasLayer, images[src], numPosX, numPosY);
            }
        }  
        if(tiempoActual>ultimoTiempo) clearInterval(interNumeros);  
        if(tiempoActual>=timeSonido) location.href = "juegoNumeros.html";
    }, 50);
}

function cargarImagen(layer, src, posX, posY){
    var ficha = new Konva.Image({
        image: src,
        x: posX,
        y: posY,
    });         
    layer.destroyChildren(); //borra el número anterior
    //Adiciona cada ficha al layer
    layer.add(ficha);
    layer.draw(); //muestra el número actual
}
function cargarFondo(layer, src, posX, posY){
    var imageObj = new Image();
    imageObj.onload = function() {
      var image = new Konva.Image({
        x: posX,
        y: posY,
        image: imageObj,
      });
      layer.add(image);
      layer.draw();
    };
    imageObj.src =src;
}