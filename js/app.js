var width = window.innerWidth;
var height = 565;
var tarjetaAncho = 150, tarjetaAlto = 200;
var numeroAncho = 57, numeroAlto = 135;

var fichas = {
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
var elementos = Object.values(fichas);//devuelve un arreglo con las direcciones de las fichas
var cantFichas = elementos.legth;

var tarjetas = {
    uno: 'num1.jpg',
    dos: 'num2.jpg',
    tres: 'num3.jpg',
    cuatro: 'num4.jpg',
    cinco: 'num5.jpg',
    seis: 'num6.jpg',
    siete: 'num7.jpg',
    ocho: 'num8.jpg',
    nueve: 'num9.jpg',
    diez: 'num10.jpg'
}
iniciarJuego();

function iniciarJuego(){
    loadImages(tarjetas, initStage);
}

function initStage(tarjetas) { 
    var stage = new Konva.Stage({
        container: 'container',
        width: width,
        height: height,
        x:10,
        y:10
    });
    var tarjetasLayer = new Konva.Layer();
    var numeroLayer = new Konva.Layer();

    
    var columna=0, fila=0;
    for (var key in tarjetas) {      
        posX= columna * tarjetaAncho;
        posY= fila * tarjetaAlto;          
        if(columna>3){columna=0;fila=1} else columna++;
        (function () {
            var ficha = new Konva.Image({
                image: tarjetas[key],
                x: posX,
                y: posY,
                width: tarjetaAncho,
                height:tarjetaAlto
            });
            tarjetasLayer.add(ficha);
        })();
    }

    stage.add(tarjetasLayer);
    dispNumero(numeroLayer);
    stage.add(numeroLayer);
}


function dispNumero(layer){  
    var min=-1, max=elementos.length-2;
    var seleccion = Math.ceil(Math.random() * (max - min)) + min;
    var urlImagen = elementos[seleccion];
    var imgsDir = './imgs/';   
    var key=urlImagen.split("."); key=key[0];
    var imageObj = new Image();
    var posIniX=300, posIniY=400;
    imageObj.onload = function() {  
        var posiciones = {
            uno: {x: 83, y: 19},
            dos: {x: 207, y: 26},
            tres: {x: 348, y: 26},
            cuatro: {x: 498, y: 29},
            cinco: {x: 660, y: 24},
            seis: {x: 57, y: 224},
            siete: {x: 204, y: 219},
            ocho: {x: 359, y: 228},
            nueve: {x: 507, y: 216},
            diez: {x: 630, y: 246}           
        }     
        ancho=imageObj.width/2;
        alto=imageObj.height/2;
        var image = new Konva.Image({
        x: posIniX,
        y: posIniY,
        image: imageObj,
        draggable: true,
        width: ancho,
        height:alto
        });
        image.on('mouseover', function () {
            document.body.style.cursor = 'pointer';
        });
        image.on('mouseout', function () {
            document.body.style.cursor = 'default';
        });
        image.on('click', function () {
            sonidos(key);
        });
        image.on('dragstart', function () {
            sonidos(key);
        });
        image.on('dragend', function () {
            var posFinalX=posiciones[key].x, posFinalY=posiciones[key].y;
            var x= image.attrs.x, y = image.attrs.y;
            var toleranciaFicha=20; 
            if((x>=posFinalX-toleranciaFicha && x<=posFinalX+toleranciaFicha) && 
                (y>=posFinalY-toleranciaFicha && y<=posFinalY+toleranciaFicha)){
                sonidos("felicitaciones");
                image.position({
                    x: posFinalX,
                    y: posFinalY
                });               
                layer.draw();
                setTimeout(function () {
                    iniciarJuego();
                }, 1600); 
            }else{console.log(x+', '+y)
                sonidos("Upps");
                image.position({
                    x: posIniX,
                    y: posIniY
                });               
                layer.draw();
            }
        });

        layer.add(image);
        layer.draw();
    };
    imageObj.src =imgsDir+urlImagen;
}

function loadImages(sources, callback) {
    var imgsDir = './imgs/';
    var images = {};
    var loadedImages = 0;
    var numImages = 0;
    for (var src in sources) {
        numImages++;
    }
    for (var src in sources) {
        images[src] = new Image();
        images[src].onload = function () {
            if (++loadedImages >= numImages) {
                callback(images);
            }
        };
        images[src].src = imgsDir + sources[src];
    }    
}